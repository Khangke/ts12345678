import React from 'react';
import { ProductsSection } from '../Components';

const ProductsPage = ({ onProductClick }) => {
  return (
    <div className="pt-20">
      <ProductsSection onProductClick={onProductClick} />
    </div>
  );
};

export default ProductsPage;