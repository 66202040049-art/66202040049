
import React, { useState, useMemo, useEffect } from 'react';
import { Product, CartItem, User, Category, Order } from './types';
import { PRODUCTS } from './constants';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import AIAssistant from './components/AIAssistant';
import AuthModal from './components/AuthModal';
import CheckoutForm from './components/CheckoutForm';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [user, setUser] = useState<User>({ id: '', email: '', name: '', isLoggedIn: false });
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);

  const handleLogin = (userData: Partial<User>) => {
    setUser({
      id: 'usr_1',
      name: userData.name || 'คุณลูกค้า',
      email: userData.email || 'customer@example.com',
      isLoggedIn: true
    });
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setUser({ id: '', email: '', name: '', isLoggedIn: false });
  };

  const completeOrder = () => {
    alert("ขอบคุณที่ช้อปกับ DBT Company! เตรียมรับชุดสวยๆ ได้เลยค่ะ");
    setCart([]);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar 
        user={user} 
        cartCount={cart.length} 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onSearch={setSearchQuery}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Banner */}
        <div className="bg-pink-600 rounded-2xl p-8 mb-8 text-white flex flex-col md:flex-row items-center justify-between shadow-lg overflow-hidden relative">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-4">DBT Company Fashion</h1>
            <p className="text-pink-100 text-lg max-w-md mb-6">
              ค้นพบสไตล์ที่ใช่ในแบบคุณ กับคอลเลกชันใหม่ล่าสุดจาก DBT Company ที่คัดสรรมาเพื่อคุณโดยเฉพาะ
            </p>
            <button className="bg-white text-pink-600 px-6 py-2 rounded-full font-semibold hover:bg-pink-50 transition shadow-md">
              ดูคอลเลกชันใหม่
            </button>
          </div>
          <div className="mt-8 md:mt-0 relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=500" 
              alt="DBT Company Hero" 
              className="w-64 h-64 object-cover rounded-xl shadow-2xl -rotate-2"
            />
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500 rounded-full blur-3xl opacity-50 -mr-32 -mt-32"></div>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
          <button 
            onClick={() => setSelectedCategory('All')}
            className={`px-6 py-2 rounded-full whitespace-nowrap transition ${selectedCategory === 'All' ? 'bg-pink-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-pink-400'}`}
          >
            ทั้งหมด
          </button>
          {Object.values(Category).map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full whitespace-nowrap transition ${selectedCategory === cat ? 'bg-pink-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-pink-400'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Grid */}
        <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
      </main>

      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-pink-600 mb-4">DBT Company</h3>
            <p className="text-gray-500 text-sm">จุดหมายปลายทางของคนรักแฟชั่นระดับพรีเมียม</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">เมนูสินค้า</h4>
            <ul className="text-gray-500 text-sm space-y-2">
              <li>เสื้อเชิ้ตและเสื้อยืด</li>
              <li>กางเกงและกระโปรง</li>
              <li>ชุดเดรส</li>
              <li>เครื่องประดับ</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">บริการลูกค้า</h4>
            <ul className="text-gray-500 text-sm space-y-2">
              <li>ติดตามสินค้า</li>
              <li>การคืนสินค้า</li>
              <li>ตารางไซส์ DBT</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">รับโปรโมชั่นพิเศษ</h4>
            <div className="flex">
              <input type="email" placeholder="อีเมลของคุณ" className="bg-gray-100 border-none rounded-l-lg px-4 py-2 w-full focus:ring-1 focus:ring-pink-500 text-sm" />
              <button className="bg-pink-600 text-white px-4 py-2 rounded-r-lg text-sm">รับเลย</button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-100 text-center text-gray-400 text-xs">
          © 2024 DBT Company. All Rights Reserved.
        </div>
      </footer>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateQuantity}
        total={cartTotal}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLogin={handleLogin} 
      />

      {isCheckoutOpen && (
        <CheckoutForm 
          total={cartTotal} 
          onClose={() => setIsCheckoutOpen(false)} 
          onSubmit={completeOrder}
        />
      )}

      <AIAssistant />
    </div>
  );
};

export default App;
