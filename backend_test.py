#!/usr/bin/env python3
import requests
import json
import time
import sys
from typing import Dict, Any, List, Optional

# Backend URL from the review request
BACKEND_URL = "https://877769f5-b571-4147-8fca-e7e3401696e4.preview.emergentagent.com"
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

def run_tests():
    """Run all tests"""
    print(f"{Colors.HEADER}{'=' * 80}{Colors.ENDC}")
    print(f"{Colors.HEADER}TESTING ADMIN SYSTEM BACKEND APIs{Colors.ENDC}")
    print(f"{Colors.HEADER}Backend URL: {BACKEND_URL}{Colors.ENDC}")
    print(f"{Colors.HEADER}{'=' * 80}{Colors.ENDC}")
    
    # Test admin login
    test_admin_login()
    
    # Get admin token for authenticated tests
    token = get_admin_token()
    
    # Test admin me endpoint
    test_admin_me(token)
    
    # Test admin products endpoints
    test_admin_products(token)
    
    # Test admin orders endpoints
    test_admin_orders(token)
    
    # Test admin stats endpoint
    test_admin_stats(token)
    
    # Test public products endpoint
    test_public_products()
    
    # Test API response formats for modern UI
    test_response_format_for_modern_ui()
    
    # Test backward compatibility
    test_backward_compatibility(token)
    
    # Test creating an order with size-specific pricing
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

if __name__ == "__main__":
    run_tests()