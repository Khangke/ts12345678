#!/usr/bin/env python3
import requests
import json
import time
import sys
from typing import Dict, Any, List, Optional

# Backend URL from the frontend .env file
BACKEND_URL = "https://c2b77179-b511-47fc-8f89-afbf94e77128.preview.emergentagent.com"
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

def fix_product_images():
    """Fix products by adding sample images to both image and images fields"""
    print_header("FIXING PRODUCT IMAGES")
    
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
                        "images": [sample_image]
                    }
                    
                    update_response = requests.put(
                        f"{API_URL}/admin/products/{product['id']}",
                        headers={"Authorization": f"Bearer {token}"},
                        json=update_data
                    )
                    
                    if update_response.status_code == 200:
                        print(f"Successfully updated product {product['name']} with sample images")
                        
                        # Now check if the image field was updated
                        check_response = requests.get(f"{API_URL}/admin/products/{product['id']}", 
                                                    headers={"Authorization": f"Bearer {token}"})
                        
                        if check_response.status_code == 200:
                            updated_product = check_response.json()
                            print(f"  Image: {updated_product.get('image')}")
                            print(f"  Images array length: {len(updated_product.get('images', []))}")
                            
                            # If image is still null, update it directly
                            if not updated_product.get('image'):
                                print("  Image field is still null, updating it directly...")
                                
                                update_image_response = requests.put(
                                    f"{API_URL}/admin/products/{product['id']}",
                                    headers={"Authorization": f"Bearer {token}"},
                                    json={"image": sample_image}
                                )
                                
                                if update_image_response.status_code == 200:
                                    print("  Successfully updated image field")
                                else:
                                    print(f"  Failed to update image field: {update_image_response.status_code}")
                    else:
                        print(f"Failed to update product {product['name']}: {update_response.status_code}")
            else:
                print("No products found to update")
        else:
            print(f"Failed to get products: {response.status_code}")
    except Exception as e:
        print(f"Error updating product images: {str(e)}")

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
    fix_product_images()
    verify_product_images()
    
    print_header("RECOMMENDATIONS")
    print("1. Check the frontend console for any errors")
    print("2. Clear the browser cache or localStorage to remove any cached product data")
    print("3. Restart the frontend service: sudo supervisorctl restart frontend")
    print("4. If the issue persists, check the frontend code for how it handles null images")