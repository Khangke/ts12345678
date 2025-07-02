import React from 'react';
import { ProductsSection } from '../Components';

const ProductsPage = ({ onProductClick }) => {
  return (
    <div>
      <ProductsSection onProductClick={onProductClick} />
    </div>
  );
};

export default ProductsPage;