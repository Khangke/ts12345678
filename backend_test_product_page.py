#!/usr/bin/env python3
import requests
import json
import time
import sys
from typing import Dict, Any, List, Optional

# Backend URL - using internal URL for testing
BACKEND_URL = "http://0.0.0.0:8001"
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

def test_products_api_response_time():
    """Test GET /api/products endpoint response time and format"""
    print(f"{Colors.HEADER}Testing GET /api/products Response Time and Format{Colors.ENDC}")
    
    try:
        # Measure response time
        start_time = time.time()
        response = requests.get(f"{API_URL}/products")
        end_time = time.time()
        
        response_time_ms = (end_time - start_time) * 1000
        
        if response.status_code == 200:
            products = response.json()
            
            # Check if we have products
            if len(products) > 0:
                log_test(f"GET /api/products - Response Time ({response_time_ms:.2f} ms)", True, response)
                print(f"  Response Time: {response_time_ms:.2f} ms")
                print(f"  Found {len(products)} products")
                
                # Check data format
                required_fields = ['id', 'name', 'description', 'price', 'category', 
                                  'material', 'rating', 'sizes', 'size_prices']
                
                all_fields_present = all(all(field in product for field in required_fields) 
                                        for product in products)
                
                if all_fields_present:
                    log_test("GET /api/products - Data Format", True, response)
                    print(f"  All required fields present in product data")
                    
                    # Print details of the first product
                    first_product = products[0]
                    print(f"\n  Sample Product:")
                    print(f"    Name: {first_product.get('name')}")
                    print(f"    Price: {first_product.get('price')}")
                    print(f"    Category: {first_product.get('category')}")
                    print(f"    Size Prices: {first_product.get('size_prices', {})}")
                    print(f"    Sizes: {first_product.get('sizes', [])}")
                else:
                    log_test("GET /api/products - Data Format", False, response, 
                            "Some products missing required fields")
            else:
                log_test("GET /api/products - Products Available", False, response, 
                        "No products found in the response")
        else:
            log_test("GET /api/products - Status Code", False, response,
                    f"Expected status 200, got {response.status_code}")
    except Exception as e:
        log_test("GET /api/products", False, error=str(e))

def test_backend_health():
    """Test backend health and MongoDB connection"""
    print(f"{Colors.HEADER}Testing Backend Health{Colors.ENDC}")
    
    try:
        # Check if backend is responding
        response = requests.get(f"{API_URL}/")
        
        if response.status_code == 200:
            log_test("Backend API Root Endpoint", True, response)
        else:
            log_test("Backend API Root Endpoint", False, response,
                    f"Expected status 200, got {response.status_code}")
    except Exception as e:
        log_test("Backend API Root Endpoint", False, error=str(e))
    
    try:
        # Check MongoDB connection via status endpoint
        response = requests.get(f"{API_URL}/status")
        
        if response.status_code == 200:
            log_test("MongoDB Connection via Status Endpoint", True, response)
        else:
            log_test("MongoDB Connection via Status Endpoint", False, response,
                    f"Expected status 200, got {response.status_code}")
    except Exception as e:
        log_test("MongoDB Connection via Status Endpoint", False, error=str(e))

def test_admin_stats_response_time():
    """Test GET /api/admin/stats endpoint response time and format"""
    print(f"{Colors.HEADER}Testing GET /api/admin/stats Response Time and Format{Colors.ENDC}")
    
    try:
        # Get admin token
        token = get_admin_token()
        
        # Measure response time
        start_time = time.time()
        response = requests.get(
            f"{API_URL}/admin/stats",
            headers={"Authorization": f"Bearer {token}"}
        )
        end_time = time.time()
        
        response_time_ms = (end_time - start_time) * 1000
        
        if response.status_code == 200:
            stats = response.json()
            
            log_test(f"GET /api/admin/stats - Response Time ({response_time_ms:.2f} ms)", True, response)
            print(f"  Response Time: {response_time_ms:.2f} ms")
            
            # Check data format
            required_fields = ['product_count', 'orders', 'total_revenue', 'recent_orders']
            orders_fields = ['pending', 'confirmed', 'shipping', 'delivered', 'cancelled', 'total']
            
            fields_present = all(field in stats for field in required_fields)
            orders_fields_present = all(field in stats['orders'] for field in orders_fields)
            
            if fields_present and orders_fields_present:
                log_test("GET /api/admin/stats - Data Format", True, response)
                print(f"  All required fields present in stats data")
                print(f"  Product Count: {stats.get('product_count')}")
                print(f"  Orders: {stats.get('orders')}")
                print(f"  Total Revenue: {stats.get('total_revenue')}")
                print(f"  Recent Orders: {len(stats.get('recent_orders', []))}")
            else:
                missing = []
                if not fields_present:
                    missing.append("main stats fields")
                if not orders_fields_present:
                    missing.append("order status breakdown")
                
                log_test("GET /api/admin/stats - Data Format", False, response,
                        f"Missing required fields: {', '.join(missing)}")
        else:
            log_test("GET /api/admin/stats - Status Code", False, response,
                    f"Expected status 200, got {response.status_code}")
    except Exception as e:
        log_test("GET /api/admin/stats", False, error=str(e))

def test_create_order_response_time():
    """Test POST /api/orders endpoint response time and format"""
    print(f"{Colors.HEADER}Testing POST /api/orders Response Time and Format{Colors.ENDC}")
    
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
                
                # Measure response time
                start_time = time.time()
                order_response = requests.post(
                    f"{API_URL}/orders",
                    json=order_data
                )
                end_time = time.time()
                
                response_time_ms = (end_time - start_time) * 1000
                
                if order_response.status_code == 200 and "id" in order_response.json():
                    log_test(f"POST /api/orders - Response Time ({response_time_ms:.2f} ms)", True, order_response)
                    print(f"  Response Time: {response_time_ms:.2f} ms")
                    
                    # Verify order items have size-specific fields
                    order_items = order_response.json().get("items", [])
                    if (len(order_items) > 0 and 
                        "selected_size" in order_items[0] and 
                        "size_specific_price" in order_items[0] and
                        order_items[0]["selected_size"] == selected_size and
                        order_items[0]["size_specific_price"] == size_specific_price):
                        log_test("POST /api/orders - Size-Specific Pricing", True, order_response)
                        print(f"  Order created with size-specific pricing")
                        print(f"  Selected Size: {selected_size}")
                        print(f"  Size-Specific Price: {size_specific_price}")
                    else:
                        log_test("POST /api/orders - Size-Specific Pricing", False, order_response,
                                "Order created but size-specific fields not saved correctly")
                else:
                    log_test("POST /api/orders - Status Code", False, order_response,
                            f"Expected status 200 with id, got {order_response.status_code}")
            else:
                log_test("POST /api/orders - Size-Specific Pricing", False, error="Product doesn't have size_prices or sizes")
        else:
            log_test("POST /api/orders - Get Products", False, error="No products available to create test order")
    except Exception as e:
        log_test("POST /api/orders", False, error=str(e))

def run_tests():
    """Run all tests for backend APIs after product page optimization"""
    print(f"{Colors.HEADER}{'=' * 80}{Colors.ENDC}")
    print(f"{Colors.HEADER}TESTING BACKEND APIs AFTER PRODUCT PAGE OPTIMIZATION{Colors.ENDC}")
    print(f"{Colors.HEADER}Backend URL: {BACKEND_URL}{Colors.ENDC}")
    print(f"{Colors.HEADER}{'=' * 80}{Colors.ENDC}")
    
    # Test GET /api/products endpoint
    test_products_api_response_time()
    
    # Test backend health
    test_backend_health()
    
    # Test GET /api/admin/stats endpoint
    test_admin_stats_response_time()
    
    # Test POST /api/orders endpoint
    test_create_order_response_time()
    
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
        print(f"{Colors.OKGREEN}The product page optimization changes have not affected the backend API functionality.{Colors.ENDC}")

if __name__ == "__main__":
    # Reset test results
    test_results = {
        "passed": 0,
        "failed": 0,
        "tests": []
    }
    
    # Run all tests
    run_tests()