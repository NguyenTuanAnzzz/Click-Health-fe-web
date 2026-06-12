import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Camera, Moon, Award, CheckCircle, LogOut, User, Zap, Trophy, Heart, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import axios from "axios";
import UserLayout from "../../../layouts/UserLayout";
import { getInfo, logout, updateProfile } from "../../../store/slices/authSlice";
import API_URL from "../../../constants/apiConfig";

const PlanCard = ({ title, price, badge, selected, onClick, subText }) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative flex-1 rounded-[32px] p-8 text-left transition-all duration-500 cursor-pointer overflow-hidden group
      ${selected 
        ? 'bg-gradient-to-br from-white to-white/95 text-primary shadow-[0_20px_40px_rgba(0,0,0,0.2)] border-0 ring-4 ring-white/30 scale-105 z-10' 
        : 'bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-white/40 hover:-translate-y-2 hover:shadow-xl backdrop-blur-md'}
    `}
  >
    {/* Background glow for selected state */}
    {selected && (
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-secondary-container/20 rounded-full blur-[30px] pointer-events-none" />
    )}
    
    {badge && (
      <div className="absolute top-0 right-6 rounded-b-xl bg-gradient-to-b from-error to-pink-600 px-4 py-2 shadow-lg shadow-error/30 z-20">
        <span className="text-[10px] font-black text-white uppercase tracking-widest block transform origin-top animate-pulse">{badge}</span>
      </div>
    )}
    
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <h4 className={`text-[13px] font-extrabold uppercase tracking-widest ${selected ? 'text-primary/70' : 'text-white/70'}`}>
          {title}
        </h4>
        {selected && (
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle size={14} className="text-primary" strokeWidth={3} />
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-1 mt-6">
        <p className={`text-4xl lg:text-5xl font-black leading-none font-headline tracking-tighter ${selected ? 'text-primary' : 'text-white'}`}>
          {price.replace('₫', '')}
        </p>
        <span className={`text-xl font-bold ${selected ? 'text-primary/60' : 'text-white/60'}`}>₫</span>
      </div>
      <p className={`mt-3 text-[13px] font-semibold ${selected ? 'text-primary/60' : 'text-white/50'}`}>
        {subText || "Thanh toán"}
      </p>
    </div>
  </button>
);

const ProfileScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading: authLoading } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  
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

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      dispatch(logout());
      navigate("/login");
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("fullName", formData.fullName);
    if (formData.age) data.append("age", formData.age);
    data.append("gender", formData.gender);
    data.append("medicalHistory", JSON.stringify(formData.medicalHistory));
    
    if (avatarFile) {
      data.append("avatar", avatarFile);
    }

    const result = await dispatch(updateProfile(data));
    if (result.meta.requestStatus === 'fulfilled') {
      setIsEditing(false);
      setAvatarFile(null);
      dispatch(getInfo());
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Ảnh của bạn quá lớn! Vui lòng chọn tệp tin có dung lượng dưới 2MB.");
      return;
    }

    setAvatarFile(file);
    const previewUrl = URL.createObjectURL(file);

    if (isEditing) {
      setFormData((prev) => ({
        ...prev,
        avatar: previewUrl,
      }));
    } else {
      // If not editing but just clicked camera icon to update avatar
      const data = new FormData();
      data.append("avatar", file);
      const result = await dispatch(updateProfile(data));
      if (result.meta.requestStatus === 'fulfilled') {
        dispatch(getInfo());
        setAvatarFile(null);
      }
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
      <div className="bg-primary pt-32 pb-16 px-4 md:px-8 lg:px-12 border-b border-white/10 relative overflow-hidden font-body">
        <div className="absolute top-0 right-0 w-full h-full pattern-grid-lg opacity-10" />
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
               <input
                 type="file"
                 ref={fileInputRef}
                 className="hidden"
                 accept="image/*"
                 onChange={handleAvatarChange}
               />
               <div className="w-32 h-32 md:w-40 md:h-40 rounded-[32px] bg-white/10 border border-white/20 overflow-hidden shadow-2xl transition-transform backdrop-blur-md">
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
                 className="absolute -bottom-3 -right-3 bg-white text-primary p-3.5 rounded-full border border-white shadow-xl hover:scale-105 transition-all cursor-pointer"
               >
                 <Camera size={20} />
               </button>
            </div>
            
            <div className="text-center md:text-left flex-1 mt-4 md:mt-0">
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-none mb-4 font-headline tracking-tight">
                 {user?.fullName || "Người dùng"}
               </h1>
               <p className="text-white/70 font-bold tracking-widest uppercase text-xs mb-5">Mã số: #{user?._id?.slice(-6).toUpperCase()}</p>
               <div className="flex flex-wrap justify-center md:justify-start gap-3">
                 <span className="bg-white/10 text-white px-4 py-1.5 rounded-full text-[12px] font-bold border border-white/20 uppercase tracking-wider backdrop-blur-sm">{user?.email}</span>
                 <span className="bg-green-400/20 text-green-300 px-4 py-1.5 rounded-full text-[12px] font-bold border border-green-400/30 uppercase tracking-wider backdrop-blur-sm">Trạng thái: Hoạt động</span>
               </div>
            </div>

            <div className="flex gap-4 mt-6 md:mt-0">
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="bg-white text-primary px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer text-[14px]"
                >
                  Chỉnh sửa hồ sơ
                </button>
              ) : (
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-8 py-4 rounded-full border-2 border-error/50 text-error hover:bg-error/10 transition-all font-bold text-[14px] cursor-pointer"
                >
                  Hủy bỏ
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 py-16 font-body">
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="bg-surface rounded-[32px] border border-outline-variant/60 p-8 md:p-12 space-y-8 shadow-xl">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase text-on-surface-variant tracking-widest ml-2">Họ và Tên</label>
                  <input 
                    type="text" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-full px-6 py-4 text-on-surface text-[15px] font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder-on-surface-variant/50"
                    placeholder="Nhập tên của bạn..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase text-on-surface-variant tracking-widest ml-2">Tuổi</label>
                  <input 
                    type="number" 
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-full px-6 py-4 text-on-surface text-[15px] font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder-on-surface-variant/50"
                    placeholder="Tuổi..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase text-on-surface-variant tracking-widest ml-2">Giới tính</label>
                  <select 
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full bg-surface-container-lowest border border-outline-variant/60 rounded-full px-6 py-4 text-on-surface text-[15px] font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none cursor-pointer appearance-none"
                  >
                    <option value="MALE">Nam</option>
                    <option value="FEMALE">Nữ</option>
                    <option value="OTHER">Khác</option>
                  </select>
                </div>
             </div>

             <div className="space-y-4 pt-4 border-t border-outline-variant/40">
                <label className="text-[11px] font-extrabold uppercase text-on-surface-variant tracking-widest ml-2">Tiền sử bệnh lý</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {Object.entries(formData.medicalHistory).map(([key, value]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFormData({
                        ...formData, 
                        medicalHistory: { ...formData.medicalHistory, [key]: !value }
                      })}
                      className={`px-6 py-4 rounded-2xl border-2 text-[14px] font-bold transition-all flex items-center justify-between cursor-pointer
                        ${value 
                          ? 'bg-primary/10 text-primary border-primary shadow-sm' 
                          : 'bg-surface text-on-surface-variant border-outline-variant/60 hover:border-primary/30 hover:bg-surface-container-lowest'}
                      `}
                    >
                      <span>{key === 'hypertension' ? 'Huyết áp cao' : key === 'diabetes' ? 'Tiểu đường' : 'Bệnh tim mạch'}</span>
                      {value && <CheckCircle size={18} className="text-primary" strokeWidth={3} />}
                    </button>
                  ))}
                </div>
             </div>

             <div className="pt-8 flex justify-center">
                <button 
                  type="submit"
                  disabled={authLoading}
                  className="bg-primary text-on-primary text-[15px] font-bold tracking-wide min-w-[240px] py-4 rounded-full cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50"
                >
                  {authLoading ? "Đang lưu thông tin..." : "Lưu hồ sơ sức khỏe"}
                </button>
             </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Column: Stats & Settings */}
            <div className="lg:col-span-1 space-y-8">
              {/* Stats Card */}
              <div className="bg-surface rounded-[32px] border border-outline-variant/60 p-8 shadow-sm relative overflow-hidden group hover:border-primary/30 hover:shadow-lg transition-all duration-500">
                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-[20px] pointer-events-none group-hover:bg-primary/10 transition-colors duration-500" />
                 <h3 className="text-[18px] font-extrabold text-on-surface mb-6 border-b border-outline-variant/40 pb-5 font-headline flex items-center gap-3">
                   <Activity size={20} className="text-primary" />
                   Sinh trắc học
                 </h3>
                 <div className="space-y-6 relative z-10">
                    <div className="flex items-center justify-between">
                       <p className="text-[12px] font-extrabold text-on-surface-variant uppercase tracking-widest">Độ tuổi</p>
                       <p className="text-xl font-extrabold text-primary font-headline">{user?.age || "--"} <span className="text-[14px] font-semibold text-on-surface-variant">tuổi</span></p>
                    </div>
                    <div className="flex items-center justify-between">
                       <p className="text-[12px] font-extrabold text-on-surface-variant uppercase tracking-widest">Giới tính</p>
                       <p className="text-xl font-extrabold text-primary font-headline">{user?.gender === 'MALE' ? 'Nam' : user?.gender === 'FEMALE' ? 'Nữ' : '--'}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-outline-variant/30">
                       <p className="text-[12px] font-extrabold text-on-surface-variant uppercase tracking-widest">Sức khỏe</p>
                       <span className="inline-block text-[11px] font-extrabold bg-green-500/10 text-green-600 px-3 py-1 rounded-md uppercase tracking-wider border border-green-500/20">Bình thường</span>
                    </div>
                 </div>
              </div>

              {/* Account Management Card */}
              <div className="bg-surface rounded-[32px] border border-outline-variant/60 p-8 shadow-sm relative overflow-hidden group hover:border-error/20 hover:shadow-lg transition-all duration-500">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-error/5 rounded-full blur-[20px] pointer-events-none group-hover:bg-error/10 transition-colors duration-500" />
                <h3 className="text-[18px] font-extrabold text-on-surface mb-6 border-b border-outline-variant/40 pb-5 font-headline flex items-center gap-3">
                  <User size={20} className="text-on-surface-variant" />
                  Tài khoản
                </h3>
                <p className="text-on-surface-variant text-[13px] font-medium mb-6 leading-relaxed">Bảo mật tài khoản của bạn bằng cách đăng xuất khi không sử dụng trên thiết bị công cộng.</p>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between px-6 py-4 rounded-2xl border border-error/30 bg-error/5 text-error font-extrabold hover:bg-error hover:text-white hover:border-error hover:shadow-lg hover:shadow-error/30 transition-all duration-300 cursor-pointer text-[14px] group/btn"
                >
                  <span className="tracking-wide">ĐĂNG XUẤT</span>
                  <LogOut size={18} className="transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Column: VIP Upgrade */}
            <div className="lg:col-span-2 flex flex-col">
              {/* VIP Upgrade Section */}
              <div className="relative rounded-[40px] bg-gradient-to-br from-[#0A2540] to-primary text-white p-10 md:p-14 overflow-hidden shadow-[0_20px_50px_rgba(10,37,64,0.3)] border border-white/10 flex-1 flex flex-col justify-center group">
                  <div className="absolute top-0 right-0 w-full h-full pattern-grid-lg opacity-[0.05] group-hover:opacity-10 transition-opacity duration-1000" />
                  <div className="absolute top-[-150px] right-[-150px] w-[500px] h-[500px] bg-[#3B82F6]/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#3B82F6]/30 transition-colors duration-1000" />
                  
                  <div className="relative z-10">
                      <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
                          <div>
                              <div className="inline-block bg-white/10 text-white px-4 py-1.5 rounded-full font-bold uppercase text-[10px] mb-6 border border-white/20 tracking-wider backdrop-blur-sm shadow-sm">Gói dịch vụ cao cấp</div>
                              <h3 className="text-4xl md:text-5xl font-extrabold leading-tight font-headline">Nâng cấp <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#93C5FD]">Click VIP</span></h3>
                              <p className="text-white/70 font-medium mt-4 text-[16px] max-w-lg leading-relaxed">Mở khóa tính năng tầm soát không giới hạn và báo cáo phân tích y khoa chuyên sâu từ AI ngay hôm nay.</p>
                          </div>
                          <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700 relative">
                              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-[20px] -z-10 animate-pulse"></div>
                              <img src="/money.png" alt="Money 3D Icon" className="w-full h-full object-contain drop-shadow-2xl" />
                          </div>
                      </div>

                      <div className="flex flex-col md:flex-row gap-6 mb-12">
                          <PlanCard 
                              title="Gói tháng"
                              price="49,000₫"
                              subText="/ 1 tháng"
                              selected={selectedPlan === "monthly"}
                              onClick={() => setSelectedPlan("monthly")}
                          />
                          <PlanCard 
                              title="Gói năm"
                              price="490,000₫"
                              subText="/ 12 tháng"
                              badge="Khuyên dùng"
                              selected={selectedPlan === "yearly"}
                              onClick={() => setSelectedPlan("yearly")}
                          />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
                          {["Quét dấu hiệu không giới hạn", "Báo cáo phân tích chuyên sâu", "Hỗ trợ ưu tiên 24/7", "Lưu trữ lịch sử tầm soát"].map((f, i) => (
                              <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                                    <CheckCircle size={16} className="text-green-400" strokeWidth={3} />
                                  </div>
                                  <span className="font-bold text-white/90 text-[14px]">{f}</span>
                              </div>
                          ))}
                      </div>

                      <button 
                          onClick={handleUpgrade}
                          disabled={paymentLoading}
                          className="w-full bg-white text-[#0A2540] py-5 rounded-[24px] font-black shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(255,255,255,0.3)] transition-all duration-300 flex items-center justify-center gap-3 text-[16px] cursor-pointer disabled:opacity-50 group/pay"
                      >
                          {paymentLoading ? (
                              <div className="w-6 h-6 border-2 border-[#0A2540]/30 border-t-[#0A2540] rounded-full animate-spin" />
                          ) : (
                              <>
                                  <span className="tracking-wide">NÂNG CẤP QUA PAYOS NGAY</span>
                                  <Zap size={20} fill="currentColor" className="text-[#3B82F6] group-hover/pay:scale-125 transition-transform" />
                              </>
                          )}
                      </button>
                  </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default ProfileScreen;
