#!/usr/bin/env python3
import asyncio
import aiohttp
import json

async def update_products():
    # JWT token from previous login
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTc1MTYxNDQxOH0.oh5BTch6AIcsmq2YCdIMD-KOR2Y7x9vXNZnDO1OywV4"
    base_url = "http://localhost:8001/api"
    
    # Updated product data with proper images
    products_updates = [
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
            "images": ["https://images.pexels.com/photos/11385497/pexels-photo-11385497.jpeg"],
            "image": "https://images.pexels.com/photos/11385497/pexels-photo-11385497.jpeg",
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
            "images": ["https://images.unsplash.com/photo-1608571424634-58ae03e6edcf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxlc3NlbnRpYWwlMjBvaWwlMjBib3R0bGV8ZW58MHx8fHwxNzUxNTI4MDcxfDA&ixlib=rb-4.1.0&q=85"],
            "image": "https://images.unsplash.com/photo-1608571424634-58ae03e6edcf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxlc3NlbnRpYWwlMjBvaWwlMjBib3R0bGV8ZW58MHx8fHwxNzUxNTI4MDcxfDA&ixlib=rb-4.1.0&q=85",
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
            "images": ["https://images.unsplash.com/photo-1609708504542-dd6babf9699b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHx3b29kZW4lMjBjYXJ2aW5nfGVufDB8fHx8MTc1MTUyODA3N3ww&ixlib=rb-4.1.0&q=85"],
            "image": "https://images.unsplash.com/photo-1609708504542-dd6babf9699b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHx3b29kZW4lMjBjYXJ2aW5nfGVufDB8fHx8MTc1MTUyODA3N3ww&ixlib=rb-4.1.0&q=85",
            "category": "Cảnh trầm",
            "material": "Gỗ trầm hương nguyên khối",
            "sizes": ["Size S (10-15cm)", "Size M (15-20cm)", "Size L (20-30cm)"]
        }
    ]
    
    async with aiohttp.ClientSession() as session:
        # First get all products
        async with session.get(f"{base_url}/admin/products", 
                             headers={"Authorization": f"Bearer {token}"}) as resp:
            products = await resp.json()
            
        # Update each product
        for i, product in enumerate(products):
            if i < len(products_updates):
                update_data = products_updates[i]
                async with session.put(f"{base_url}/admin/products/{product['id']}", 
                                     headers={"Authorization": f"Bearer {token}", 
                                            "Content-Type": "application/json"},
                                     data=json.dumps(update_data)) as resp:
                    result = await resp.json()
                    print(f"Updated product: {result['name']}")

if __name__ == "__main__":
    asyncio.run(update_products())