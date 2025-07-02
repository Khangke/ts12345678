import React from 'react';
import { ProductsSection } from '../Components';

const ProductsPage = ({ onProductClick }) => {
  return (
    <div className="pt-20 bg-white dark:bg-gray-900 transition-colors duration-500">
      <ProductsSection onProductClick={onProductClick} />
    </div>
  );
};

export default ProductsPage;