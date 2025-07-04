from fastapi import FastAPI, APIRouter, HTTPException, Depends, status, UploadFile, File
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import jwt
import hashlib
import base64
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, timedelta


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# JWT Secret (trong production nên dùng environment variable)
JWT_SECRET = os.environ.get('JWT_SECRET', 'your-secret-key-here')
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24

# Security
security = HTTPBearer()

# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Admin Models
class AdminUser(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class AdminLogin(BaseModel):
    username: str
    password: str

class AdminLoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int

# Product Models
class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    detail_description: str
    price: str  # base price (for backward compatibility)
    size_prices: dict = {}  # dictionary mapping size to price, e.g. {"10mm": "1500000", "12mm": "1800000"}
    images: List[str] = []  # array of base64 encoded images (max 10)
    image: Optional[str] = None  # backward compatibility - single image (first from images array)
    category: str
    material: str
    rating: float = 4.5
    sizes: List[str] = []
    reviews: List[dict] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ProductCreate(BaseModel):
    name: str
    description: str
    detail_description: str
    price: str  # base price
    size_prices: Optional[dict] = {}  # dictionary mapping size to price
    images: List[str] = []  # array of base64 encoded images (max 10)
    image: Optional[str] = None  # backward compatibility - single image
    category: str
    material: str
    sizes: List[str] = []

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    detail_description: Optional[str] = None
    price: Optional[str] = None  # base price
    size_prices: Optional[dict] = None  # dictionary mapping size to price
    images: Optional[List[str]] = None  # array of base64 encoded images (max 10)
    category: Optional[str] = None
    material: Optional[str] = None
    sizes: Optional[List[str]] = None

# Order Models
class OrderItem(BaseModel):
    product_id: str
    product_name: str
    price: str  # This will be the size-specific price
    quantity: int
    selected_size: Optional[str] = None
    size_specific_price: Optional[str] = None  # Additional field to store the size-specific price for clarity

class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    order_id: str
    customer_name: str
    customer_phone: str
    customer_email: Optional[str] = None
    customer_address: str
    note: Optional[str] = None
    items: List[OrderItem]
    total_price: int
    shipping_fee: int
    payment_method: str = "cod"
    status: str = "pending"  # pending, confirmed, shipping, delivered, cancelled
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class OrderCreate(BaseModel):
    customer_name: str
    customer_phone: str
    customer_email: Optional[str] = None
    customer_address: str
    note: Optional[str] = None
    items: List[OrderItem]
    total_price: int
    shipping_fee: int
    payment_method: str = "cod"

class OrderStatusUpdate(BaseModel):
    status: str

# Authentication functions
def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(password: str, hashed: str) -> bool:
    return hash_password(password) == hashed

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return encoded_jwt

async def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        
        admin = await db.admin_users.find_one({"username": username})
        if admin is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Admin not found")
        
        return admin
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# ===== ADMIN AUTH ENDPOINTS =====
@api_router.post("/admin/login", response_model=AdminLoginResponse)
async def admin_login(login_data: AdminLogin):
    admin = await db.admin_users.find_one({"username": login_data.username})
    
    if not admin or not verify_password(login_data.password, admin["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": admin["username"]})
    return AdminLoginResponse(
        access_token=access_token,
        expires_in=JWT_EXPIRATION_HOURS * 3600
    )

@api_router.post("/admin/create")
async def create_admin(username: str = "admin", password: str = "admin123"):
    """Tạo admin user mặc định - chỉ để development"""
    existing_admin = await db.admin_users.find_one({"username": username})
    if existing_admin:
        return {"message": "Admin already exists"}
    
    admin_data = {
        "id": str(uuid.uuid4()),
        "username": username,
        "password_hash": hash_password(password),
        "created_at": datetime.utcnow()
    }
    
    await db.admin_users.insert_one(admin_data)
    return {"message": "Admin created successfully", "username": username}

@api_router.get("/admin/me")
async def get_current_admin_info(current_admin = Depends(get_current_admin)):
    return {"username": current_admin["username"], "id": current_admin["id"]}

# ===== PRODUCT MANAGEMENT ENDPOINTS =====
@api_router.get("/admin/products", response_model=List[Product])
async def get_all_products(current_admin = Depends(get_current_admin)):
    products = await db.products.find().to_list(1000)
    return [Product(**product) for product in products]

@api_router.post("/admin/products", response_model=Product)
async def create_product(product_data: ProductCreate, current_admin = Depends(get_current_admin)):
    # Handle backward compatibility: if images is empty but image is provided, use image
    images = product_data.images
    if not images and product_data.image:
        images = [product_data.image]
    
    # Validate maximum 10 images
    if len(images) > 10:
        raise HTTPException(status_code=400, detail="Maximum 10 images allowed per product")
    
    product_dict = product_data.dict()
    product_dict["images"] = images
    product_dict["id"] = str(uuid.uuid4())
    product_dict["created_at"] = datetime.utcnow()
    product_dict["updated_at"] = datetime.utcnow()
    product_dict["rating"] = 4.5
    product_dict["reviews"] = []
    
    # Ensure backward compatibility for single image field
    if images:
        product_dict["image"] = images[0]
    
    product_obj = Product(**product_dict)
    await db.products.insert_one(product_obj.dict())
    return product_obj

@api_router.get("/admin/products/{product_id}", response_model=Product)
async def get_product(product_id: str, current_admin = Depends(get_current_admin)):
    product = await db.products.find_one({"id": product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return Product(**product)

@api_router.put("/admin/products/{product_id}", response_model=Product)
async def update_product(product_id: str, product_data: ProductUpdate, current_admin = Depends(get_current_admin)):
    existing_product = await db.products.find_one({"id": product_id})
    if not existing_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = {k: v for k, v in product_data.dict().items() if v is not None}
    
    # Validate maximum 10 images if images are being updated
    if "images" in update_data and len(update_data["images"]) > 10:
        raise HTTPException(status_code=400, detail="Maximum 10 images allowed per product")
    
    update_data["updated_at"] = datetime.utcnow()
    
    await db.products.update_one({"id": product_id}, {"$set": update_data})
    
    updated_product = await db.products.find_one({"id": product_id})
    return Product(**updated_product)

@api_router.delete("/admin/products/{product_id}")
async def delete_product(product_id: str, current_admin = Depends(get_current_admin)):
    result = await db.products.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}

# ===== PUBLIC PRODUCT ENDPOINTS =====
@api_router.get("/products", response_model=List[Product])
async def get_public_products():
    products = await db.products.find().to_list(1000)
    return [Product(**product) for product in products]

@api_router.post("/admin/seed-products")
async def seed_products(current_admin = Depends(get_current_admin)):
    """Seed database with sample products that have size-based pricing"""
    
    sample_products = [
        {
            "id": str(uuid.uuid4()),
            "name": "Vòng tay trầm hương cao cấp",
            "description": "Vòng tay trầm hương nguyên chất, thơm nhẹ và bền màu, phù hợp đeo hàng ngày.",
            "detail_description": "Vòng tay trầm hương được chế tác từ gỗ trầm hương tự nhiên, mang lại cảm giác thư thái và may mắn cho người đeo.",
            "price": "1.500.000đ",  # base price for smallest size
            "size_prices": {
                "10mm": "1.500.000đ",
                "12mm": "1.800.000đ", 
                "14mm": "2.200.000đ",
                "16mm": "2.800.000đ",
                "18mm": "3.500.000đ"
            },
            "images": [],
            "category": "Vòng tay trầm",
            "material": "Gỗ trầm hương tự nhiên",
            "rating": 4.8,
            "sizes": ["10mm", "12mm", "14mm", "16mm", "18mm"],
            "reviews": [
                {"name": "Nguyễn Văn A", "rating": 5, "comment": "Sản phẩm chất lượng, thơm tự nhiên"},
                {"name": "Trần Thị B", "rating": 4, "comment": "Đẹp, đóng gói cẩn thận"}
            ],
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Tinh dầu trầm hương nguyên chất",
            "description": "Tinh dầu trầm hương 100% nguyên chất, chiết xuất từ gỗ trầm hương cao cấp.",
            "detail_description": "Tinh dầu trầm hương được chưng cất từ gỗ trầm hương cao cấp, có tác dụng thư giãn tinh thần, giảm stress.",
            "price": "800.000đ",  # base price for smallest size
            "size_prices": {
                "5ml": "800.000đ",
                "10ml": "1.400.000đ",
                "20ml": "2.500.000đ"
            },
            "images": [],
            "category": "Tinh dầu trầm",
            "material": "Tinh dầu nguyên chất",
            "rating": 4.7,
            "sizes": ["5ml", "10ml", "20ml"],
            "reviews": [
                {"name": "Vũ Thị F", "rating": 5, "comment": "Tinh dầu thật 100%, rất thơm"}
            ],
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Cảnh trầm hương phong thủy",
            "description": "Tác phẩm nghệ thuật từ trầm hương tự nhiên, dùng trang trí và phong thủy, mang lại may mắn.",
            "detail_description": "Cảnh trầm hương được chế tác thủ công từ gỗ trầm hương tự nhiên, mang ý nghĩa phong thủy tốt lành.",
            "price": "8.000.000đ",  # base price for smallest size
            "size_prices": {
                "Size S (10-15cm)": "8.000.000đ",
                "Size M (15-20cm)": "15.000.000đ",
                "Size L (20-30cm)": "25.000.000đ"
            },
            "images": [],
            "category": "Cảnh trầm",
            "material": "Gỗ trầm hương nguyên khối",
            "rating": 4.8,
            "sizes": ["Size S (10-15cm)", "Size M (15-20cm)", "Size L (20-30cm)"],
            "reviews": [
                {"name": "Đỗ Văn G", "rating": 5, "comment": "Cảnh trầm đẹp, thích hợp trang trí"}
            ],
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
    ]
    
    # Clear existing products first
    await db.products.delete_many({})
    
    # Insert new products
    for product_data in sample_products:
        await db.products.insert_one(product_data)
    
    return {"message": f"Successfully seeded {len(sample_products)} products with size-based pricing"}

# ===== ORDER MANAGEMENT ENDPOINTS =====
@api_router.post("/orders", response_model=Order)
async def create_order(order_data: OrderCreate):
    order_dict = order_data.dict()
    order_dict["id"] = str(uuid.uuid4())
    order_dict["order_id"] = 'DH' + str(int(datetime.now().timestamp() * 1000))[-6:]
    order_dict["status"] = "pending"
    order_dict["created_at"] = datetime.utcnow()
    order_dict["updated_at"] = datetime.utcnow()
    
    order_obj = Order(**order_dict)
    await db.orders.insert_one(order_obj.dict())
    return order_obj

@api_router.get("/admin/orders", response_model=List[Order])
async def get_all_orders(current_admin = Depends(get_current_admin)):
    orders = await db.orders.find().sort("created_at", -1).to_list(1000)
    return [Order(**order) for order in orders]

@api_router.get("/admin/orders/{order_id}", response_model=Order)
async def get_order(order_id: str, current_admin = Depends(get_current_admin)):
    order = await db.orders.find_one({"id": order_id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return Order(**order)

@api_router.put("/admin/orders/{order_id}/status")
async def update_order_status(order_id: str, status_data: OrderStatusUpdate, current_admin = Depends(get_current_admin)):
    existing_order = await db.orders.find_one({"id": order_id})
    if not existing_order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    valid_statuses = ["pending", "confirmed", "shipping", "delivered", "cancelled"]
    if status_data.status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
    
    await db.orders.update_one(
        {"id": order_id}, 
        {"$set": {"status": status_data.status, "updated_at": datetime.utcnow()}}
    )
    
    updated_order = await db.orders.find_one({"id": order_id})
    return Order(**updated_order)

# ===== ADMIN DASHBOARD STATS =====
@api_router.get("/admin/stats")
async def get_admin_stats(current_admin = Depends(get_current_admin)):
    # Count products
    product_count = await db.products.count_documents({})
    
    # Count orders by status
    pending_orders = await db.orders.count_documents({"status": "pending"})
    confirmed_orders = await db.orders.count_documents({"status": "confirmed"})
    shipping_orders = await db.orders.count_documents({"status": "shipping"})
    delivered_orders = await db.orders.count_documents({"status": "delivered"})
    cancelled_orders = await db.orders.count_documents({"status": "cancelled"})
    
    # Calculate total revenue from delivered orders
    pipeline = [
        {"$match": {"status": "delivered"}},
        {"$group": {"_id": None, "total": {"$sum": {"$add": ["$total_price", "$shipping_fee"]}}}}
    ]
    revenue_result = await db.orders.aggregate(pipeline).to_list(1)
    total_revenue = revenue_result[0]["total"] if revenue_result else 0
    
    # Recent orders
    recent_orders = await db.orders.find().sort("created_at", -1).limit(5).to_list(5)
    
    return {
        "product_count": product_count,
        "orders": {
            "pending": pending_orders,
            "confirmed": confirmed_orders,
            "shipping": shipping_orders,
            "delivered": delivered_orders,
            "cancelled": cancelled_orders,
            "total": pending_orders + confirmed_orders + shipping_orders + delivered_orders + cancelled_orders
        },
        "total_revenue": total_revenue,
        "recent_orders": [Order(**order) for order in recent_orders]
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
