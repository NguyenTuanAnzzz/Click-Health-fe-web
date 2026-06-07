import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Camera, Moon, Award, CheckCircle, LogOut, User, Zap, Trophy, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import axios from "axios";
import UserLayout from "../../../layouts/UserLayout";
import { getInfo, logout, updateProfile } from "../../../store/slices/authSlice";
import API_URL from "../../../constants/apiConfig";

const PlanCard = ({ title, price, badge, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative flex-1 rounded-xl border p-6 text-left transition-all duration-300 shadow-2xs cursor-pointer
      ${selected 
        ? 'border-[#7AB5E9] bg-white text-[#1F75C1] ring-2 ring-[#7AB5E9]/30 shadow-md shadow-[#7AB5E9]/10' 
        : 'border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20'}
    `}
  >
    {badge && (
      <div className="absolute -top-3 right-4 rounded-full bg-[#d32f2f] px-2.5 py-0.5 shadow-2xs z-20">
        <span className="text-[9px] font-extrabold text-white uppercase tracking-wider">{badge}</span>
      </div>
    )}
    <h4 className={`text-[10px] font-extrabold uppercase mb-2 tracking-widest ${selected ? 'text-[#7AB5E9]' : 'text-white/50'}`}>
      {title}
    </h4>
    <p className={`text-2xl font-bold leading-none font-inter ${selected ? 'text-[#1F75C1]' : 'text-white'}`}>{price}</p>
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
  
  const fileInputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "MALE",
    avatar: "",
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
        avatar: user.avatar || "",
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

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Ảnh của bạn quá lớn! Vui lòng chọn tệp tin có dung lượng dưới 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;
      if (isEditing) {
        setFormData((prev) => ({
          ...prev,
          avatar: base64String,
        }));
      } else {
        const result = await dispatch(updateProfile({ avatar: base64String }));
        if (result.meta.requestStatus === 'fulfilled') {
          dispatch(getInfo());
        }
      }
    };
    reader.readAsDataURL(file);
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
      <div className="bg-[#1F75C1] pt-32 pb-16 px-4 md:px-8 lg:px-12 border-b border-[#e5e7eb]/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full pattern-grid-lg opacity-5" />
        <div className="max-w-[1000px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
               <input
                 type="file"
                 ref={fileInputRef}
                 className="hidden"
                 accept="image/*"
                 onChange={handleAvatarChange}
               />
               <div className="w-32 h-32 rounded-2xl bg-white/10 border border-white/20 overflow-hidden shadow-lg transition-transform">
                  {isEditing ? (
                    formData.avatar ? (
                      <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/50">
                        <User size={64} strokeWidth={1.5} />
                      </div>
                    )
                  ) : user?.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/50">
                      <User size={64} strokeWidth={1.5} />
                    </div>
                  )}
               </div>
               <button 
                 type="button"
                 onClick={() => fileInputRef.current?.click()}
                 className="absolute -bottom-2 -right-2 bg-white text-[#1F75C1] p-2.5 rounded-full border border-[#e5e7eb] shadow-md hover:bg-[#f0f1f2] transition-colors cursor-pointer"
               >
                 <Camera size={18} />
               </button>
            </div>
            
            <div className="text-center md:text-left flex-1">
               <h1 className="text-4xl md:text-5xl font-semibold text-white leading-none mb-3 font-inter">
                 {user?.fullName || "Người dùng"}
               </h1>
               <p className="text-[#BEDBF4] font-bold tracking-wider uppercase text-xs mb-4">Mã số: #{user?._id?.slice(-6).toUpperCase()}</p>
               <div className="flex flex-wrap justify-center md:justify-start gap-3">
                 <span className="bg-white/10 text-white px-3 py-1 rounded-sm text-[11px] font-medium border border-white/20 uppercase tracking-wider">{user?.email}</span>
                 <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-sm text-[11px] font-medium border border-green-500/30 uppercase tracking-wider">Trạng thái: Hoạt động</span>
               </div>
            </div>

            <div className="flex gap-4">
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="btn-activation-filled text-sm font-semibold tracking-tight shadow-md hover:shadow-lg cursor-pointer"
                >
                  Chỉnh sửa hồ sơ
                </button>
              ) : (
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2.5 rounded-full border border-red-500 text-red-500 hover:bg-red-50 transition-all font-medium text-sm shadow-2xs cursor-pointer"
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
          <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl border border-[#e5e7eb] p-8 space-y-8 shadow-sm">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-[#151515] tracking-wider ml-1">Họ và Tên</label>
                  <input 
                    type="text" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full bg-white border border-[#e5e7eb] rounded-full px-5 py-3 text-black text-sm font-medium focus:ring-2 focus:ring-[#7AB5E9]/20 focus:border-[#7AB5E9] outline-none transition-all placeholder-[#999999]"
                    placeholder="Nhập tên của bạn..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-[#151515] tracking-wider ml-1">Tuổi</label>
                  <input 
                    type="number" 
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    className="w-full bg-white border border-[#e5e7eb] rounded-full px-5 py-3 text-black text-sm font-medium focus:ring-2 focus:ring-[#7AB5E9]/20 focus:border-[#7AB5E9] outline-none transition-all placeholder-[#999999]"
                    placeholder="Tuổi..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase text-[#151515] tracking-wider ml-1">Giới tính</label>
                  <select 
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full bg-white border border-[#e5e7eb] rounded-full px-5 py-3 text-black text-sm font-medium focus:ring-2 focus:ring-[#7AB5E9]/20 focus:border-[#7AB5E9] outline-none cursor-pointer"
                  >
                    <option value="MALE">Nam</option>
                    <option value="FEMALE">Nữ</option>
                    <option value="OTHER">Khác</option>
                  </select>
                </div>
             </div>

             <div className="space-y-4">
                <label className="text-xs font-semibold uppercase text-[#151515] tracking-wider ml-1">Tiền sử bệnh lý</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {Object.entries(formData.medicalHistory).map(([key, value]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFormData({
                        ...formData, 
                        medicalHistory: { ...formData.medicalHistory, [key]: !value }
                      })}
                      className={`px-5 py-3.5 rounded-full border text-xs font-semibold transition-all flex items-center justify-between cursor-pointer
                        ${value 
                          ? 'bg-[#7AB5E9]/10 text-[#1F75C1] border-[#7AB5E9] shadow-2xs' 
                          : 'bg-white text-[#858585] border-[#e5e7eb] hover:border-[#7AB5E9]/30'}
                      `}
                    >
                      <span>{key === 'hypertension' ? 'Huyết áp cao' : key === 'diabetes' ? 'Tiểu đường' : 'Bệnh tim'}</span>
                      {value && <CheckCircle size={14} className="text-[#7AB5E9]" strokeWidth={3} />}
                    </button>
                  ))}
                </div>
             </div>

             <div className="pt-8 border-t border-[#e5e7eb] flex justify-center">
                <button 
                  type="submit"
                  disabled={authLoading}
                  className="btn-activation-filled text-sm font-semibold tracking-tight min-w-[200px] py-3.5 cursor-pointer shadow-md hover:shadow-lg"
                >
                  {authLoading ? "Đang lưu thông tin..." : "Lưu hồ sơ sức khỏe"}
                </button>
             </div>
          </form>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#f0f1f2] rounded-2xl p-6 border border-transparent hover:border-[#7AB5E9]/25 transition-all text-center shadow-2xs">
                 <p className="text-[10px] font-extrabold text-[#858585] uppercase tracking-widest mb-2 font-inter-tight-small">Độ tuổi</p>
                 <p className="text-3xl font-bold text-[#1F75C1] font-inter">{user?.age || "--"} tuổi</p>
              </div>
              <div className="bg-[#f0f1f2] rounded-2xl p-6 border border-transparent hover:border-[#7AB5E9]/25 transition-all text-center shadow-2xs">
                 <p className="text-[10px] font-extrabold text-[#858585] uppercase tracking-widest mb-2 font-inter-tight-small">Giới tính</p>
                 <p className="text-3xl font-bold text-[#1F75C1] font-inter">{user?.gender === 'MALE' ? 'Nam' : user?.gender === 'FEMALE' ? 'Nữ' : '--'}</p>
              </div>
              <div className="bg-[#f0f1f2] rounded-2xl p-6 border border-transparent hover:border-[#7AB5E9]/25 transition-all text-center shadow-2xs">
                 <p className="text-[10px] font-extrabold text-[#858585] uppercase tracking-widest mb-2 font-inter-tight-small">Sức khỏe</p>
                 <p className="text-3xl font-bold text-[#7AB5E9] font-inter">Bình thường</p>
              </div>
            </div>

            {/* VIP Upgrade Section */}
            <div className="relative rounded-2xl bg-[#1F75C1] text-white p-10 overflow-hidden shadow-lg border border-white/5">
                <div className="absolute top-0 right-0 w-full h-full pattern-grid-lg opacity-5" />
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <div className="inline-block bg-[#7AB5E9]/15 text-[#BEDBF4] px-3.5 py-1 rounded-full font-bold uppercase text-[9px] mb-4 border border-[#7AB5E9]/20 font-inter-tight-small">Gói dịch vụ cao cấp</div>
                            <h3 className="text-3xl md:text-4xl font-bold leading-tight font-inter">Nâng cấp <span className="text-[#BEDBF4]">Click VIP</span></h3>
                            <p className="text-white/60 font-medium mt-2 text-sm">Mở khóa tính năng tầm soát không giới hạn và báo cáo phân tích chi tiết.</p>
                        </div>
                        <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 shadow-sm">
                            <Award size={28} className="text-[#BEDBF4]" />
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
                                <CheckCircle size={16} className="text-[#7AB5E9]" strokeWidth={3} />
                                <span className="font-semibold text-white/80 text-sm">{f}</span>
                            </div>
                        ))}
                    </div>

                    <button 
                        onClick={handleUpgrade}
                        disabled={paymentLoading}
                        className="w-full bg-[#7AB5E9] text-white py-4.5 rounded-full font-bold shadow-md hover:bg-[#5CA5E4] hover:shadow-lg transition-all flex items-center justify-center gap-2 text-md font-inter-tight-small cursor-pointer disabled:opacity-50"
                    >
                        {paymentLoading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <span>NÂNG CẤP QUA VNPAY</span>
                                <Zap size={18} fill="currentColor" />
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#e5e7eb] p-8 shadow-sm">
              <h3 className="text-xl font-bold text-[#1F75C1] mb-6 border-b border-[#e5e7eb]/60 pb-4 font-inter">Cài đặt hệ thống</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#f0f1f2] rounded-xl border border-transparent">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-[#e5e7eb] shadow-2xs">
                      <Moon size={18} className="text-[#1F75C1]" />
                    </div>
                    <span className="font-bold text-[#1F75C1] text-sm">Chế độ tối (Dark Mode)</span>
                  </div>
                  <button 
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-12 h-6 rounded-full transition-all relative cursor-pointer
                      ${darkMode ? 'bg-[#7AB5E9]' : 'bg-gray-300'}
                    `}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all
                      ${darkMode ? 'left-7' : 'left-1'}
                    `} />
                  </button>
                </div>
                
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-full border border-red-500/30 text-red-500 font-bold hover:bg-red-50 transition-all shadow-2xs cursor-pointer text-sm"
                >
                  <LogOut size={16} />
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
