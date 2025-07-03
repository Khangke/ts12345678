import React, { useEffect } from 'react';
import { ProductsSection } from '../Components';

const ProductsPage = ({ onProductClick }) => {
  // Prefetch products data khi component mount
  useEffect(() => {
    const prefetchProducts = async () => {
      try {
        const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
        const response = await fetch(`${BACKEND_URL}/api/products`);
        const data = await response.json();
        
        // Cache data for instant access
        const CACHE_KEY = 'products_cache';
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data,
          timestamp: Date.now()
        }));
      } catch (error) {
        console.log('Prefetch failed, will use fallback');
      }
    };

    // Check if cache exists, if not prefetch
    const cachedData = localStorage.getItem('products_cache');
    if (!cachedData) {
      prefetchProducts();
    }
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-500">
      {/* Mobile top spacing - reduced */}
      <div className="pt-16 lg:pt-20">
        <ProductsSection onProductClick={onProductClick} />
      </div>
    </div>
  );
};

export default ProductsPage;