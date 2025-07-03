import React from 'react';
import { HeroSection, FeaturesSection, FeaturedProductsSection } from '../Components';

const HomePage = ({ onProductClick }) => {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-500">
      <HeroSection />
      <FeaturesSection />
      <FeaturedProductsSection onProductClick={onProductClick} />
    </div>
  );
};

export default HomePage;