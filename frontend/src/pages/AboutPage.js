import React from 'react';
import { AboutSection } from '../Components';

const AboutPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-500">
      {/* Mobile top spacing - reduced */}
      <div className="pt-16 lg:pt-20">
        <AboutSection />
      </div>
    </div>
  );
};

export default AboutPage;