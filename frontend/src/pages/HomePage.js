import React from 'react';
import { HeroSection, FeaturesSection } from '../Components';

const HomePage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-500">
      <HeroSection />
      <FeaturesSection />
    </div>
  );
};

export default HomePage;