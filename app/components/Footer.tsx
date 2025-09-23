'use client';

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
              <p className="text-sm text-gray-300 mt-2">123 Hanwell High Street<br/>London, W7 3XX<br/>020 8123 4567</p>
            </div>
            <div>
              <h4 className="font-bold">Ealing Workshop</h4>
              <p className="text-sm text-gray-300 mt-2">456 Ealing Broadway<br/>London, W5 5JU<br/>020 8987 6543</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold">Follow Us</h4>
            <div className="flex space-x-4 mt-2">
              {/* Placeholder social links */}
              <a href="#" className="text-gray-300 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-300 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-300 hover:text-white">Instagram</a>
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
