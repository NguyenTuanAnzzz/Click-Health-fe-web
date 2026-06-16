import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ShieldBan, ShieldCheck, ChevronLeft, ChevronRight, RefreshCw, UserCheck } from 'lucide-react';
import API_URL from '../../constants/apiConfig';

const AdminUsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/users/admin/users`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setUsers(res.data.users);
    } catch (err) {
      console.error('Lỗi lấy danh sách người dùng', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const toggleUserStatus = async (userId, currentBlockedStatus) => {
    if (!window.confirm(`Bạn có chắc muốn ${currentBlockedStatus ? 'mở khóa' : 'khóa'} người dùng này?`)) return;
    try {
      await axios.patch(`${API_URL}/users/admin/users/${userId}/status`, 
        { isBlocked: !currentBlockedStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (err) {
      alert('Lỗi cập nhật trạng thái');
    }
  };

  const updateSubscription = async (userId, newStatus, durationMonths = 1) => {
    if (!window.confirm(`Bạn có chắc muốn cấp gói ${newStatus} cho người dùng này?`)) return;
    try {
      await axios.patch(`${API_URL}/users/admin/users/${userId}/subscription`, 
        { subscriptionStatus: newStatus, durationMonths },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (err) {
      alert('Lỗi cập nhật gói mua bán');
    }
  };

  const filteredUsers = users.filter(u => 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Quản lý người dùng</h1>
          <p className="text-sm text-gray-500 mt-1">Tra cứu, chỉnh sửa trạng thái và xử lý sự cố cấp gói</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Tìm kiếm email, tên người dùng..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm"
            />
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button 
            onClick={fetchUsers}
            className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm shrink-0"
            title="Làm mới"
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-[11px] uppercase tracking-widest text-gray-500 font-bold border-b border-gray-200">
                <th className="px-6 py-4">Tài khoản</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4">Gói dịch vụ</th>
                <th className="px-6 py-4">Khóa/Mở</th>
                <th className="px-6 py-4 text-right">Chữa cháy thanh toán</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500 font-medium">
                    <RefreshCw size={24} className="animate-spin mx-auto mb-3 text-blue-500" />
                    Đang tải dữ liệu người dùng...
                  </td>
                </tr>
              ) : paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500 font-medium">
                    <UserCheck size={32} className="mx-auto mb-3 text-gray-300" />
                    Không tìm thấy người dùng nào phù hợp.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map(user => (
                  <tr key={user._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center shrink-0 text-blue-600 font-bold overflow-hidden">
                          {user.avatar && user.avatar !== 'default-avatar.png' ? (
                            <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                          ) : (
                            user.fullName?.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{user.fullName}</div>
                          <div className="text-gray-500 text-xs mt-0.5">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {user.isBlocked ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-red-100 text-red-700 border border-red-200">
                          <ShieldBan size={12} /> BỊ KHÓA
                        </span>
                      ) : user.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-green-100 text-green-700 border border-green-200">
                          <ShieldCheck size={12} /> ĐÃ XÁC THỰC
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-gray-100 text-gray-600 border border-gray-200">
                          CHỜ XÁC THỰC
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">
                        {user.subscriptionStatus === 'YEAR' ? 'Gói Năm' : user.subscriptionStatus === 'MONTH' ? 'Gói Tháng' : 'Miễn phí'}
                      </div>
                      {user.subscriptionExpiry && user.subscriptionStatus !== 'NONE' && (
                        <div className="text-xs text-gray-500 mt-0.5 font-medium">
                          Hạn: {new Date(user.subscriptionExpiry).toLocaleDateString('vi-VN')}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleUserStatus(user._id, user.isBlocked)}
                        className={`text-xs font-bold px-4 py-2 rounded-lg border shadow-sm transition-all ${
                          user.isBlocked 
                          ? 'bg-white border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300'
                          : 'bg-white border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300'
                        }`}
                      >
                        {user.isBlocked ? 'Mở Khóa' : 'Khóa User'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => updateSubscription(user._id, 'NONE')}
                          className="text-[11px] font-bold px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors border border-transparent hover:border-gray-300"
                          title="Hủy gói"
                        >
                          HỦY GÓI
                        </button>
                        <button
                          onClick={() => updateSubscription(user._id, 'MONTH', 1)}
                          className="text-[11px] font-bold px-3 py-2 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 transition-colors border border-purple-200"
                          title="Cấp gói Tháng"
                        >
                          CẤP THÁNG
                        </button>
                        <button
                          onClick={() => updateSubscription(user._id, 'YEAR', 12)}
                          className="text-[11px] font-bold px-3 py-2 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-700 transition-colors border border-orange-200"
                          title="Cấp gói Năm"
                        >
                          CẤP NĂM
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
            <span className="text-sm text-gray-500 font-medium">
              Hiển thị <span className="font-bold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> đến <span className="font-bold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredUsers.length)}</span> trong <span className="font-bold text-gray-900">{filteredUsers.length}</span>
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${
                      currentPage === page 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsersScreen;
