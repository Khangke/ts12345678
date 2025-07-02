#!/usr/bin/env python3
import requests
import json
import time
import sys
from typing import Dict, Any, List, Optional

# Backend URL from the review request
BACKEND_URL = "https://104f6ade-0aa9-4787-908c-8fd16d34a8ff.preview.emergentagent.com"
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
    """Test admin products endpoints"""
    # Test GET all products
    try:
        response = requests.get(
            f"{API_URL}/admin/products",
            headers={"Authorization": f"Bearer {token}"}
        )
        
        if response.status_code == 200 and isinstance(response.json(), list):
            log_test("Admin Products - GET All", True, response)
            products = response.json()
            print(f"  Found {len(products)} products")
        else:
            log_test("Admin Products - GET All", False, response, 
                    f"Expected status 200 with array, got {response.status_code}")
            products = []
    except Exception as e:
        log_test("Admin Products - GET All", False, error=str(e))
        products = []
    
    # Test POST new product
    new_product_id = None
    try:
        new_product = {
            "name": "Test Agarwood Bracelet",
            "description": "A beautiful test bracelet",
            "detail_description": "This is a detailed description for testing",
            "price": "999.000",
            "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
            "category": "Bracelet",
            "material": "Agarwood",
            "sizes": ["S", "M", "L"]
        }
        
        response = requests.post(
            f"{API_URL}/admin/products",
            headers={"Authorization": f"Bearer {token}"},
            json=new_product
        )
        
        if response.status_code == 200 and "id" in response.json():
            new_product_id = response.json()["id"]
            log_test("Admin Products - POST Create", True, response)
        else:
            log_test("Admin Products - POST Create", False, response, 
                    f"Expected status 200 with id, got {response.status_code}")
    except Exception as e:
        log_test("Admin Products - POST Create", False, error=str(e))
    
    # Test GET specific product
    if new_product_id:
        try:
            response = requests.get(
                f"{API_URL}/admin/products/{new_product_id}",
                headers={"Authorization": f"Bearer {token}"}
            )
            
            if response.status_code == 200 and response.json()["id"] == new_product_id:
                log_test("Admin Products - GET Specific", True, response)
            else:
                log_test("Admin Products - GET Specific", False, response, 
                        f"Expected status 200 with matching id, got {response.status_code}")
        except Exception as e:
            log_test("Admin Products - GET Specific", False, error=str(e))
    
    # Test PUT update product
    if new_product_id:
        try:
            update_data = {
                "name": "Updated Test Bracelet",
                "price": "1.200.000"
            }
            
            response = requests.put(
                f"{API_URL}/admin/products/{new_product_id}",
                headers={"Authorization": f"Bearer {token}"},
                json=update_data
            )
            
            if (response.status_code == 200 and 
                response.json()["id"] == new_product_id and 
                response.json()["name"] == update_data["name"]):
                log_test("Admin Products - PUT Update", True, response)
            else:
                log_test("Admin Products - PUT Update", False, response, 
                        f"Expected status 200 with updated data, got {response.status_code}")
        except Exception as e:
            log_test("Admin Products - PUT Update", False, error=str(e))
    
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
    """Test admin orders endpoints"""
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
    
    # Create a test order if none exist
    order_id = None
    if not orders:
        try:
            # First get a product to use in the order
            product_response = requests.get(f"{API_URL}/products")
            if product_response.status_code == 200 and len(product_response.json()) > 0:
                product = product_response.json()[0]
                
                # Create an order
                order_data = {
                    "customer_name": "Test Customer",
                    "customer_phone": "0123456789",
                    "customer_email": "test@example.com",
                    "customer_address": "123 Test Street",
                    "note": "This is a test order",
                    "items": [
                        {
                            "product_id": product["id"],
                            "product_name": product["name"],
                            "price": product["price"],
                            "quantity": 1
                        }
                    ],
                    "total_price": int(product["price"].replace(".", "")),
                    "shipping_fee": 30000
                }
                
                order_response = requests.post(
                    f"{API_URL}/orders",
                    json=order_data
                )
                
                if order_response.status_code == 200 and "id" in order_response.json():
                    order_id = order_response.json()["id"]
                    print(f"  Created test order with ID: {order_id}")
                else:
                    print(f"  Failed to create test order: {order_response.status_code}")
            else:
                print("  No products available to create test order")
        except Exception as e:
            print(f"  Error creating test order: {str(e)}")
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