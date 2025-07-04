import React from 'react';
import { ContactSection } from '../Components';

const ContactPage = () => {
  return (
    <div className="relative min-h-screen">
      {/* Luxury Contact Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Premium Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        
        {/* Floating Contact Elements */}
        <div className="absolute top-32 left-16 w-40 h-40 bg-gradient-to-r from-amber-500/15 to-orange-500/15 rounded-full blur-3xl animate-luxury-float"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl animate-luxury-float" style={{animationDelay: '2s'}}></div>
        
        {/* Contact Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 h-full">
            {Array.from({length: 12}).map((_, i) => (
              <div key={i} className="border-r border-amber-400/20"></div>
            ))}
          </div>
        </div>
        
        {/* Luxury Light Beams */}
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-amber-400/10 to-transparent"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-violet-400/8 to-transparent"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Premium Spacing */}
        <div className="pt-20 lg:pt-28">
          <ContactSection />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;