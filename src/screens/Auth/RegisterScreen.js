import React, { useEffect, useState } from "react";
import { Check, Mail, Lock, User, Calendar, ArrowRight, ShieldCheck, Heart, Activity } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AuthLayout from "../../layouts/AuthLayout";
import { register, clearError } from "../../store/slices/authSlice";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
    gender: "MALE",
    password: "",
    confirmPassword: "",
    medicalHistory: {
      hypertension: false,
      diabetes: false,
      heartDisease: false,
    }
  });

  const [agree, setAgree] = useState(false);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (user && user.email) {
      navigate("/verify-email", { state: { email: user.email } });
    }
  }, [user, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    setLocalError("");

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.password.trim() || !formData.age) {
      setLocalError("Vui lòng điền đầy đủ tất cả các trường.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError("Mật khẩu xác nhận không khớp.");
      return;
    }

    if (!agree) {
      setLocalError("Bạn phải đồng ý với Điều khoản để tiếp tục.");
      return;
    }

    dispatch(register({
        ...formData,
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
    }));
  };

  const toggleMedicalHistory = (key) => {
    setFormData({
      ...formData,
      medicalHistory: {
        ...formData.medicalHistory,
        [key]: !formData.medicalHistory[key]
      }
    });
  };

  return (
    <AuthLayout tagline="Gia nhập hệ thống Click Health">
      <div className="w-full space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-black font-inter tracking-tight mb-1">
            Tạo tài khoản
          </h2>
          <p className="text-sm font-medium text-[#858585]">
            Bắt đầu hành trình theo dõi sức khỏe chủ động của bạn.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase text-[#151515] tracking-wider ml-1">Họ và Tên</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#858585]/40 group-focus-within:text-[#7AB5E9] transition-colors" size={18} />
              <input 
                type="text" 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full bg-white border border-[#e5e7eb] rounded-full py-3.5 pl-12 pr-6 text-black text-sm font-medium focus:ring-2 focus:ring-[#7AB5E9]/20 focus:border-[#7AB5E9] outline-none transition-all placeholder-[#999999]"
                placeholder="Nhập họ tên đầy đủ..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-[#151515] tracking-wider ml-1">Tuổi</label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#858585]/40 group-focus-within:text-[#7AB5E9] transition-colors" size={18} />
                <input 
                  type="number" 
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="w-full bg-white border border-[#e5e7eb] rounded-full py-3.5 pl-12 pr-6 text-black text-sm font-medium focus:ring-2 focus:ring-[#7AB5E9]/20 focus:border-[#7AB5E9] outline-none transition-all placeholder-[#999999]"
                  placeholder="Tuổi..."
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-[#151515] tracking-wider ml-1">Giới tính</label>
              <select 
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                className="w-full bg-white border border-[#e5e7eb] rounded-full py-3.5 px-6 text-black text-sm font-medium focus:ring-2 focus:ring-[#7AB5E9]/20 focus:border-[#7AB5E9] outline-none cursor-pointer"
              >
                <option value="MALE">Nam</option>
                <option value="FEMALE">Nữ</option>
                <option value="OTHER">Khác</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase text-[#151515] tracking-wider ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#858585]/40 group-focus-within:text-[#7AB5E9] transition-colors" size={18} />
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white border border-[#e5e7eb] rounded-full py-3.5 pl-12 pr-6 text-black text-sm font-medium focus:ring-2 focus:ring-[#7AB5E9]/20 focus:border-[#7AB5E9] outline-none transition-all placeholder-[#999999]"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase text-[#151515] tracking-wider ml-1">Mật khẩu</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#858585]/40 group-focus-within:text-[#7AB5E9] transition-colors" size={18} />
              <input 
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-white border border-[#e5e7eb] rounded-full py-3.5 pl-12 pr-6 text-black text-sm font-medium focus:ring-2 focus:ring-[#7AB5E9]/20 focus:border-[#7AB5E9] outline-none transition-all placeholder-[#999999]"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase text-[#151515] tracking-wider ml-1">Xác nhận mật khẩu</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#858585]/40 group-focus-within:text-[#7AB5E9] transition-colors" size={18} />
              <input 
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full bg-white border border-[#e5e7eb] rounded-full py-3.5 pl-12 pr-6 text-black text-sm font-medium focus:ring-2 focus:ring-[#7AB5E9]/20 focus:border-[#7AB5E9] outline-none transition-all placeholder-[#999999]"
                placeholder="Nhập lại mật khẩu..."
              />
            </div>
          </div>

          {/* Medical History Checklist */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold uppercase text-[#151515] tracking-wider ml-1">Tiền sử bệnh lý</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { key: 'hypertension', label: 'Huyết áp', icon: Activity },
                { key: 'diabetes', label: 'Tiểu đường', icon: Heart },
                { key: 'heartDisease', label: 'Bệnh tim', icon: ShieldCheck },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => toggleMedicalHistory(item.key)}
                  className={`px-4 py-3 rounded-full border text-xs font-semibold transition-all flex items-center justify-between
                    ${formData.medicalHistory[item.key] 
                      ? 'bg-[#7AB5E9]/10 text-[#1F75C1] border-[#7AB5E9] shadow-2xs' 
                      : 'bg-white text-[#858585] border-[#e5e7eb] hover:border-[#7AB5E9]/30'}
                  `}
                >
                  <div className="flex items-center">
                    <item.icon size={13} className="mr-2" />
                    <span>{item.label}</span>
                  </div>
                  {formData.medicalHistory[item.key] && <Check size={12} className="text-[#7AB5E9]" strokeWidth={3} />}
                </button>
              ))}
            </div>
          </div>

          {(localError || error) && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
              <Activity className="text-red-500" size={18} />
              <p className="text-red-600 font-semibold text-xs leading-normal">{error || localError}</p>
            </div>
          )}

          <button
            type="button"
            className="flex items-center gap-3 group cursor-pointer text-left"
            onClick={() => setAgree(!agree)}
          >
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all shadow-2xs shrink-0
              ${agree ? "bg-[#7AB5E9] border-[#7AB5E9]" : "bg-white border-[#e5e7eb] group-hover:border-[#7AB5E9]/60"}`}
            >
              {agree && <Check size={12} className="text-white" strokeWidth={3} />}
            </div>
            <p className="text-xs font-medium text-[#858585] leading-normal">
              Tôi đồng ý với <span className="text-[#1F75C1] font-semibold underline hover:text-[#7AB5E9]">Điều khoản dịch vụ</span> và <span className="text-[#1F75C1] font-semibold underline hover:text-[#7AB5E9]">Chính sách bảo mật</span>
            </p>
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#1F75C1] to-[#7AB5E9] py-4 mt-8 rounded-2xl flex items-center justify-center gap-2 text-white text-[16px] font-bold shadow-[0_10px_25px_rgba(31,117,193,0.3)] hover:shadow-[0_15px_35px_rgba(31,117,193,0.4)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 flex items-center gap-2">
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Đang xử lý...</span>
                </div>
              ) : (
                <>Đăng ký tài khoản <ArrowRight size={18} strokeWidth={3} /></>
              )}
            </span>
          </button>
        </form>

        <div className="text-center pt-6 border-t border-[#e5e7eb]">
          <p className="text-[#858585] text-sm font-medium">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-[#7AB5E9] font-semibold hover:underline">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterScreen;
