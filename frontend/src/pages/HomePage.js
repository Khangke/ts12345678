import React from 'react';
import { HeroSection, FeaturesSection, FeaturedProductsSection } from '../Components';

const HomePage = ({ onProductClick }) => {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-500">
      {/* Mobile top spacing - reduced */}
      <div className="pt-16 lg:pt-20">
        <HeroSection />
        <FeaturedProductsSection onProductClick={onProductClick} />
        <FeaturesSection />
      </div>
    </div>
  );
};

export default HomePage;