#!/usr/bin/env python3
import requests
import json
import time
import sys
from typing import Dict, Any, List, Optional

# Backend URL from the frontend/.env file
BACKEND_URL = "https://d2b26454-9f88-4557-9f96-612db8d91fc8.preview.emergentagent.com"
API_URL = f"{BACKEND_URL}/api"

# Admin credentials
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"

# Test results tracking
test_results = {
    "passed": 0,
    "failed": 0,
    "tests": []
}

# Colors for terminal output
class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def log_test(name: str, passed: bool, response: Optional[requests.Response] = None, error: Optional[str] = None):
    """Log test results with formatting"""
    status = f"{Colors.OKGREEN}PASSED{Colors.ENDC}" if passed else f"{Colors.FAIL}FAILED{Colors.ENDC}"
    print(f"{Colors.BOLD}{name}{Colors.ENDC}: {status}")
    
    if response:
        try:
            print(f"  Status Code: {response.status_code}")
            if response.headers.get('content-type') and 'application/json' in response.headers.get('content-type'):
                print(f"  Response: {json.dumps(response.json(), indent=2)}")
            else:
                print(f"  Response: {response.text[:200]}...")
        except Exception as e:
            print(f"  Error parsing response: {str(e)}")
    
    if error:
        print(f"  {Colors.FAIL}Error: {error}{Colors.ENDC}")
    
    print("-" * 80)
    
    # Track results
    test_results["passed" if passed else "failed"] += 1
    test_results["tests"].append({
        "name": name,
        "passed": passed,
        "error": error
    })

def get_admin_token() -> str:
    """Get admin JWT token"""
    try:
        response = requests.post(
            f"{API_URL}/admin/login",
            json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD}
        )
        response.raise_for_status()
        return response.json()["access_token"]
    except Exception as e:
        print(f"{Colors.FAIL}Failed to get admin token: {str(e)}{Colors.ENDC}")
        sys.exit(1)

def test_admin_login():
    """Test admin login endpoint"""
    # Test with valid credentials
    try:
        response = requests.post(
            f"{API_URL}/admin/login",
            json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD}
        )
        
        if response.status_code == 200 and "access_token" in response.json():
            log_test("Admin Login - Valid Credentials", True, response)
        else:
            log_test("Admin Login - Valid Credentials", False, response, 
                    f"Expected status 200 with access_token, got {response.status_code}")
    except Exception as e:
        log_test("Admin Login - Valid Credentials", False, error=str(e))
    
    # Test with invalid credentials
    try:
        response = requests.post(
            f"{API_URL}/admin/login",
            json={"username": "wrong", "password": "wrong"}
        )
        
        if response.status_code == 401:
            log_test("Admin Login - Invalid Credentials", True, response)
        else:
            log_test("Admin Login - Invalid Credentials", False, response, 
                    f"Expected status 401, got {response.status_code}")
    except Exception as e:
        log_test("Admin Login - Invalid Credentials", False, error=str(e))

def test_admin_me(token: str):
    """Test admin me endpoint"""
    # Test with valid token
    try:
        response = requests.get(
            f"{API_URL}/admin/me",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        if response.status_code == 200 and "username" in response.json():
            log_test("Admin Me - Valid Token", True, response)
        else:
            log_test("Admin Me - Valid Token", False, response, 
                    f"Expected status 200 with username, got {response.status_code}")
    except Exception as e:
        log_test("Admin Me - Valid Token", False, error=str(e))
    
    # Test without token
    try:
        response = requests.get(f"{API_URL}/admin/me")
        
        if response.status_code == 401 or response.status_code == 403:
            log_test("Admin Me - No Token", True, response)
        else:
            log_test("Admin Me - No Token", False, response, 
                    f"Expected status 401 or 403, got {response.status_code}")
    except Exception as e:
        log_test("Admin Me - No Token", False, error=str(e))

def test_admin_products(token: str):
    """Test admin products endpoints with size-based pricing"""
    # Test GET all products
    try:
        response = requests.get(
            f"{API_URL}/admin/products",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        if response.status_code == 200 and isinstance(response.json(), list):
            products = response.json()
            
            # Check if products have size_prices field
            has_size_prices = all('size_prices' in product for product in products)
            
            if has_size_prices:
                log_test("Admin Products - GET All with Size-Based Pricing", True, response)
                print(f"  Found {len(products)} products with size_prices field")
            else:
                log_test("Admin Products - GET All with Size-Based Pricing", False, response, 
                        "Some products missing size_prices field")
        else:
            log_test("Admin Products - GET All with Size-Based Pricing", False, response, 
                    f"Expected status 200 with array, got {response.status_code}")
            products = []
    except Exception as e:
        log_test("Admin Products - GET All with Size-Based Pricing", False, error=str(e))
        products = []
    
    # Test POST new product with size_prices
    new_product_id = None
    try:
        new_product = {
            "name": "Test Agarwood Bracelet with Size Pricing",
            "description": "A beautiful test bracelet with different sizes",
            "detail_description": "This is a detailed description for testing size-based pricing",
            "price": "999.000đ",  # base price
            "size_prices": {
                "8mm": "999.000đ",
                "10mm": "1.299.000đ",
                "12mm": "1.599.000đ"
            },
            "images": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="],
            "category": "Bracelet",
            "material": "Agarwood",
            "sizes": ["8mm", "10mm", "12mm"]
        }
        
        response = requests.post(
            f"{API_URL}/admin/products",
            headers={"Authorization": f"Bearer {token}"},
            json=new_product
        )
        
        if response.status_code == 200 and "id" in response.json():
            new_product_id = response.json()["id"]
            
            # Verify size_prices was saved correctly
            if (response.json().get("size_prices") == new_product["size_prices"] and
                response.json().get("sizes") == new_product["sizes"]):
                log_test("Admin Products - POST Create with Size Pricing", True, response)
            else:
                log_test("Admin Products - POST Create with Size Pricing", False, response,
                        "Size pricing data not saved correctly")
        else:
            log_test("Admin Products - POST Create with Size Pricing", False, response, 
                    f"Expected status 200 with id, got {response.status_code}")
    except Exception as e:
        log_test("Admin Products - POST Create with Size Pricing", False, error=str(e))
    
    # Test GET specific product with size_prices
    if new_product_id:
        try:
            response = requests.get(
                f"{API_URL}/admin/products/{new_product_id}",
                headers={"Authorization": f"Bearer {token}"}
            )
            
            if (response.status_code == 200 and 
                response.json()["id"] == new_product_id and
                "size_prices" in response.json() and
                "sizes" in response.json()):
                log_test("Admin Products - GET Specific with Size Pricing", True, response)
            else:
                log_test("Admin Products - GET Specific with Size Pricing", False, response, 
                        f"Expected status 200 with size_prices, got {response.status_code}")
        except Exception as e:
            log_test("Admin Products - GET Specific with Size Pricing", False, error=str(e))
    
    # Test PUT update product with size_prices
    if new_product_id:
        try:
            update_data = {
                "name": "Updated Test Bracelet",
                "size_prices": {
                    "8mm": "899.000đ",  # reduced price
                    "10mm": "1.299.000đ",  # same price
                    "12mm": "1.699.000đ",  # increased price
                    "14mm": "1.999.000đ"   # new size
                },
                "sizes": ["8mm", "10mm", "12mm", "14mm"]  # added new size
            }
            
            response = requests.put(
                f"{API_URL}/admin/products/{new_product_id}",
                headers={"Authorization": f"Bearer {token}"},
                json=update_data
            )
            
            if (response.status_code == 200 and 
                response.json()["id"] == new_product_id and 
                response.json()["name"] == update_data["name"] and
                response.json()["size_prices"] == update_data["size_prices"] and
                response.json()["sizes"] == update_data["sizes"]):
                log_test("Admin Products - PUT Update with Size Pricing", True, response)
            else:
                log_test("Admin Products - PUT Update with Size Pricing", False, response, 
                        f"Expected status 200 with updated size pricing data, got {response.status_code}")
        except Exception as e:
            log_test("Admin Products - PUT Update with Size Pricing", False, error=str(e))
    
    # Test DELETE product
    if new_product_id:
        try:
            response = requests.delete(
                f"{API_URL}/admin/products/{new_product_id}",
                headers={"Authorization": f"Bearer {token}"}
            )
            
            if response.status_code == 200 and "message" in response.json():
                log_test("Admin Products - DELETE", True, response)
            else:
                log_test("Admin Products - DELETE", False, response, 
                        f"Expected status 200 with message, got {response.status_code}")
        except Exception as e:
            log_test("Admin Products - DELETE", False, error=str(e))

def test_admin_orders(token: str):
    """Test admin orders endpoints with size-specific pricing"""
    # Test GET all orders
    try:
        response = requests.get(
            f"{API_URL}/admin/orders",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        if response.status_code == 200 and isinstance(response.json(), list):
            log_test("Admin Orders - GET All", True, response)
            orders = response.json()
            print(f"  Found {len(orders)} orders")
        else:
            log_test("Admin Orders - GET All", False, response, 
                    f"Expected status 200 with array, got {response.status_code}")
            orders = []
    except Exception as e:
        log_test("Admin Orders - GET All", False, error=str(e))
        orders = []
    
    # Create a test order with size-specific pricing if none exist
    order_id = None
    if not orders:
        try:
            # First get a product to use in the order
            product_response = requests.get(f"{API_URL}/products")
            if product_response.status_code == 200 and len(product_response.json()) > 0:
                product = product_response.json()[0]
                
                # Get the first size and its price from size_prices
                if product.get("size_prices") and product.get("sizes"):
                    selected_size = product["sizes"][0]
                    size_specific_price = product["size_prices"][selected_size]
                    
                    # Create an order with size-specific pricing
                    order_data = {
                        "customer_name": "Test Customer",
                        "customer_phone": "0123456789",
                        "customer_email": "test@example.com",
                        "customer_address": "123 Test Street",
                        "note": "This is a test order with size-specific pricing",
                        "items": [
                            {
                                "product_id": product["id"],
                                "product_name": product["name"],
                                "price": size_specific_price,  # Use size-specific price
                                "quantity": 1,
                                "selected_size": selected_size,  # Include selected size
                                "size_specific_price": size_specific_price  # Include size-specific price
                            }
                        ],
                        "total_price": int(size_specific_price.replace(".", "").replace("đ", "")),
                        "shipping_fee": 30000
                    }
                    
                    order_response = requests.post(
                        f"{API_URL}/orders",
                        json=order_data
                    )
                    
                    if order_response.status_code == 200 and "id" in order_response.json():
                        order_id = order_response.json()["id"]
                        
                        # Verify order items have size-specific fields
                        order_items = order_response.json().get("items", [])
                        if (len(order_items) > 0 and 
                            "selected_size" in order_items[0] and 
                            "size_specific_price" in order_items[0] and
                            order_items[0]["selected_size"] == selected_size and
                            order_items[0]["size_specific_price"] == size_specific_price):
                            log_test("Create Order with Size-Specific Pricing", True, order_response)
                        else:
                            log_test("Create Order with Size-Specific Pricing", False, order_response,
                                    "Order created but size-specific fields not saved correctly")
                    else:
                        log_test("Create Order with Size-Specific Pricing", False, order_response,
                                f"Failed to create order: {order_response.status_code}")
                else:
                    log_test("Create Order with Size-Specific Pricing", False, error="Product doesn't have size_prices or sizes")
            else:
                log_test("Create Order with Size-Specific Pricing", False, error="No products available to create test order")
        except Exception as e:
            log_test("Create Order with Size-Specific Pricing", False, error=str(e))
    elif len(orders) > 0:
        order_id = orders[0]["id"]
    
    # Test PUT order status update
    if order_id:
        try:
            status_data = {"status": "confirmed"}
            
            response = requests.put(
                f"{API_URL}/admin/orders/{order_id}/status",
                headers={"Authorization": f"Bearer {token}"},
                json=status_data
            )
            
            if response.status_code == 200 and response.json()["status"] == "confirmed":
                log_test("Admin Orders - PUT Status Update", True, response)
            else:
                log_test("Admin Orders - PUT Status Update", False, response, 
                        f"Expected status 200 with updated status, got {response.status_code}")
        except Exception as e:
            log_test("Admin Orders - PUT Status Update", False, error=str(e))

def test_response_format_for_modern_ui():
    """Test API response formats for compatibility with modern UI components"""
    try:
        # Test public products API format for modern UI
        response = requests.get(f"{API_URL}/products")
        
        if response.status_code == 200 and isinstance(response.json(), list):
            products = response.json()
            
            # Check for fields needed by modern UI components
            required_fields = ['id', 'name', 'description', 'price', 'image', 'images', 
                              'category', 'material', 'rating', 'sizes', 'size_prices']
            
            all_fields_present = all(all(field in product for field in required_fields) 
                                    for product in products)
            
            if all_fields_present:
                log_test("API Response Format for Modern UI - Products", True)
            else:
                log_test("API Response Format for Modern UI - Products", False, 
                        error="Products API response missing fields required for modern UI")
        else:
            log_test("API Response Format for Modern UI - Products", False, response,
                    f"Expected status 200 with array, got {response.status_code}")
    except Exception as e:
        log_test("API Response Format for Modern UI - Products", False, error=str(e))
    
    # Get admin token for testing admin endpoints
    try:
        token = get_admin_token()
        
        # Test admin stats API format for modern UI (charts, cards)
        response = requests.get(
            f"{API_URL}/admin/stats",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        if response.status_code == 200:
            stats = response.json()
            
            # Check for fields needed by dashboard charts and cards
            required_fields = ['product_count', 'orders', 'total_revenue']
            orders_fields = ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled', 'total']
            
            fields_present = all(field in stats for field in required_fields)
            orders_fields_present = all(field in stats['orders'] for field in orders_fields)
            
            if fields_present and orders_fields_present:
                log_test("API Response Format for Modern UI - Admin Stats", True)
            else:
                missing = []
                if not fields_present:
                    missing.append("main stats fields")
                if not orders_fields_present:
                    missing.append("order status breakdown")
                
                log_test("API Response Format for Modern UI - Admin Stats", False,
                        error=f"Admin stats API response missing fields required for modern UI: {', '.join(missing)}")
        else:
            log_test("API Response Format for Modern UI - Admin Stats", False, response,
                    f"Expected status 200, got {response.status_code}")
    except Exception as e:
        log_test("API Response Format for Modern UI - Admin Stats", False, error=str(e))

def test_admin_stats(token: str):
    """Test admin stats endpoint"""
    try:
        response = requests.get(
            f"{API_URL}/admin/stats",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        if (response.status_code == 200 and 
            "product_count" in response.json() and 
            "orders" in response.json() and 
            "total_revenue" in response.json()):
            log_test("Admin Stats", True, response)
        else:
            log_test("Admin Stats", False, response, 
                    f"Expected status 200 with stats data, got {response.status_code}")
    except Exception as e:
        log_test("Admin Stats", False, error=str(e))
def test_backward_compatibility(token: str):
    """Test backward compatibility with products without size_prices"""
    # Create a product without size_prices
    new_product_id = None
    try:
        new_product = {
            "name": "Legacy Agarwood Product",
            "description": "A product without size-based pricing",
            "detail_description": "This product tests backward compatibility",
            "price": "500.000đ",
            "images": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="],
            "category": "Incense",
            "material": "Agarwood",
            "sizes": []  # No sizes
            # Intentionally omitting size_prices
        }
        
        response = requests.post(
            f"{API_URL}/admin/products",
            headers={"Authorization": f"Bearer {token}"},
            json=new_product
        )
        
        if response.status_code == 200 and "id" in response.json():
            new_product_id = response.json()["id"]
            log_test("Backward Compatibility - Create Product Without Size Pricing", True, response)
        else:
            log_test("Backward Compatibility - Create Product Without Size Pricing", False, response, 
                    f"Expected status 200 with id, got {response.status_code}")
    except Exception as e:
        log_test("Backward Compatibility - Create Product Without Size Pricing", False, error=str(e))
    
    # Create an order with the legacy product
    if new_product_id:
        try:
            # Create an order with the legacy product
            order_data = {
                "customer_name": "Legacy Customer",
                "customer_phone": "0987654321",
                "customer_email": "legacy@example.com",
                "customer_address": "456 Legacy Street",
                "note": "This is a legacy order without size-specific pricing",
                "items": [
                    {
                        "product_id": new_product_id,
                        "product_name": new_product["name"],
                        "price": new_product["price"],
                        "quantity": 1
                        # Intentionally omitting selected_size and size_specific_price
                    }
                ],
                "total_price": int(new_product["price"].replace(".", "").replace("đ", "")),
                "shipping_fee": 30000
            }
            
            order_response = requests.post(
                f"{API_URL}/orders",
                json=order_data
            )
            
            if order_response.status_code == 200 and "id" in order_response.json():
                log_test("Backward Compatibility - Create Order Without Size Pricing", True, order_response)
            else:
                log_test("Backward Compatibility - Create Order Without Size Pricing", False, order_response,
                        f"Failed to create legacy order: {order_response.status_code}")
        except Exception as e:
            log_test("Backward Compatibility - Create Order Without Size Pricing", False, error=str(e))
        
        # Clean up - delete the test product
        try:
            delete_response = requests.delete(
                f"{API_URL}/admin/products/{new_product_id}",
                headers={"Authorization": f"Bearer {token}"}
            )
            
            if delete_response.status_code == 200:
                print(f"  Cleaned up test product: {new_product_id}")
            else:
                print(f"  Failed to clean up test product: {delete_response.status_code}")
        except Exception as e:
            print(f"  Error cleaning up test product: {str(e)}")


def test_public_products():
    """Test public products endpoint with size-based pricing"""
    try:
        response = requests.get(f"{API_URL}/products")
        
        if response.status_code == 200 and isinstance(response.json(), list):
            products = response.json()
            
            # Check if products have size_prices field
            has_size_prices = all('size_prices' in product for product in products)
            
            # Check if products have both price and size_prices
            has_both_prices = all('price' in product and 'size_prices' in product for product in products)
            
            # Check if sizes and size_prices match
            sizes_match = all(set(product.get('sizes', [])) == set(product.get('size_prices', {}).keys()) 
                             for product in products if product.get('sizes') and product.get('size_prices'))
            
            if has_size_prices and has_both_prices and sizes_match:
                log_test("Public Products with Size-Based Pricing", True, response)
                print(f"  Found {len(products)} products with size-based pricing")
                # Print example of size_prices from first product
                if products:
                    print(f"  Example size_prices: {json.dumps(products[0].get('size_prices', {}), indent=2)}")
            else:
                errors = []
                if not has_size_prices:
                    errors.append("Some products missing size_prices field")
                if not has_both_prices:
                    errors.append("Some products missing either price or size_prices field")
                if not sizes_match:
                    errors.append("Sizes and size_prices keys don't match for some products")
                
                log_test("Public Products with Size-Based Pricing", False, response, 
                        f"Size-based pricing validation failed: {', '.join(errors)}")
        else:
            log_test("Public Products with Size-Based Pricing", False, response, 
                    f"Expected status 200 with array, got {response.status_code}")
    except Exception as e:
        log_test("Public Products with Size-Based Pricing", False, error=str(e))

def test_create_order_with_size_pricing():
    """Test creating an order with size-specific pricing"""
    try:
        # First get a product to use in the order
        product_response = requests.get(f"{API_URL}/products")
        if product_response.status_code == 200 and len(product_response.json()) > 0:
            product = product_response.json()[0]
            
            # Get the first size and its price from size_prices
            if product.get("size_prices") and product.get("sizes"):
                selected_size = product["sizes"][0]
                size_specific_price = product["size_prices"][selected_size]
                
                # Create an order with size-specific pricing
                order_data = {
                    "customer_name": "Test Customer",
                    "customer_phone": "0123456789",
                    "customer_email": "test@example.com",
                    "customer_address": "123 Test Street",
                    "note": "This is a test order with size-specific pricing",
                    "items": [
                        {
                            "product_id": product["id"],
                            "product_name": product["name"],
                            "price": size_specific_price,  # Use size-specific price
                            "quantity": 1,
                            "selected_size": selected_size,  # Include selected size
                            "size_specific_price": size_specific_price  # Include size-specific price
                        }
                    ],
                    "total_price": int(size_specific_price.replace(".", "").replace("đ", "")),
                    "shipping_fee": 30000
                }
                
                order_response = requests.post(
                    f"{API_URL}/orders",
                    json=order_data
                )
                
                if order_response.status_code == 200 and "id" in order_response.json():
                    # Verify order items have size-specific fields
                    order_items = order_response.json().get("items", [])
                    if (len(order_items) > 0 and 
                        "selected_size" in order_items[0] and 
                        "size_specific_price" in order_items[0] and
                        order_items[0]["selected_size"] == selected_size and
                        order_items[0]["size_specific_price"] == size_specific_price):
                        log_test("Create Order with Size-Specific Pricing", True, order_response)
                    else:
                        log_test("Create Order with Size-Specific Pricing", False, order_response,
                                "Order created but size-specific fields not saved correctly")
                else:
                    log_test("Create Order with Size-Specific Pricing", False, order_response,
                            f"Failed to create order: {order_response.status_code}")
            else:
                log_test("Create Order with Size-Specific Pricing", False, error="Product doesn't have size_prices or sizes")
        else:
            log_test("Create Order with Size-Specific Pricing", False, error="No products available to create test order")
    except Exception as e:
        log_test("Create Order with Size-Specific Pricing", False, error=str(e))

def test_sample_orders_flow():
    """Test the complete flow for creating sample orders for testing:
    1. Create admin user if not exists
    2. Admin login
    3. Seed sample products
    4. Create test orders with different statuses
    5. Verify orders exist
    """
    print(f"{Colors.HEADER}{'=' * 80}{Colors.ENDC}")
    print(f"{Colors.HEADER}TESTING SAMPLE ORDERS FLOW{Colors.ENDC}")
    print(f"{Colors.HEADER}{'=' * 80}{Colors.ENDC}")
    
    # Step 1: Create admin user if not exists
    try:
        response = requests.post(f"{API_URL}/admin/create")
        
        if response.status_code == 200:
            log_test("Create Admin User", True, response)
        else:
            log_test("Create Admin User", False, response, 
                    f"Expected status 200, got {response.status_code}")
    except Exception as e:
        log_test("Create Admin User", False, error=str(e))
    
    # Step 2: Admin login
    token = None
    try:
        response = requests.post(
            f"{API_URL}/admin/login",
            json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD}
        )
        
        if response.status_code == 200 and "access_token" in response.json():
            token = response.json()["access_token"]
            log_test("Admin Login", True, response)
        else:
            log_test("Admin Login", False, response, 
                    f"Expected status 200 with access_token, got {response.status_code}")
    except Exception as e:
        log_test("Admin Login", False, error=str(e))
    
    if not token:
        print(f"{Colors.FAIL}Cannot proceed without admin token{Colors.ENDC}")
        return
    
    # Step 3: Seed sample products
    try:
        response = requests.post(
            f"{API_URL}/admin/seed-products",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        if response.status_code == 200 and "message" in response.json():
            log_test("Seed Sample Products", True, response)
        else:
            log_test("Seed Sample Products", False, response, 
                    f"Expected status 200 with message, got {response.status_code}")
    except Exception as e:
        log_test("Seed Sample Products", False, error=str(e))
    
    # Get products for creating orders
    products = []
    try:
        response = requests.get(f"{API_URL}/products")
        
        if response.status_code == 200 and isinstance(response.json(), list):
            products = response.json()
            log_test("Get Products for Orders", True)
            print(f"  Found {len(products)} products")
        else:
            log_test("Get Products for Orders", False, response, 
                    f"Expected status 200 with array, got {response.status_code}")
    except Exception as e:
        log_test("Get Products for Orders", False, error=str(e))
    
    if not products:
        print(f"{Colors.FAIL}Cannot create orders without products{Colors.ENDC}")
        return
    
    # Step 4: Create test orders with different statuses
    order_ids = []
    
    # Create 3 orders with different customer data
    customers = [
        {
            "name": "Nguyễn Văn A",
            "phone": "0912345678",
            "email": "nguyenvana@example.com",
            "address": "123 Đường Lê Lợi, Quận 1, TP.HCM",
            "note": "Giao hàng giờ hành chính"
        },
        {
            "name": "Trần Thị B",
            "phone": "0987654321",
            "email": "tranthib@example.com",
            "address": "456 Đường Nguyễn Huệ, Quận 1, TP.HCM",
            "note": "Gọi trước khi giao"
        },
        {
            "name": "Lê Văn C",
            "phone": "0909123456",
            "email": "levanc@example.com",
            "address": "789 Đường Cách Mạng Tháng 8, Quận 3, TP.HCM",
            "note": "Giao buổi tối sau 18h"
        }
    ]
    
    for i, customer in enumerate(customers):
        # Select a product with size-based pricing
        product = products[i % len(products)]
        
        # Get a size and its price
        if product.get("size_prices") and product.get("sizes"):
            selected_size = product["sizes"][0]
            size_specific_price = product["size_prices"][selected_size]
            
            # Create order
            try:
                order_data = {
                    "customer_name": customer["name"],
                    "customer_phone": customer["phone"],
                    "customer_email": customer["email"],
                    "customer_address": customer["address"],
                    "note": customer["note"],
                    "items": [
                        {
                            "product_id": product["id"],
                            "product_name": product["name"],
                            "price": size_specific_price,
                            "quantity": 1,
                            "selected_size": selected_size,
                            "size_specific_price": size_specific_price
                        }
                    ],
                    "total_price": int(size_specific_price.replace(".", "").replace("đ", "")),
                    "shipping_fee": 30000
                }
                
                response = requests.post(
                    f"{API_URL}/orders",
                    json=order_data
                )
                
                if response.status_code == 200 and "id" in response.json():
                    order_id = response.json()["id"]
                    order_ids.append(order_id)
                    log_test(f"Create Test Order {i+1}", True, response)
                else:
                    log_test(f"Create Test Order {i+1}", False, response, 
                            f"Expected status 200 with id, got {response.status_code}")
            except Exception as e:
                log_test(f"Create Test Order {i+1}", False, error=str(e))
        else:
            log_test(f"Create Test Order {i+1}", False, 
                    error=f"Product {product['name']} doesn't have size-based pricing")
    
    # Update order statuses to have different statuses
    if len(order_ids) >= 3:
        status_updates = [
            {"order_index": 0, "status": "confirmed"},
            {"order_index": 1, "status": "shipping"},
            {"order_index": 2, "status": "pending"}  # Keep as pending
        ]
        
        for update in status_updates:
            if update["status"] != "pending":  # Skip if we want to keep it pending
                try:
                    order_id = order_ids[update["order_index"]]
                    status_data = {"status": update["status"]}
                    
                    response = requests.put(
                        f"{API_URL}/admin/orders/{order_id}/status",
                        headers={"Authorization": f"Bearer {token}"},
                        json=status_data
                    )
                    
                    if response.status_code == 200 and response.json()["status"] == update["status"]:
                        log_test(f"Update Order {update['order_index']+1} Status to {update['status']}", True, response)
                    else:
                        log_test(f"Update Order {update['order_index']+1} Status to {update['status']}", False, response, 
                                f"Expected status 200 with updated status, got {response.status_code}")
                except Exception as e:
                    log_test(f"Update Order {update['order_index']+1} Status to {update['status']}", False, error=str(e))
    
    # Step 5: Verify orders exist
    try:
        response = requests.get(
            f"{API_URL}/admin/orders",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        if response.status_code == 200 and isinstance(response.json(), list):
            orders = response.json()
            
            # Check if our created orders exist
            created_orders_exist = all(order_id in [order["id"] for order in orders] for order_id in order_ids)
            
            # Check if we have orders with different statuses
            statuses = set(order["status"] for order in orders)
            multiple_statuses = len(statuses) > 1
            
            if created_orders_exist and multiple_statuses:
                log_test("Verify Orders Exist with Different Statuses", True, response)
                print(f"  Found {len(orders)} orders with statuses: {', '.join(statuses)}")
            elif created_orders_exist:
                log_test("Verify Orders Exist", True, response)
                print(f"  Found {len(orders)} orders but all have the same status: {next(iter(statuses))}")
            else:
                log_test("Verify Orders Exist", False, response, 
                        "Not all created orders were found in the admin orders list")
        else:
            log_test("Verify Orders Exist", False, response, 
                    f"Expected status 200 with array, got {response.status_code}")
    except Exception as e:
        log_test("Verify Orders Exist", False, error=str(e))
    
    print(f"{Colors.HEADER}{'=' * 80}{Colors.ENDC}")
    print(f"{Colors.HEADER}SAMPLE ORDERS FLOW COMPLETED{Colors.ENDC}")
    print(f"{Colors.HEADER}{'=' * 80}{Colors.ENDC}")

def test_create_delivered_order():
    """Test creating an order with 'delivered' status as requested:
    1. Login as admin to get token
    2. Get products list
    3. Create new order with specific customer info
    4. Update status to 'delivered'
    5. Verify order exists with 'delivered' status
    """
    print(f"{Colors.HEADER}{'=' * 80}{Colors.ENDC}")
    print(f"{Colors.HEADER}TESTING CREATE DELIVERED ORDER FLOW{Colors.ENDC}")
    print(f"{Colors.HEADER}{'=' * 80}{Colors.ENDC}")
    
    # Step 1: Admin login
    token = None
    try:
        response = requests.post(
            f"{API_URL}/admin/login",
            json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD}
        )
        
        if response.status_code == 200 and "access_token" in response.json():
            token = response.json()["access_token"]
            log_test("Admin Login for Delivered Order", True, response)
        else:
            log_test("Admin Login for Delivered Order", False, response, 
                    f"Expected status 200 with access_token, got {response.status_code}")
    except Exception as e:
        log_test("Admin Login for Delivered Order", False, error=str(e))
    
    if not token:
        print(f"{Colors.FAIL}Cannot proceed without admin token{Colors.ENDC}")
        return
    
    # Step 2: Get products
    products = []
    try:
        response = requests.get(f"{API_URL}/products")
        
        if response.status_code == 200 and isinstance(response.json(), list):
            products = response.json()
            log_test("Get Products for Delivered Order", True)
            print(f"  Found {len(products)} products")
        else:
            log_test("Get Products for Delivered Order", False, response, 
                    f"Expected status 200 with array, got {response.status_code}")
    except Exception as e:
        log_test("Get Products for Delivered Order", False, error=str(e))
    
    if not products:
        print(f"{Colors.FAIL}Cannot create order without products{Colors.ENDC}")
        return
    
    # Step 3: Create new order with specific customer info from the review request
    order_id = None
    try:
        # Select a product with size-based pricing (use a different product than previous tests)
        product = products[1] if len(products) > 1 else products[0]  # Use the second product if available
        
        # Get a size and its price (use a different size than the first one if possible)
        if product.get("size_prices") and product.get("sizes"):
            selected_size = product["sizes"][1] if len(product["sizes"]) > 1 else product["sizes"][0]
            size_specific_price = product["size_prices"][selected_size]
            
            # Create order with the specified customer info from the review request
            order_data = {
                "customer_name": "Hoàng Văn E",
                "customer_phone": "0901234567",
                "customer_email": "hoangvane@example.com",
                "customer_address": "555 Đường Võ Văn Tần, Quận 3, TP.HCM",
                "note": "Giao hàng nhanh, sản phẩm đẹp",
                "items": [
                    {
                        "product_id": product["id"],
                        "product_name": product["name"],
                        "price": size_specific_price,
                        "quantity": 1,
                        "selected_size": selected_size,
                        "size_specific_price": size_specific_price
                    }
                ],
                "total_price": int(size_specific_price.replace(".", "").replace("đ", "")),
                "shipping_fee": 30000
            }
            
            response = requests.post(
                f"{API_URL}/orders",
                json=order_data
            )
            
            if response.status_code == 200 and "id" in response.json():
                order_id = response.json()["id"]
                log_test("Create New Order for Delivered Status", True, response)
                print(f"  Created order with ID: {order_id}")
                print(f"  Customer: {order_data['customer_name']}")
                print(f"  Product: {product['name']} (Size: {selected_size}, Price: {size_specific_price})")
            else:
                log_test("Create New Order for Delivered Status", False, response, 
                        f"Expected status 200 with id, got {response.status_code}")
        else:
            log_test("Create New Order for Delivered Status", False, 
                    error=f"Product {product['name']} doesn't have size-based pricing")
    except Exception as e:
        log_test("Create New Order for Delivered Status", False, error=str(e))
    
    if not order_id:
        print(f"{Colors.FAIL}Cannot proceed without order ID{Colors.ENDC}")
        return
    
    # Step 4: Update order status to "delivered"
    try:
        status_data = {"status": "delivered"}
        
        response = requests.put(
            f"{API_URL}/admin/orders/{order_id}/status",
            headers={"Authorization": f"Bearer {token}"},
            json=status_data
        )
        
        if response.status_code == 200 and response.json()["status"] == "delivered":
            log_test("Update Order Status to Delivered", True, response)
        else:
            log_test("Update Order Status to Delivered", False, response, 
                    f"Expected status 200 with status 'delivered', got {response.status_code}")
    except Exception as e:
        log_test("Update Order Status to Delivered", False, error=str(e))
    
    # Step 5: Verify order exists with "delivered" status
    try:
        response = requests.get(
            f"{API_URL}/admin/orders",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        if response.status_code == 200 and isinstance(response.json(), list):
            orders = response.json()
            
            # Find our specific order
            delivered_order = next((order for order in orders if order["id"] == order_id), None)
            
            if delivered_order and delivered_order["status"] == "delivered":
                log_test("Verify Order with Delivered Status", True, response)
                print(f"  Confirmed: Order {order_id} has status 'delivered'")
                print(f"  Customer: {delivered_order['customer_name']}")
                print(f"  Order items: {len(delivered_order['items'])}")
                
                # Count delivered orders to confirm increase
                delivered_count = sum(1 for order in orders if order["status"] == "delivered")
                print(f"  Total delivered orders: {delivered_count}")
            else:
                log_test("Verify Order with Delivered Status", False, response, 
                        f"Order {order_id} not found or status is not 'delivered'")
        else:
            log_test("Verify Order with Delivered Status", False, response, 
                    f"Expected status 200 with array, got {response.status_code}")
    except Exception as e:
        log_test("Verify Order with Delivered Status", False, error=str(e))
    
    print(f"{Colors.HEADER}{'=' * 80}{Colors.ENDC}")
    print(f"{Colors.HEADER}CREATE DELIVERED ORDER FLOW COMPLETED{Colors.ENDC}")
    print(f"{Colors.HEADER}{'=' * 80}{Colors.ENDC}")

def test_products_api_for_featured_section():
    """Test the GET /api/products endpoint specifically for featured products section"""
    print(f"{Colors.HEADER}Testing GET /api/products for Featured Products Section{Colors.ENDC}")
    
    try:
        response = requests.get(f"{API_URL}/products")
        
        if response.status_code == 200:
            products = response.json()
            
            # Check if we have products
            if len(products) > 0:
                log_test("GET /api/products - Products Available", True, response)
                print(f"  Found {len(products)} products")
                
                # Print details of the first few products
                for i, product in enumerate(products[:3]):
                    print(f"\n  Product {i+1}:")
                    print(f"    ID: {product.get('id')}")
                    print(f"    Name: {product.get('name')}")
                    print(f"    Price: {product.get('price')}")
                    print(f"    Category: {product.get('category')}")
                    print(f"    Has Image: {'Yes' if product.get('image') else 'No'}")
                    print(f"    Size Prices: {product.get('size_prices', {})}")
                    print(f"    Sizes: {product.get('sizes', [])}")
            else:
                log_test("GET /api/products - Products Available", False, response, 
                        "No products found in the response")
                
                # If no products, check if we need to seed the database
                print("  No products found. Attempting to seed the database...")
                
                # Get admin token
                try:
                    token = get_admin_token()
                    
                    # Call seed-products endpoint
                    seed_response = requests.post(
                        f"{API_URL}/admin/seed-products",
                        headers={"Authorization": f"Bearer {token}"}
                    )
                    
                    if seed_response.status_code == 200:
                        print("  Successfully seeded the database with sample products")
                        
                        # Try getting products again
                        retry_response = requests.get(f"{API_URL}/products")
                        if retry_response.status_code == 200 and len(retry_response.json()) > 0:
                            log_test("GET /api/products - After Seeding", True, retry_response)
                            print(f"  Found {len(retry_response.json())} products after seeding")
                        else:
                            log_test("GET /api/products - After Seeding", False, retry_response,
                                    "Still no products after seeding")
                    else:
                        log_test("Seed Products", False, seed_response,
                                f"Failed to seed products: {seed_response.status_code}")
                except Exception as e:
                    log_test("Seed Products", False, error=str(e))
        else:
            log_test("GET /api/products - Status Code", False, response,
                    f"Expected status 200, got {response.status_code}")
    except Exception as e:
        log_test("GET /api/products", False, error=str(e))
    
    # Check CORS headers
    try:
        response = requests.options(f"{API_URL}/products")
        
        cors_headers = [
            'Access-Control-Allow-Origin',
            'Access-Control-Allow-Methods',
            'Access-Control-Allow-Headers'
        ]
        
        has_cors_headers = all(header in response.headers for header in cors_headers)
        
        if has_cors_headers:
            log_test("CORS Headers for /api/products", True, response)
            print("  CORS headers found:")
            for header in cors_headers:
                if header in response.headers:
                    print(f"    {header}: {response.headers[header]}")
        else:
            log_test("CORS Headers for /api/products", False, response,
                    "Missing required CORS headers")
            print("  Available headers:")
            for header, value in response.headers.items():
                print(f"    {header}: {value}")
    except Exception as e:
        log_test("CORS Headers for /api/products", False, error=str(e))

def check_mongodb_connection():
    """Check if MongoDB is running and accessible"""
    print(f"{Colors.HEADER}Checking MongoDB Connection{Colors.ENDC}")
    
    try:
        # Use the backend to check MongoDB connection
        response = requests.get(f"{API_URL}/status")
        
        if response.status_code == 200:
            log_test("MongoDB Connection via API", True, response)
        else:
            log_test("MongoDB Connection via API", False, response,
                    f"Expected status 200, got {response.status_code}")
    except Exception as e:
        log_test("MongoDB Connection via API", False, error=str(e))

def run_tests():
    """Run specific tests as requested in the review"""
    print(f"{Colors.HEADER}{'=' * 80}{Colors.ENDC}")
    print(f"{Colors.HEADER}TESTING BACKEND APIs AFTER MOBILE UI OPTIMIZATION{Colors.ENDC}")
    print(f"{Colors.HEADER}Backend URL: {BACKEND_URL}{Colors.ENDC}")
    print(f"{Colors.HEADER}{'=' * 80}{Colors.ENDC}")
    
    # Check MongoDB connection
    check_mongodb_connection()
    
    # Test the specific endpoints mentioned in the review request
    print(f"{Colors.HEADER}1. Testing GET /api/products endpoint{Colors.ENDC}")
    test_products_api_for_featured_section()
    
    # Get admin token for authenticated tests
    token = get_admin_token()
    
    # Test admin stats endpoint
    print(f"{Colors.HEADER}2. Testing GET /api/admin/stats endpoint{Colors.ENDC}")
    test_admin_stats(token)
    
    # Test creating an order with size-specific pricing
    print(f"{Colors.HEADER}3. Testing POST /api/orders endpoint with size-specific pricing{Colors.ENDC}")
    test_create_order_with_size_pricing()
    
    # Print summary
    print(f"{Colors.HEADER}{'=' * 80}{Colors.ENDC}")
    print(f"{Colors.HEADER}TEST SUMMARY{Colors.ENDC}")
    print(f"{Colors.HEADER}{'=' * 80}{Colors.ENDC}")
    print(f"Total Tests: {test_results['passed'] + test_results['failed']}")
    print(f"Passed: {Colors.OKGREEN}{test_results['passed']}{Colors.ENDC}")
    print(f"Failed: {Colors.FAIL}{test_results['failed']}{Colors.ENDC}")
    
    # List failed tests if any
    if test_results['failed'] > 0:
        print(f"\n{Colors.FAIL}Failed Tests:{Colors.ENDC}")
        for test in test_results['tests']:
            if not test['passed']:
                print(f"- {test['name']}: {test['error']}")
        
        print(f"\n{Colors.WARNING}Recommendations:{Colors.ENDC}")
        print("1. Check if MongoDB is running and accessible")
        print("2. Verify that products have been seeded in the database")
        print("3. Check for any errors in the backend logs")
        print("4. Ensure CORS is properly configured for frontend access")
    else:
        print(f"\n{Colors.OKGREEN}All backend API tests passed successfully!{Colors.ENDC}")
        print(f"{Colors.OKGREEN}Backend health check complete - all endpoints returning status 200 with proper data format.{Colors.ENDC}")
        print(f"{Colors.OKGREEN}The mobile UI optimization changes have not affected the backend API functionality.{Colors.ENDC}")

def run_comprehensive_tests():
    """Run all tests to verify backend functionality after ProductDetailModal UI enhancements"""
    print(f"{Colors.HEADER}{'=' * 80}{Colors.ENDC}")
    print(f"{Colors.HEADER}COMPREHENSIVE BACKEND API TESTING AFTER PRODUCTDETAILMODAL UI ENHANCEMENTS{Colors.ENDC}")
    print(f"{Colors.HEADER}Backend URL: {BACKEND_URL}{Colors.ENDC}")
    print(f"{Colors.HEADER}{'=' * 80}{Colors.ENDC}")
    
    # Get admin token for authenticated tests
    token = get_admin_token()
    
    # Test admin login
    test_admin_login()
    
    # Test admin me endpoint
    test_admin_me(token)
    
    # Test admin products endpoints with size-based pricing
    test_admin_products(token)
    
    # Test admin orders endpoints with size-specific pricing
    test_admin_orders(token)
    
    # Test admin stats endpoint
    test_admin_stats(token)
    
    # Test public products endpoint with size-based pricing
    test_public_products()
    
    # Test creating an order with size-specific pricing
    test_create_order_with_size_pricing()
    
    # Test backward compatibility
    test_backward_compatibility(token)
    
    # Test response format for modern UI
    test_response_format_for_modern_ui()
    
    # Print summary
    print(f"{Colors.HEADER}{'=' * 80}{Colors.ENDC}")
    print(f"{Colors.HEADER}COMPREHENSIVE TEST SUMMARY{Colors.ENDC}")
    print(f"{Colors.HEADER}{'=' * 80}{Colors.ENDC}")
    print(f"Total Tests: {test_results['passed'] + test_results['failed']}")
    print(f"Passed: {Colors.OKGREEN}{test_results['passed']}{Colors.ENDC}")
    print(f"Failed: {Colors.FAIL}{test_results['failed']}{Colors.ENDC}")
    
    # List failed tests if any
    if test_results['failed'] > 0:
        print(f"\n{Colors.FAIL}Failed Tests:{Colors.ENDC}")
        for test in test_results['tests']:
            if not test['passed']:
                print(f"- {test['name']}: {test['error']}")
        
        print(f"\n{Colors.WARNING}Recommendations:{Colors.ENDC}")
        print("1. Check if MongoDB is running and accessible")
        print("2. Verify that products have been seeded in the database")
        print("3. Check for any errors in the backend logs")
        print("4. Ensure CORS is properly configured for frontend access")
    else:
        print(f"\n{Colors.OKGREEN}All backend API tests passed successfully!{Colors.ENDC}")
        print(f"{Colors.OKGREEN}Backend health check complete - all endpoints returning status 200 with proper data format.{Colors.ENDC}")
        print(f"{Colors.OKGREEN}The ProductDetailModal UI enhancements have not affected the backend API functionality.{Colors.ENDC}")

if __name__ == "__main__":
    # Reset test results
    test_results = {
        "passed": 0,
        "failed": 0,
        "tests": []
    }
    
    # Run specific tests as requested in the review
    run_tests()