import React from 'react';
import { HeroSection, FeaturesSection, FeaturedProductsSection } from '../Components';

const HomePage = ({ onProductClick }) => {
  return (
    <div className="relative min-h-screen">
      {/* Luxury Background Layer */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Premium Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-600/10 to-orange-600/10 rounded-full blur-3xl animate-luxury-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-violet-600/8 to-purple-600/8 rounded-full blur-3xl animate-luxury-float" style={{animationDelay: '3s'}}></div>
        
        {/* Luxury Geometric Patterns */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-amber-400/20 rotate-45 animate-spin-luxury"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 border border-violet-400/15 rotate-12 animate-scale-breath"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Mobile & Desktop Spacing */}
        <div className="pt-20 lg:pt-24">
          <HeroSection />
          <FeaturedProductsSection onProductClick={onProductClick} />
          <FeaturesSection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;