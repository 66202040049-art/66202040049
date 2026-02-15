
import React, { useState } from 'react';

interface CheckoutFormProps {
  total: number;
  onClose: () => void;
  onSubmit: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ total, onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold">ชำระเงิน (DBT Company)</h2>
          <div className="flex gap-2">
            {[1, 2].map(s => (
              <div key={s} className={`w-2 h-2 rounded-full ${step >= s ? 'bg-pink-600' : 'bg-gray-200'}`}></div>
            ))}
          </div>
        </div>

        <div className="p-8">
          {step === 1 ? (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 mb-2">รายละเอียดการจัดส่ง</h3>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="ชื่อ" className="bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-pink-500 outline-none" />
                <input placeholder="นามสกุล" className="bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-pink-500 outline-none" />
              </div>
              <input placeholder="ที่อยู่จัดส่ง" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-pink-500 outline-none" />
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="จังหวัด" className="bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-pink-500 outline-none" />
                <input placeholder="รหัสไปรษณีย์" className="bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-pink-500 outline-none" />
              </div>
              <button 
                onClick={() => setStep(2)}
                className="w-full bg-pink-600 text-white py-3 rounded-xl font-bold mt-4 hover:bg-pink-700 transition"
              >
                ดำเนินการชำระเงิน
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-pink-50 p-4 rounded-xl flex justify-between items-center">
                <span className="text-pink-600 font-medium">ยอดชำระรวม</span>
                <span className="text-2xl font-bold text-pink-700">{total.toLocaleString()} บาท</span>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-800 mb-4">วิธีการชำระเงิน</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition ${paymentMethod === 'card' ? 'border-pink-600 bg-pink-50' : 'border-gray-100 hover:border-gray-300'}`}
                  >
                    <i className="fas fa-credit-card text-xl"></i>
                    <span className="text-sm font-semibold">บัตรเครดิต</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition ${paymentMethod === 'bank' ? 'border-pink-600 bg-pink-50' : 'border-gray-100 hover:border-gray-300'}`}
                  >
                    <i className="fas fa-university text-xl"></i>
                    <span className="text-sm font-semibold">โอนเงินผ่านธนาคาร</span>
                  </button>
                </div>
              </div>

              {paymentMethod === 'card' ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                  <input placeholder="หมายเลขบัตร" className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-pink-500 outline-none" />
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="ดด/ปป" className="bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-pink-500 outline-none" />
                    <input placeholder="CVC" className="bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-pink-500 outline-none" />
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-xl space-y-2 animate-in fade-in slide-in-from-top-2">
                  <p className="text-sm text-gray-600 font-medium">ธนาคาร: DBT Commercial Bank</p>
                  <p className="text-sm text-gray-600 font-medium">ชื่อบัญชี: บจก. ดีบีที คอมพานี</p>
                  <p className="text-lg font-mono font-bold text-pink-600 tracking-wider">999-0-88888-7</p>
                  <p className="text-xs text-gray-400">กรุณาอัปโหลดหลักฐานการโอนหลังโอนเสร็จสิ้น</p>
                </div>
              )}

              <div className="flex gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="w-1/3 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
                >
                  ย้อนกลับ
                </button>
                <button 
                  onClick={onSubmit}
                  className="w-2/3 bg-pink-600 text-white py-3 rounded-xl font-bold hover:bg-pink-700 transition shadow-lg shadow-pink-100"
                >
                  ยืนยันการชำระเงิน
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
