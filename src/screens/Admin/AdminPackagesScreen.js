import React, { useState } from 'react';
import { Package, CheckCircle, Save, X, Edit3, Tag } from 'lucide-react';

const AdminPackagesScreen = () => {
  const [plans, setPlans] = useState({
    monthly: {
      id: 'MONTH',
      name: 'Gói Tháng (Basic)',
      price: 49000,
      oldPrice: 99000,
      features: ['Quét dấu hiệu BEFAST', 'Báo cáo phân tích cơ bản', 'Lưu trữ lịch sử 30 ngày'],
      isActive: true,
      color: 'blue'
    },
    yearly: {
      id: 'YEAR',
      name: 'Gói Năm (Premium)',
      price: 490000,
      oldPrice: 1188000,
      features: ['Mọi tính năng gói Tháng', 'Lưu trữ lịch sử trọn đời', 'Hỗ trợ ưu tiên 24/7', 'Phân tích y khoa chuyên sâu AI'],
      isActive: true,
      color: 'orange'
    }
  });

  const [editingPlan, setEditingPlan] = useState(null);
  const [editForm, setEditForm] = useState({ price: '', oldPrice: '' });

  const handleEdit = (planKey) => {
    setEditingPlan(planKey);
    setEditForm({
      price: plans[planKey].price,
      oldPrice: plans[planKey].oldPrice || ''
    });
  };

  const handleSave = (planKey) => {
    // In a real app, you would make an API call here to update the prices in DB
    setPlans(prev => ({
      ...prev,
      [planKey]: {
        ...prev[planKey],
        price: Number(editForm.price),
        oldPrice: Number(editForm.oldPrice) || null
      }
    }));
    setEditingPlan(null);
    alert('Đã cập nhật giá gói cước thành công! (Mock)');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Quản lý Gói dịch vụ</h1>
        <p className="text-sm text-gray-500 mt-1">Điều chỉnh giá bán và cấu hình các gói tài khoản VIP</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(plans).map(([key, plan]) => (
          <div key={key} className={`bg-white rounded-[24px] border ${plan.color === 'orange' ? 'border-orange-200 shadow-orange-100' : 'border-blue-200 shadow-blue-100'} p-8 shadow-xl relative overflow-hidden group`}>
            {plan.color === 'orange' && (
              <div className="absolute top-6 right-6 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest">
                Khuyên dùng
              </div>
            )}
            
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm
              ${plan.color === 'orange' ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' : 'bg-gradient-to-br from-blue-400 to-blue-600 text-white'}`}
            >
              <Package size={28} />
            </div>

            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">{plan.name}</h2>
            
            {editingPlan === key ? (
              <div className="my-6 space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Giá bán thực tế (VNĐ)</label>
                  <input 
                    type="number" 
                    value={editForm.price}
                    onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Giá gốc (để hiển thị gạch chéo)</label>
                  <input 
                    type="number" 
                    value={editForm.oldPrice}
                    onChange={(e) => setEditForm({...editForm, oldPrice: e.target.value})}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-bold text-gray-500"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={() => handleSave(key)}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
                  >
                    <Save size={16} /> Lưu
                  </button>
                  <button 
                    onClick={() => setEditingPlan(null)}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors"
                  >
                    <X size={16} /> Hủy
                  </button>
                </div>
              </div>
            ) : (
              <div className="my-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-gray-900">{plan.price.toLocaleString()}</span>
                  <span className="text-xl font-bold text-gray-500">VNĐ</span>
                </div>
                {plan.oldPrice && (
                  <div className="text-sm font-bold text-gray-400 line-through mt-1">
                    {plan.oldPrice.toLocaleString()} VNĐ
                  </div>
                )}
                <button 
                  onClick={() => handleEdit(key)}
                  className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors
                    ${plan.color === 'orange' ? 'bg-orange-50 text-orange-700 hover:bg-orange-100' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}
                  `}
                >
                  <Edit3 size={16} /> Điều chỉnh giá
                </button>
              </div>
            )}

            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-4">Tính năng bao gồm</h4>
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={18} className={plan.color === 'orange' ? 'text-orange-500' : 'text-blue-500'} shrink-0 />
                    <span className="text-sm font-medium text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Global Payment Settings */}
      <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <Tag size={20} className="text-gray-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Cấu hình thanh toán PayOS</h3>
            <p className="text-sm text-gray-500">Thông tin cấu hình cổng thanh toán nội địa</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Client ID</label>
            <input type="password" value="************************" readOnly className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 font-mono text-sm cursor-not-allowed" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">API Key</label>
            <input type="password" value="************************" readOnly className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 font-mono text-sm cursor-not-allowed" />
          </div>
          <div className="md:col-span-2">
             <button className="text-sm font-bold text-blue-600 hover:text-blue-700">Yêu cầu thay đổi API Key PayOS</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPackagesScreen;
