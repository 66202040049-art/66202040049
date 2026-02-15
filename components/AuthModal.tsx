
import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (data: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-2">{isLogin ? 'ยินดีต้อนรับสู่ DBT' : 'สร้างบัญชีใหม่'}</h2>
          <p className="text-gray-500 text-sm mb-6">เข้าร่วมชุมชนคนรักแฟชั่นกับ DBT Company</p>
          
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">ชื่อ-นามสกุล</label>
                <input 
                  type="text" 
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-pink-500 outline-none" 
                  placeholder="สมชาย ใจดี" 
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1">อีเมล</label>
              <input 
                type="email" 
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-pink-500 outline-none" 
                placeholder="email@example.com" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1">รหัสผ่าน</label>
              <input 
                type="password" 
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-pink-500 outline-none" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          <button 
            onClick={() => onLogin(form)}
            className="w-full bg-pink-600 text-white py-3 rounded-xl font-bold mt-8 hover:bg-pink-700 transition shadow-lg shadow-pink-100"
          >
            {isLogin ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            {isLogin ? "ยังไม่มีบัญชีใช่ไหม?" : "มีบัญชีอยู่แล้วใช่ไหม?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-pink-600 font-bold hover:underline"
            >
              {isLogin ? 'ลงทะเบียน' : 'เข้าสู่ระบบ'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
