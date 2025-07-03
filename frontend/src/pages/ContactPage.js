import React from 'react';
import { ContactSection } from '../Components';

const ContactPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-500">
      {/* Mobile top spacing - reduced */}
      <div className="pt-16 lg:pt-20">
        <ContactSection />
      </div>
    </div>
  );
};

export default ContactPage;