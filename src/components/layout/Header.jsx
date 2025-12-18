import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AirVent } from 'lucide-react';

const Header = memo(() => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
            <AirVent className="w-8 h-8" />
            <span>Conditioners Manager</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link 
              to="/conditioners" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              All Conditioners
            </Link>
            <Link 
              to="/conditioners/new" 
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Add New
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;