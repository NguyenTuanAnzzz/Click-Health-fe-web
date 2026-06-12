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
      <div className="w-full space-y-6 font-body">
        <div>
          <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight mb-1">
            Tạo tài khoản
          </h2>
          <p className="text-sm font-medium text-on-surface-variant">
            Bắt đầu hành trình theo dõi sức khỏe chủ động của bạn.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase text-on-surface-variant tracking-wider ml-1">Họ và Tên</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text" 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full bg-surface-container-highest/30 border border-outline-variant rounded-2xl py-3.5 pl-12 pr-6 text-on-surface text-sm font-medium focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder-outline"
                placeholder="Nhập họ tên đầy đủ..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-on-surface-variant tracking-wider ml-1">Tuổi</label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={18} />
                <input 
                  type="number" 
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="w-full bg-surface-container-highest/30 border border-outline-variant rounded-2xl py-3.5 pl-12 pr-6 text-on-surface text-sm font-medium focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder-outline"
                  placeholder="Tuổi..."
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase text-on-surface-variant tracking-wider ml-1">Giới tính</label>
              <select 
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                className="w-full bg-surface-container-highest/30 border border-outline-variant rounded-2xl py-3.5 px-6 text-on-surface text-sm font-medium focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer"
              >
                <option value="MALE">Nam</option>
                <option value="FEMALE">Nữ</option>
                <option value="OTHER">Khác</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase text-on-surface-variant tracking-wider ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-surface-container-highest/30 border border-outline-variant rounded-2xl py-3.5 pl-12 pr-6 text-on-surface text-sm font-medium focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder-outline"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase text-on-surface-variant tracking-wider ml-1">Mật khẩu</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-surface-container-highest/30 border border-outline-variant rounded-2xl py-3.5 pl-12 pr-6 text-on-surface text-sm font-medium focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder-outline"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase text-on-surface-variant tracking-wider ml-1">Xác nhận mật khẩu</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full bg-surface-container-highest/30 border border-outline-variant rounded-2xl py-3.5 pl-12 pr-6 text-on-surface text-sm font-medium focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder-outline"
                placeholder="Nhập lại mật khẩu..."
              />
            </div>
          </div>

          {/* Medical History Checklist */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold uppercase text-on-surface-variant tracking-wider ml-1">Tiền sử bệnh lý</label>
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
                  className={`px-4 py-3 rounded-2xl border text-xs font-semibold transition-all flex items-center justify-between
                    ${formData.medicalHistory[item.key] 
                      ? 'bg-primary/10 text-primary border-primary shadow-sm' 
                      : 'bg-surface-container-highest/30 text-on-surface-variant border-outline-variant hover:border-primary/50'}
                  `}
                >
                  <div className="flex items-center">
                    <item.icon size={13} className="mr-2" />
                    <span>{item.label}</span>
                  </div>
                  {formData.medicalHistory[item.key] && <Check size={12} className="text-primary" strokeWidth={3} />}
                </button>
              ))}
            </div>
          </div>

          {(localError || error) && (
            <div className="bg-error-container border border-error/50 rounded-xl p-4 flex items-center gap-3">
              <Activity className="text-error" size={18} />
              <p className="text-on-error-container font-semibold text-xs leading-normal">{error || localError}</p>
            </div>
          )}

          <button
            type="button"
            className="flex items-center gap-3 group cursor-pointer text-left mt-2"
            onClick={() => setAgree(!agree)}
          >
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all shrink-0
              ${agree ? "bg-primary border-primary soft-glow-primary" : "bg-surface-container-lowest border-outline-variant group-hover:border-primary/60"}`}
            >
              {agree && <Check size={12} className="text-on-primary" strokeWidth={3} />}
            </div>
            <p className="text-xs font-medium text-on-surface-variant leading-normal">
              Tôi đồng ý với <span className="text-primary font-bold hover:underline">Điều khoản dịch vụ</span> và <span className="text-primary font-bold hover:underline">Chính sách bảo mật</span>
            </p>
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary py-4 mt-8 rounded-full flex items-center justify-center gap-2 text-[16px] font-bold soft-glow-primary hover:translate-y-[-2px] transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
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

        <div className="text-center pt-6 border-t border-outline-variant/30">
          <p className="text-on-surface-variant text-sm font-medium">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-primary font-bold hover:underline">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterScreen;
