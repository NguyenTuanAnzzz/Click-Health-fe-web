import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Users, DollarSign, Activity, BarChart, RefreshCw, TrendingUp
} from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import API_URL from '../../constants/apiConfig';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const AdminDashboardScreen = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/users/admin/stats`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setStats(res.data);
    } catch (err) {
      console.error('Lỗi lấy thống kê admin', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [token]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Tổng quan hệ thống</h1>
          <p className="text-sm text-gray-500 mt-1">Số liệu thống kê doanh thu và người dùng</p>
        </div>
        <button 
          onClick={fetchStats}
          className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors bg-white border border-gray-200 hover:border-blue-200 hover:bg-blue-50 px-4 py-2.5 rounded-xl shadow-sm"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Cập nhật
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white rounded-2xl h-36 border border-gray-100"></div>
          ))}
        </div>
      ) : stats ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Users */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  <Users size={24} />
                </div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Tổng người dùng</p>
                <div className="flex items-end gap-3">
                  <h3 className="text-4xl font-extrabold text-gray-900">{stats.totalUsers}</h3>
                  <span className="flex items-center text-xs font-bold text-green-600 mb-1 bg-green-50 px-2 py-1 rounded-md">
                    <TrendingUp size={12} className="mr-1" /> +12%
                  </span>
                </div>
              </div>
            </div>
            
            {/* Revenue */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-green-50 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  <DollarSign size={24} />
                </div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Doanh thu ước tính</p>
                <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                  {stats.estimatedRevenue.toLocaleString()} <span className="text-lg font-bold text-gray-400">₫</span>
                </h3>
              </div>
            </div>

            {/* MONTH Plan */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-50 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  <Activity size={24} />
                </div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Gói Tháng (MONTH)</p>
                <h3 className="text-4xl font-extrabold text-gray-900">
                  {stats.subscriptionStats.MONTH} <span className="text-sm font-bold text-gray-400">Tài khoản</span>
                </h3>
              </div>
            </div>

            {/* YEAR Plan */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-orange-50 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  <BarChart size={24} />
                </div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Gói Năm (YEAR)</p>
                <h3 className="text-4xl font-extrabold text-gray-900">
                  {stats.subscriptionStats.YEAR} <span className="text-sm font-bold text-gray-400">Tài khoản</span>
                </h3>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
               <h3 className="text-lg font-bold text-gray-900 mb-4 self-start">Tỉ lệ phân bổ Gói đăng ký</h3>
               <div className="h-64 w-full flex items-center justify-center">
                  <Doughnut 
                    data={{
                      labels: ['NONE (Miễn phí)', 'MONTH (Gói Tháng)', 'YEAR (Gói Năm)'],
                      datasets: [{
                        data: [
                          stats.subscriptionStats.NONE, 
                          stats.subscriptionStats.MONTH, 
                          stats.subscriptionStats.YEAR
                        ],
                        backgroundColor: ['#94a3b8', '#a855f7', '#f97316'],
                        borderWidth: 0,
                        hoverOffset: 4
                      }]
                    }}
                    options={{
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { position: 'bottom' }
                      }
                    }}
                  />
               </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
               <h3 className="text-lg font-bold text-gray-900 mb-4">Hoạt động gần đây</h3>
               <div className="space-y-4">
                 {[
                   { t: 'Có người dùng mới đăng ký hệ thống', time: '5 phút trước', color: 'bg-green-100 text-green-600' },
                   { t: 'Nâng cấp Gói Năm thành công', time: '1 giờ trước', color: 'bg-orange-100 text-orange-600' },
                   { t: 'Hệ thống AI xử lý 140 ca tầm soát', time: '3 giờ trước', color: 'bg-blue-100 text-blue-600' },
                   { t: 'Đã khóa 1 tài khoản vi phạm', time: '1 ngày trước', color: 'bg-red-100 text-red-600' },
                 ].map((item, i) => (
                   <div key={i} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.color}`}>
                       <Activity size={18} />
                     </div>
                     <div>
                       <p className="font-semibold text-gray-900 text-sm">{item.t}</p>
                       <p className="text-xs text-gray-500 mt-0.5">{item.time}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-gray-500">Không thể tải dữ liệu</div>
      )}
    </div>
  );
};

export default AdminDashboardScreen;
