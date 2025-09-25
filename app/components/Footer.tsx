'use client';

import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'; // Import icons

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold">London Mac Repair</h3>
            <p className="mt-2 text-sm text-gray-300">Your trusted local Apple experts.</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold">Hanwell Workshop</h4>
              <p className="text-sm text-gray-300 mt-2">111 Uxbridge Rd, London W7 3ST<br/>020 3336 3633</p>
            </div>
            <div>
              <h4 className="font-bold">West Ealing</h4>
              <p className="text-sm text-gray-300 mt-2">16 Broadway, London W13 0SR<br/>020 8840 6420</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold">Follow Us</h4>
            {/* Replaced social links */}
            <div className="flex items-center gap-x-6 mt-2">
              <a
                href="https://www.facebook.com/people/TekRenewed/61574769921770/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-400 hover:text-secondary transition-colors duration-300"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://www.instagram.com/tekrenewed25/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 hover:text-secondary transition-colors duration-300"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://www.tiktok.com/@tekrenewed.ltd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-gray-400 hover:text-secondary transition-colors duration-300"
              >
                <FaTiktok size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} London Mac Repair. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;