
import React from 'react';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <i className="fas fa-search-minus text-4xl mb-4"></i>
        <p className="text-lg">ไม่พบสินค้าที่คุณกำลังมองหา</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <div 
          key={product.id} 
          className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col h-full"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-4">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-pink-600">
              {product.category}
            </div>
          </div>
          
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-800 leading-tight group-hover:text-pink-600 transition">
                {product.name}
              </h3>
              <div className="flex items-center gap-1">
                <i className="fas fa-heart text-pink-500 text-xs"></i>
                <span className="text-xs font-medium">{product.rating}</span>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mb-4 line-clamp-2">
              {product.description}
            </p>
            
            <div className="mt-auto flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">
                ฿{product.price.toLocaleString()}
              </span>
              <button 
                onClick={() => onAddToCart(product)}
                className="bg-pink-600 text-white p-2.5 rounded-lg hover:bg-pink-700 active:scale-95 transition shadow-sm"
              >
                <i className="fas fa-shopping-bag"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
