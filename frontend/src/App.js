import React from 'react';
import './App.css';
import { 
  Header, 
  HeroSection, 
  FeaturesSection, 
  AboutSection, 
  ProductsSection, 
  ContactSection, 
  Footer 
} from './Components';

function App() {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <ProductsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;