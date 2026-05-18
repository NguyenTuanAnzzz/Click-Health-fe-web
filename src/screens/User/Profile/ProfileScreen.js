import React, { useState, useEffect } from "react";
import { ArrowLeft, Camera, Moon, Award, CheckCircle, LogOut, User, Zap, Trophy, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import axios from "axios";
import UserLayout from "../../../layouts/UserLayout";
import { getInfo, logout, updateProfile } from "../../../store/slices/authSlice";
import API_URL from "../../../constants/apiConfig";

const PlanCard = ({ title, price, badge, selected, onClick, colorClass = "border-primary" }) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative flex-1 rounded-lg border p-6 text-left transition-all shadow-sm
      ${selected ? `${colorClass} bg-primary/5` : 'border-border/30 bg-white hover:border-primary/30'}
    `}
  >
    {badge && (
      <div className="absolute -top-3 -right-2 rounded bg-danger px-2 py-0.5 shadow-sm border border-danger/20">
        <span className="text-[10px] font-semibold text-white uppercase tracking-wider">{badge}</span>
      </div>
    )}
    <h4 className={`text-xs font-semibold uppercase mb-2 tracking-widest ${selected ? 'text-primary' : 'text-secondary/60'}`}>
      {title}
    </h4>
    <p className="text-2xl font-semibold text-main leading-none">{price}</p>
  </button>
);

const ProfileScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [paymentLoading, setPaymentLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "MALE",
    medicalHistory: {
      hypertension: false,
      diabetes: false,
      heartDisease: false,
    }
  });

  useEffect(() => {
    dispatch(getInfo());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        age: user.age || "",
        gender: user.gender || "MALE",
        medicalHistory: user.medicalHistory || {
          hypertension: false,
          diabetes: false,
          heartDisease: false,
        }
      });
    }
  }, [user]);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      dispatch(logout());
      navigate("/login");
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateProfile(formData));
    if (result.meta.requestStatus === 'fulfilled') {
      setIsEditing(false);
    }
  };

  const handleUpgrade = async () => {
    setPaymentLoading(true);
    try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const amount = selectedPlan === "monthly" ? 49000 : 490000;
        
        const response = await axios.post(`${API_URL}/payment/create_payment_url`, {
            amount: amount,
            bankCode: "", 
            language: "vn"
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.paymentUrl) {
            window.location.href = response.data.paymentUrl;
        } else {
            throw new Error("Could not get payment URL");
        }
    } catch (err) {
        console.error("Upgrade failed:", err);
        alert("Không thể khởi tạo thanh toán. Vui lòng thử lại sau.");
    } finally {
        setPaymentLoading(false);
    }
  };

  return (
    <UserLayout noPaddingTop>
      <div className="bg-main pt-32 pb-16 px-4 md:px-8 lg:px-12 border-b border-border/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full pattern-grid-lg opacity-5" />
        <div className="max-w-[1000px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
               <div className="w-32 h-32 rounded-lg bg-primary/20 border border-white/20 overflow-hidden shadow-lg transition-transform">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/50">
                      <User size={64} strokeWidth={1.5} />
                    </div>
                  )}
               </div>
               <button className="absolute -bottom-2 -right-2 bg-white text-main p-2.5 rounded-md border border-border shadow-md hover:bg-neutral transition-colors">
                 <Camera size={18} />
               </button>
            </div>
            
            <div className="text-center md:text-left flex-1">
               <h1 className="text-4xl md:text-5xl font-semibold text-white leading-none mb-3">
                 {user?.fullName || "Người dùng"}
               </h1>
               <p className="text-primary-light font-medium tracking-wider uppercase text-xs mb-4">Mã số: #{user?._id?.slice(-6).toUpperCase()}</p>
               <div className="flex flex-wrap justify-center md:justify-start gap-3">
                 <span className="bg-white/10 text-white px-3 py-1 rounded-sm text-[11px] font-medium border border-white/20 uppercase tracking-wider">{user?.email}</span>
                 <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-sm text-[11px] font-medium border border-green-500/30 uppercase tracking-wider">Trạng thái: Hoạt động</span>
               </div>
            </div>

            <div className="flex gap-4">
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="bg-primary text-white py-3 px-8 rounded-md font-semibold shadow-sm hover:bg-primary-dark transition-colors"
                >
                  Chỉnh sửa hồ sơ
                </button>
              ) : (
                <button 
                  onClick={() => setIsEditing(false)}
                  className="bg-danger text-white px-8 py-3 rounded-md font-semibold shadow-sm hover:bg-danger-dark transition-colors"
                >
                  Hủy bỏ
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 md:px-8 lg:px-12 py-16">
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="bg-white rounded-lg border border-border/20 p-8 space-y-10 shadow-sm">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-secondary tracking-wider ml-1">Họ và Tên</label>
                  <input 
                    type="text" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full bg-neutral border border-border/40 rounded-md px-4 py-3 text-main font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="Nhập tên của bạn..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-secondary tracking-wider ml-1">Tuổi</label>
                  <input 
                    type="number" 
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    className="w-full bg-neutral border border-border/40 rounded-md px-4 py-3 text-main font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="Tuổi..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase text-secondary tracking-wider ml-1">Giới tính</label>
                  <select 
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full bg-neutral border border-border/40 rounded-md px-4 py-3 text-main font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none"
                  >
                    <option value="MALE">Nam</option>
                    <option value="FEMALE">Nữ</option>
                    <option value="OTHER">Khác</option>
                  </select>
                </div>
             </div>

             <div className="space-y-4">
                <label className="text-xs font-semibold uppercase text-secondary tracking-wider ml-1">Tiền sử bệnh lý</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {Object.entries(formData.medicalHistory).map(([key, value]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFormData({
                        ...formData, 
                        medicalHistory: { ...formData.medicalHistory, [key]: !value }
                      })}
                      className={`p-4 rounded-md border font-semibold transition-all flex items-center justify-between
                        ${value ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white text-secondary border-border/40 hover:border-primary/30'}
                      `}
                    >
                      {key === 'hypertension' ? 'Huyết áp cao' : key === 'diabetes' ? 'Tiểu đường' : 'Bệnh tim'}
                      {value && <CheckCircle size={18} />}
                    </button>
                  ))}
                </div>
             </div>

             <div className="pt-8 border-t border-border/10 flex justify-center">
                <button 
                  type="submit"
                  disabled={authLoading}
                  className="bg-primary text-white py-4 px-12 rounded-md font-semibold shadow-md hover:bg-primary-dark transition-all min-w-[200px]"
                >
                  {authLoading ? "ĐANG LƯU..." : "LƯU THÔNG TIN"}
                </button>
             </div>
          </form>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 border border-border/20 shadow-sm text-center">
                 <p className="text-[10px] font-semibold text-secondary uppercase tracking-widest mb-2">Độ tuổi</p>
                 <p className="text-3xl font-semibold text-main">{user?.age || "--"} tuổi</p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-border/20 shadow-sm text-center">
                 <p className="text-[10px] font-semibold text-secondary uppercase tracking-widest mb-2">Giới tính</p>
                 <p className="text-3xl font-semibold text-main">{user?.gender === 'MALE' ? 'Nam' : user?.gender === 'FEMALE' ? 'Nữ' : '--'}</p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-border/20 shadow-sm text-center">
                 <p className="text-[10px] font-semibold text-secondary uppercase tracking-widest mb-2">Sức khỏe</p>
                 <p className="text-3xl font-semibold text-primary">Bình thường</p>
              </div>
            </div>

            {/* VIP Upgrade Section */}
            <div className="relative rounded-xl bg-main text-white p-10 overflow-hidden shadow-lg border border-white/5">
                <div className="absolute top-0 right-0 w-full h-full pattern-grid-lg opacity-5" />
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <div className="inline-block bg-primary/20 text-primary-light px-3 py-0.5 rounded-sm font-semibold uppercase text-[10px] mb-4 border border-primary/20">Gói dịch vụ</div>
                            <h3 className="text-3xl md:text-4xl font-semibold leading-tight">Nâng cấp <span className="text-primary-light">Click VIP</span></h3>
                            <p className="text-white/60 font-medium mt-2">Mở khóa tính năng tầm soát không giới hạn và báo cáo chi tiết.</p>
                        </div>
                        <div className="w-14 h-14 bg-primary/20 rounded-md flex items-center justify-center border border-white/10 shadow-sm">
                            <Award size={28} className="text-primary-light" />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 mb-10">
                        <PlanCard 
                            title="Gói tháng"
                            price="49,000₫"
                            selected={selectedPlan === "monthly"}
                            onClick={() => setSelectedPlan("monthly")}
                        />
                        <PlanCard 
                            title="Gói năm"
                            price="490,000₫"
                            badge="Tiết kiệm"
                            selected={selectedPlan === "yearly"}
                            onClick={() => setSelectedPlan("yearly")}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                        {["Quét dấu hiệu không giới hạn", "Báo cáo phân tích chuyên sâu", "Hỗ trợ ưu tiên 24/7", "Lưu trữ lịch sử tầm soát"].map((f, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <CheckCircle size={18} className="text-primary-light" />
                                <span className="font-medium text-white/80">{f}</span>
                            </div>
                        ))}
                    </div>

                    <button 
                        onClick={handleUpgrade}
                        disabled={paymentLoading}
                        className="w-full bg-primary text-white py-5 rounded-md font-semibold shadow-md hover:bg-primary-dark transition-all flex items-center justify-center gap-3 text-lg"
                    >
                        {paymentLoading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <span>NÂNG CẤP QUA VNPAY</span>
                                <Zap size={20} fill="currentColor" />
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-border/20 p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-main mb-8 border-b border-border/10 pb-4">Cài đặt ứng dụng</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-neutral rounded-md border border-border/20">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center border border-border/30">
                      <Moon size={20} className="text-main" />
                    </div>
                    <span className="font-semibold text-main text-sm">Chế độ tối (Dark Mode)</span>
                  </div>
                  <button 
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-12 h-6 rounded-full transition-all relative
                      ${darkMode ? 'bg-primary' : 'bg-gray-300'}
                    `}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all
                      ${darkMode ? 'left-7' : 'left-1'}
                    `} />
                  </button>
                </div>
                
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-md border border-danger text-danger font-semibold hover:bg-danger hover:text-white transition-all shadow-sm"
                >
                  <LogOut size={20} />
                  Đăng xuất tài khoản
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default ProfileScreen;
