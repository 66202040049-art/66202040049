
import React from 'react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  total: number;
  onCheckout: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, onRemove, onUpdateQty, total, onCheckout }) => {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold">ตะกร้าสินค้าของคุณ</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600"><i className="fas fa-times"></i></button>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <i className="fas fa-shopping-basket text-5xl mb-4"></i>
              <p>ตะกร้าสินค้าของคุณว่างเปล่า</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <h4 className="font-semibold text-sm">{item.name}</h4>
                    <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500 transition">
                      <i className="fas fa-trash-alt text-xs"></i>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden">
                      <button onClick={() => onUpdateQty(item.id, -1)} className="px-2 py-1 hover:bg-gray-100 transition"><i className="fas fa-minus text-[10px]"></i></button>
                      <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => onUpdateQty(item.id, 1)} className="px-2 py-1 hover:bg-gray-100 transition"><i className="fas fa-plus text-[10px]"></i></button>
                    </div>
                    <span className="font-bold text-sm">{(item.price * item.quantity).toLocaleString()} บาท</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-gray-100 bg-white">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500">ราคารวม</span>
            <span className="text-xl font-bold">{total.toLocaleString()} บาท</span>
          </div>
          <button 
            disabled={items.length === 0}
            onClick={onCheckout}
            className="w-full bg-pink-600 text-white py-4 rounded-xl font-bold hover:bg-pink-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition shadow-lg shadow-pink-200"
          >
            ไปหน้าชำระเงิน
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
