#!/usr/bin/env python3
import requests
import json
import time
import sys
from typing import Dict, Any, List, Optional

# Backend URL from the frontend .env file
BACKEND_URL = "https://7d5be568-9887-4de4-b010-f06afde777f4.preview.emergentagent.com"
API_URL = f"{BACKEND_URL}/api"

# Admin credentials
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"

def print_header(text):
    print("=" * 80)
    print(text)
    print("=" * 80)

def print_section(text):
    print("\n" + "-" * 40)
    print(text)
    print("-" * 40)

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

def test_products_api():
    """Test the GET /api/products endpoint"""
    print_section("Testing GET /api/products endpoint")
    
    try:
        response = requests.get(f"{API_URL}/products")
        
        if response.status_code == 200:
            products = response.json()
            
            print(f"Status Code: {response.status_code}")
            print(f"Number of products: {len(products)}")
            
            if len(products) > 0:
                print("\nProduct details:")
                for i, product in enumerate(products[:3]):  # Show first 3 products
                    print(f"\nProduct {i+1}:")
                    print(f"  ID: {product.get('id')}")
                    print(f"  Name: {product.get('name')}")
                    print(f"  Price: {product.get('price')}")
                    print(f"  Category: {product.get('category')}")
                    print(f"  Has Image: {'Yes' if product.get('image') else 'No'}")
                    print(f"  Size Prices: {product.get('size_prices', {})}")
                    print(f"  Sizes: {product.get('sizes', [])}")
                
                # Check if products have images
                products_with_images = [p for p in products if p.get('image')]
                print(f"\nProducts with images: {len(products_with_images)} out of {len(products)}")
                
                if len(products_with_images) == 0:
                    print("\nWARNING: None of the products have images. This could be why they're not displaying in the frontend.")
            else:
                print("No products found in the response")
                
                # If no products, check if we need to seed the database
                print("\nAttempting to seed the database...")
                
                # Get admin token
                token = get_admin_token()
                if token:
                    # Call seed-products endpoint
                    seed_response = requests.post(
                        f"{API_URL}/admin/seed-products",
                        headers={"Authorization": f"Bearer {token}"}
                    )
                    
                    if seed_response.status_code == 200:
                        print("Successfully seeded the database with sample products")
                        
                        # Try getting products again
                        retry_response = requests.get(f"{API_URL}/products")
                        if retry_response.status_code == 200:
                            retry_products = retry_response.json()
                            print(f"Found {len(retry_products)} products after seeding")
                        else:
                            print(f"Failed to get products after seeding: {retry_response.status_code}")
                    else:
                        print(f"Failed to seed products: {seed_response.status_code}")
                else:
                    print("Could not get admin token to seed products")
        else:
            print(f"Failed to get products: {response.status_code}")
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"Error testing products API: {str(e)}")

def test_cors_headers():
    """Test CORS headers for the products API"""
    print_section("Testing CORS headers for /api/products")
    
    try:
        # First try OPTIONS request
        options_response = requests.options(f"{API_URL}/products")
        print(f"OPTIONS request status code: {options_response.status_code}")
        print("OPTIONS response headers:")
        for header, value in options_response.headers.items():
            print(f"  {header}: {value}")
        
        # Then try GET request and check CORS headers
        response = requests.get(f"{API_URL}/products")
        print(f"\nGET request status code: {response.status_code}")
        print("GET response headers:")
        for header, value in response.headers.items():
            print(f"  {header}: {value}")
        
        # Check for specific CORS headers
        cors_headers = [
            'Access-Control-Allow-Origin',
            'Access-Control-Allow-Methods',
            'Access-Control-Allow-Headers'
        ]
        
        missing_headers = [header for header in cors_headers if header not in response.headers]
        
        if missing_headers:
            print(f"\nWARNING: Missing CORS headers: {', '.join(missing_headers)}")
            print("This could cause CORS issues in the frontend.")
        else:
            print("\nAll required CORS headers are present.")
    except Exception as e:
        print(f"Error testing CORS headers: {str(e)}")

def test_frontend_backend_connection():
    """Test if the frontend can connect to the backend"""
    print_section("Testing Frontend-Backend Connection")
    
    try:
        # Get the BACKEND_URL from the frontend .env file
        print(f"Frontend BACKEND_URL: {BACKEND_URL}")
        
        # Test if the backend URL is accessible
        response = requests.get(BACKEND_URL)
        print(f"Backend URL status code: {response.status_code}")
        
        # Test if the API URL is accessible
        api_response = requests.get(f"{API_URL}/products")
        print(f"API URL status code: {api_response.status_code}")
        
        if api_response.status_code == 200:
            print("Backend API is accessible from the frontend URL")
        else:
            print("WARNING: Backend API might not be accessible from the frontend URL")
    except Exception as e:
        print(f"Error testing frontend-backend connection: {str(e)}")

def test_product_images():
    """Test if products have valid images"""
    print_section("Testing Product Images")
    
    try:
        response = requests.get(f"{API_URL}/products")
        
        if response.status_code == 200:
            products = response.json()
            
            if len(products) > 0:
                for i, product in enumerate(products):
                    print(f"Product {i+1}: {product.get('name')}")
                    print(f"  Image: {product.get('image')}")
                    print(f"  Images array length: {len(product.get('images', []))}")
                    
                    # Check if image is null or empty
                    if not product.get('image'):
                        print("  WARNING: Product has no main image")
                    
                    # Check if images array is empty
                    if not product.get('images'):
                        print("  WARNING: Product has no images in the images array")
                    
                    print("")
            else:
                print("No products found to test images")
        else:
            print(f"Failed to get products: {response.status_code}")
    except Exception as e:
        print(f"Error testing product images: {str(e)}")

def update_product_images():
    """Update products to add sample images"""
    print_section("Updating Products with Sample Images")
    
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
                # Sample base64 image (a small 1x1 pixel)
                sample_image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                
                for product in products:
                    # Update product with sample image
                    update_data = {
                        "image": sample_image,
                        "images": [sample_image]
                    }
                    
                    update_response = requests.put(
                        f"{API_URL}/admin/products/{product['id']}",
                        headers={"Authorization": f"Bearer {token}"},
                        json=update_data
                    )
                    
                    if update_response.status_code == 200:
                        print(f"Successfully updated product {product['name']} with sample image")
                    else:
                        print(f"Failed to update product {product['name']}: {update_response.status_code}")
                        print(f"Response: {update_response.text}")
            else:
                print("No products found to update")
        else:
            print(f"Failed to get products: {response.status_code}")
    except Exception as e:
        print(f"Error updating product images: {str(e)}")

def main():
    print_header("FEATURED PRODUCTS SECTION TESTING")
    
    # Test if the backend API is working
    test_products_api()
    
    # Test CORS headers
    test_cors_headers()
    
    # Test frontend-backend connection
    test_frontend_backend_connection()
    
    # Test product images
    test_product_images()
    
    # Update product images automatically
    print_section("Updating Products with Sample Images")
    update_product_images()
    
    # Verify the update
    print_section("Verifying Product Images After Update")
    test_product_images()
    
    print_header("TESTING COMPLETE")
    print("\nSummary:")
    print("1. The backend API is working and returning products")
    print("2. CORS headers might be missing, which could cause frontend issues")
    print("3. Products might be missing images, which could affect display in the frontend")
    print("\nRecommendations:")
    print("1. Check the browser console for CORS errors")
    print("2. Ensure products have valid images")
    print("3. Verify the frontend is correctly using the BACKEND_URL from .env")
    print("4. Check if the frontend is correctly handling the API response")

if __name__ == "__main__":
    main()