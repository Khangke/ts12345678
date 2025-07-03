#!/usr/bin/env python3
import requests
import json
import sys

# Backend URL
BACKEND_URL = "http://0.0.0.0:8001"
API_URL = f"{BACKEND_URL}/api"

def test_products_api():
    """Test GET /api/products endpoint for featured products section"""
    print("Testing GET /api/products for featured products section...")
    
    try:
        response = requests.get(f"{API_URL}/products")
        
        if response.status_code == 200:
            products = response.json()
            
            if len(products) > 0:
                print(f"✅ Success: Found {len(products)} products")
                
                # Check required fields
                required_fields = ['id', 'name', 'description', 'price', 'category', 'material', 'rating', 'sizes', 'size_prices']
                all_fields_present = all(all(field in product for field in required_fields) for product in products)
                
                if all_fields_present:
                    print("✅ Success: All products have the required fields")
                else:
                    print("❌ Error: Some products are missing required fields")
                    missing_fields = {}
                    for i, product in enumerate(products):
                        missing = [field for field in required_fields if field not in product]
                        if missing:
                            missing_fields[product.get('name', f'Product {i+1}')] = missing
                    print(f"Missing fields: {json.dumps(missing_fields, indent=2)}")
                
                # Check size-based pricing
                has_size_pricing = all('size_prices' in product and product['size_prices'] for product in products)
                if has_size_pricing:
                    print("✅ Success: All products have size-based pricing")
                else:
                    print("❌ Error: Some products don't have size-based pricing")
                
                # Print sample product details
                print("\nSample product details:")
                sample_product = products[0]
                print(f"Name: {sample_product.get('name')}")
                print(f"Description: {sample_product.get('description')}")
                print(f"Price: {sample_product.get('price')}")
                print(f"Category: {sample_product.get('category')}")
                print(f"Material: {sample_product.get('material')}")
                print(f"Sizes: {sample_product.get('sizes')}")
                print(f"Size Prices: {json.dumps(sample_product.get('size_prices'), indent=2)}")
                
                return True
            else:
                print("❌ Error: No products found")
                return False
        else:
            print(f"❌ Error: Expected status 200, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

def test_create_order_with_size_pricing():
    """Test creating an order with size-specific pricing"""
    print("\nTesting POST /api/orders with size-specific pricing...")
    
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
                        print("✅ Success: Order created with size-specific pricing")
                        print(f"Order ID: {order_response.json().get('id')}")
                        print(f"Product: {product['name']}")
                        print(f"Selected Size: {selected_size}")
                        print(f"Size-Specific Price: {size_specific_price}")
                        return True
                    else:
                        print("❌ Error: Order created but size-specific fields not saved correctly")
                        return False
                else:
                    print(f"❌ Error: Failed to create order: {order_response.status_code}")
                    return False
            else:
                print("❌ Error: Product doesn't have size_prices or sizes")
                return False
        else:
            print("❌ Error: No products available to create test order")
            return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

def test_admin_stats():
    """Test admin stats endpoint"""
    print("\nTesting GET /api/admin/stats...")
    
    try:
        # Create admin user
        create_admin_response = requests.post(f"{API_URL}/admin/create")
        if create_admin_response.status_code != 200:
            print(f"❌ Error: Failed to create admin user: {create_admin_response.status_code}")
            return False
        
        # Login as admin
        login_response = requests.post(
            f"{API_URL}/admin/login",
            json={"username": "admin", "password": "admin123"}
        )
        
        if login_response.status_code != 200 or "access_token" not in login_response.json():
            print(f"❌ Error: Failed to login as admin: {login_response.status_code}")
            return False
        
        token = login_response.json()["access_token"]
        
        # Get admin stats
        stats_response = requests.get(
            f"{API_URL}/admin/stats",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        if stats_response.status_code == 200:
            stats = stats_response.json()
            
            # Check required fields
            required_fields = ['product_count', 'orders', 'total_revenue']
            orders_fields = ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled', 'total']
            
            fields_present = all(field in stats for field in required_fields)
            orders_fields_present = all(field in stats['orders'] for field in orders_fields)
            
            if fields_present and orders_fields_present:
                print("✅ Success: Admin stats API returns all required fields")
                print(f"Product Count: {stats['product_count']}")
                print(f"Orders: {stats['orders']}")
                print(f"Total Revenue: {stats['total_revenue']}")
                return True
            else:
                missing = []
                if not fields_present:
                    missing.append("main stats fields")
                if not orders_fields_present:
                    missing.append("order status breakdown")
                
                print(f"❌ Error: Admin stats API missing fields: {', '.join(missing)}")
                return False
        else:
            print(f"❌ Error: Failed to get admin stats: {stats_response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

if __name__ == "__main__":
    print("=" * 80)
    print("TESTING BACKEND API ENDPOINTS FOR FEATURED PRODUCTS SECTION")
    print("=" * 80)
    
    # Test products API
    products_api_success = test_products_api()
    
    # Test creating an order with size-specific pricing
    order_creation_success = test_create_order_with_size_pricing()
    
    # Test admin stats
    admin_stats_success = test_admin_stats()
    
    # Print summary
    print("\n" + "=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    print(f"GET /api/products: {'✅ PASSED' if products_api_success else '❌ FAILED'}")
    print(f"POST /api/orders: {'✅ PASSED' if order_creation_success else '❌ FAILED'}")
    print(f"GET /api/admin/stats: {'✅ PASSED' if admin_stats_success else '❌ FAILED'}")
    
    if products_api_success and order_creation_success and admin_stats_success:
        print("\n✅ All backend API tests passed successfully!")
        print("✅ Backend is working correctly after FeaturedProductsSection improvements.")
        print("✅ Size-based pricing is functioning properly.")
    else:
        print("\n❌ Some tests failed. See details above.")
        sys.exit(1)