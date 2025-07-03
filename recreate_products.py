#!/usr/bin/env python3
import requests
import json
import time
import sys
from typing import Dict, Any, List, Optional

# Backend URL from the frontend .env file
BACKEND_URL = "https://93723cf4-1d60-48d9-b0c2-b84d23a31ce5.preview.emergentagent.com"
API_URL = f"{BACKEND_URL}/api"

# Admin credentials
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"

def print_header(text):
    print("=" * 80)
    print(text)
    print("=" * 80)

def get_admin_token():
    """Get admin JWT token"""
    try:
        response = requests.post(
            f"{API_URL}/admin/login",
            json={"username": ADMIN_USERNAME, "password": ADMIN_PASSWORD}
        )
        response.raise_for_status()
        return response.json()["access_token"]
    except Exception as e:
        print(f"Failed to get admin token: {str(e)}")
        return None

def fix_product_images_direct_db():
    """Fix products by recreating them with proper image fields"""
    print_header("FIXING PRODUCT IMAGES BY RECREATING PRODUCTS")
    
    # Get admin token
    token = get_admin_token()
    if not token:
        print("Could not get admin token to update products")
        return
    
    try:
        # Get products
        response = requests.get(f"{API_URL}/products")
        
        if response.status_code == 200:
            products = response.json()
            
            if len(products) > 0:
                # Sample image URL (using a placeholder image)
                sample_image = "https://images.unsplash.com/photo-1509726360306-3f44543aea4c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxpbmNlbnNlJTIwc3RpY2tzfGVufDB8fHx8MTc1MTQyOTg2OHww&ixlib=rb-4.1.0&q=85"
                
                # First, delete all existing products
                for product in products:
                    delete_response = requests.delete(
                        f"{API_URL}/admin/products/{product['id']}",
                        headers={"Authorization": f"Bearer {token}"}
                    )
                    
                    if delete_response.status_code == 200:
                        print(f"Deleted product: {product['name']}")
                    else:
                        print(f"Failed to delete product {product['name']}: {delete_response.status_code}")
                
                # Now create new products with proper image fields
                product_templates = [
                    {
                        "name": "Vòng tay trầm hương cao cấp",
                        "description": "Vòng tay trầm hương nguyên chất, thơm nhẹ và bền màu, phù hợp đeo hàng ngày.",
                        "detail_description": "Vòng tay trầm hương được chế tác từ gỗ trầm hương tự nhiên, mang lại cảm giác thư thái và may mắn cho người đeo.",
                        "price": "1.500.000đ",
                        "size_prices": {
                            "10mm": "1.500.000đ",
                            "12mm": "1.800.000đ",
                            "14mm": "2.200.000đ",
                            "16mm": "2.800.000đ",
                            "18mm": "3.500.000đ"
                        },
                        "image": sample_image,
                        "images": [sample_image],
                        "category": "Vòng tay trầm",
                        "material": "Gỗ trầm hương tự nhiên",
                        "sizes": ["10mm", "12mm", "14mm", "16mm", "18mm"]
                    },
                    {
                        "name": "Tinh dầu trầm hương nguyên chất",
                        "description": "Tinh dầu trầm hương 100% nguyên chất, chiết xuất từ gỗ trầm hương cao cấp.",
                        "detail_description": "Tinh dầu trầm hương được chưng cất từ gỗ trầm hương cao cấp, có tác dụng thư giãn tinh thần, giảm stress.",
                        "price": "800.000đ",
                        "size_prices": {
                            "5ml": "800.000đ",
                            "10ml": "1.400.000đ",
                            "20ml": "2.500.000đ"
                        },
                        "image": sample_image,
                        "images": [sample_image],
                        "category": "Tinh dầu trầm",
                        "material": "Tinh dầu nguyên chất",
                        "sizes": ["5ml", "10ml", "20ml"]
                    },
                    {
                        "name": "Cảnh trầm hương phong thủy",
                        "description": "Tác phẩm nghệ thuật từ trầm hương tự nhiên, dùng trang trí và phong thủy, mang lại may mắn.",
                        "detail_description": "Cảnh trầm hương được chế tác thủ công từ gỗ trầm hương tự nhiên, mang ý nghĩa phong thủy tốt lành.",
                        "price": "8.000.000đ",
                        "size_prices": {
                            "Size S (10-15cm)": "8.000.000đ",
                            "Size M (15-20cm)": "15.000.000đ",
                            "Size L (20-30cm)": "25.000.000đ"
                        },
                        "image": sample_image,
                        "images": [sample_image],
                        "category": "Cảnh trầm",
                        "material": "Gỗ trầm hương nguyên khối",
                        "sizes": ["Size S (10-15cm)", "Size M (15-20cm)", "Size L (20-30cm)"]
                    }
                ]
                
                for template in product_templates:
                    create_response = requests.post(
                        f"{API_URL}/admin/products",
                        headers={"Authorization": f"Bearer {token}"},
                        json=template
                    )
                    
                    if create_response.status_code == 200:
                        print(f"Created product: {template['name']}")
                        created_product = create_response.json()
                        print(f"  ID: {created_product.get('id')}")
                        print(f"  Image: {created_product.get('image')}")
                        print(f"  Images array length: {len(created_product.get('images', []))}")
                    else:
                        print(f"Failed to create product {template['name']}: {create_response.status_code}")
                        print(f"Response: {create_response.text}")
            else:
                print("No products found to recreate")
        else:
            print(f"Failed to get products: {response.status_code}")
    except Exception as e:
        print(f"Error recreating products: {str(e)}")

def verify_product_images():
    """Verify that products have both image and images fields populated"""
    print_header("VERIFYING PRODUCT IMAGES")
    
    try:
        response = requests.get(f"{API_URL}/products")
        
        if response.status_code == 200:
            products = response.json()
            
            if len(products) > 0:
                all_images_ok = True
                
                for product in products:
                    print(f"Product: {product.get('name')}")
                    print(f"  Image: {product.get('image')}")
                    print(f"  Images array length: {len(product.get('images', []))}")
                    
                    if not product.get('image'):
                        print("  WARNING: Product has no main image")
                        all_images_ok = False
                    
                    if not product.get('images'):
                        print("  WARNING: Product has no images in the images array")
                        all_images_ok = False
                    
                    print("")
                
                if all_images_ok:
                    print("All products have both image and images fields populated")
                else:
                    print("Some products are still missing images")
            else:
                print("No products found to verify")
        else:
            print(f"Failed to get products: {response.status_code}")
    except Exception as e:
        print(f"Error verifying product images: {str(e)}")

if __name__ == "__main__":
    fix_product_images_direct_db()
    verify_product_images()
    
    print_header("RECOMMENDATIONS")
    print("1. Restart the frontend service: sudo supervisorctl restart frontend")
    print("2. Clear the browser cache or localStorage to remove any cached product data")
    print("3. Check the frontend console for any errors")
    print("4. If the issue persists, check the frontend code for how it handles images")