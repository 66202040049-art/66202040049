
import React from 'react';
import { User } from '../types';

interface NavbarProps {
  user: User;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  onSearch: (q: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, cartCount, onOpenCart, onOpenAuth, onLogout, onSearch }) => {
  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-tshirt text-white text-sm"></i>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-600">
              DBT Company
            </span>
          </div>

          <div className="hidden md:flex relative group">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <input 
              type="text" 
              placeholder="ค้นหาใน DBT Company..." 
              onChange={(e) => onSearch(e.target.value)}
              className="bg-gray-100 border-none rounded-full py-2 pl-10 pr-4 w-64 focus:ring-2 focus:ring-pink-500 transition-all text-sm outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user.isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-sm font-medium text-gray-700">คุณ{user.name}</span>
              <button 
                onClick={onLogout}
                className="p-2 text-gray-500 hover:text-red-500 transition"
                title="ออกจากระบบ"
              >
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="text-sm font-medium text-pink-600 hover:text-pink-800 transition"
            >
              เข้าสู่ระบบ
            </button>
          )}

          <button 
            onClick={onOpenCart}
            className="relative p-2 text-gray-700 hover:text-pink-600 transition"
          >
            <i className="fas fa-shopping-bag text-lg"></i>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-pink-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
