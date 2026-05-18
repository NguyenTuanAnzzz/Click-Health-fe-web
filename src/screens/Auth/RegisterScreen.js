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
    <AuthLayout tagline="Gia nhập Đội ngũ Sức khỏe">
      <div className="w-full space-y-8">
        <h2 className="text-3xl font-black text-primary-dark uppercase italic border-b-4 border-dashed border-border pb-4">
          Tạo <span className="text-primary">Tài khoản</span>
        </h2>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-black uppercase text-primary-dark tracking-widest ml-1">Họ và Tên</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-dark/40 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="text" 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full bg-background border-4 border-primary-dark rounded-2xl py-4 pl-12 pr-6 text-primary-dark font-bold focus:ring-4 focus:ring-accent/30 outline-none"
                placeholder="Nhập họ tên đầy đủ..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-black uppercase text-primary-dark tracking-widest ml-1">Tuổi</label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-dark/40 group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  type="number" 
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="w-full bg-background border-4 border-primary-dark rounded-2xl py-4 pl-12 pr-6 text-primary-dark font-bold focus:ring-4 focus:ring-accent/30 outline-none"
                  placeholder="Tuổi..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black uppercase text-primary-dark tracking-widest ml-1">Giới tính</label>
              <select 
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                className="w-full bg-background border-4 border-primary-dark rounded-2xl py-4 px-6 text-primary-dark font-bold focus:ring-4 focus:ring-accent/30 outline-none appearance-none cursor-pointer"
              >
                <option value="MALE">Nam</option>
                <option value="FEMALE">Nữ</option>
                <option value="OTHER">Khác</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black uppercase text-primary-dark tracking-widest ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-dark/40 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-background border-4 border-primary-dark rounded-2xl py-4 pl-12 pr-6 text-primary-dark font-bold focus:ring-4 focus:ring-accent/30 outline-none"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black uppercase text-primary-dark tracking-widest ml-1">Mật khẩu</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-dark/40 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-background border-4 border-primary-dark rounded-2xl py-4 pl-12 pr-6 text-primary-dark font-bold focus:ring-4 focus:ring-accent/30 outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black uppercase text-primary-dark tracking-widest ml-1">Xác nhận mật khẩu</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-dark/40 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full bg-background border-4 border-primary-dark rounded-2xl py-4 pl-12 pr-6 text-primary-dark font-bold focus:ring-4 focus:ring-accent/30 outline-none"
                placeholder="Nhập lại mật khẩu..."
              />
            </div>
          </div>

          {/* Medical History Checklist */}
          <div className="space-y-4">
            <label className="text-sm font-black uppercase text-primary-dark tracking-widest ml-1 italic">Tiền sử bệnh lý (Checklist)</label>
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
                  className={`p-3 rounded-xl border-2 font-bold text-xs uppercase italic transition-all flex items-center justify-between
                    ${formData.medicalHistory[item.key] ? 'bg-primary text-white border-primary-dark shadow-teal-glow scale-105' : 'bg-background text-primary-dark/40 border-border'}
                  `}
                >
                  <item.icon size={14} className="mr-2" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {formData.medicalHistory[item.key] && <Check size={14} />}
                </button>
              ))}
            </div>
          </div>

          {(localError || error) && (
            <div className="bg-danger/10 border-4 border-danger rounded-2xl p-4 flex items-center gap-3 animate-bounce-small">
              <Activity className="text-danger" size={24} />
              <p className="text-danger font-black text-sm uppercase italic">{error || localError}</p>
            </div>
          )}

          <button
            type="button"
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => setAgree(!agree)}
          >
            <div className={`w-8 h-8 rounded-xl border-4 flex items-center justify-center transition-all shadow-sm
              ${agree ? "bg-accent border-primary-dark" : "bg-background border-border"}`}
            >
              {agree && <Check size={18} className="text-primary-dark" strokeWidth={4} />}
            </div>
            <p className="text-sm font-bold text-primary-dark/60 italic leading-tight">
              Tôi đồng ý với <span className="text-primary font-black uppercase underline decoration-accent">Điều khoản</span> và <span className="text-primary font-black uppercase underline decoration-accent">Bảo mật</span>
            </p>
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary-game text-xl py-6 mt-4 flex items-center justify-center gap-3"
          >
            {loading ? (
              <div className="w-8 h-8 border-4 border-primary-dark/30 border-t-primary-dark rounded-full animate-spin" />
            ) : (
              <>
                ĐĂNG KÝ NGAY! <ArrowRight size={24} strokeWidth={3} />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-6 border-t-4 border-dashed border-border">
          <p className="text-primary-dark/60 font-bold italic">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-primary font-black uppercase underline decoration-accent decoration-4 underline-offset-4 hover:text-accent transition-colors">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterScreen;
