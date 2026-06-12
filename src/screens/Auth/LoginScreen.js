import React, { useState, useEffect } from "react";
import { Check, Mail, Lock, ArrowRight, Activity, Zap } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AuthLayout from "../../layouts/AuthLayout";
import { login, clearError } from "../../store/slices/authSlice";

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { token, loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password, rememberMe }));
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <AuthLayout tagline="Hệ thống cảnh báo đột quỵ thông minh">
      <div className="w-full font-body">
        <div className="mb-10 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-3">
            Đăng nhập
          </h2>
          <p className="text-[15px] font-medium text-on-surface-variant">
            Mừng bạn quay trở lại. Hãy đăng nhập để tiếp tục.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-on-surface-variant tracking-wide ml-1">ĐỊA CHỈ EMAIL</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors duration-300" size={20} strokeWidth={2.5} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-highest/30 border border-outline-variant rounded-2xl py-4 pl-12 pr-6 text-on-surface text-[15px] font-semibold focus:bg-surface-container-lowest focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all duration-300 placeholder-outline"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-on-surface-variant tracking-wide ml-1">MẬT KHẨU</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors duration-300" size={20} strokeWidth={2.5} />
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container-highest/30 border border-outline-variant rounded-2xl py-4 pl-12 pr-16 text-on-surface text-[15px] font-semibold focus:bg-surface-container-lowest focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all duration-300 placeholder-outline"
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary text-[11px] font-bold px-2.5 py-1.5 bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant transition-all"
              >
                {showPassword ? "ẨN" : "HIỆN"}
              </button>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center py-2">
            <button
              type="button"
              className="flex items-center gap-3 group cursor-pointer text-left"
              onClick={() => setRememberMe(!rememberMe)}
            >
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300
                ${rememberMe ? "bg-primary border-primary shadow-md soft-glow-primary" : "bg-surface-container-lowest border-outline-variant group-hover:border-primary/50"}`}
              >
                {rememberMe && <Check size={14} className="text-on-primary" strokeWidth={4} />}
              </div>
              <span className="text-[14px] font-semibold text-on-surface-variant group-hover:text-on-surface transition-colors">Ghi nhớ đăng nhập</span>
            </button>

            <Link to="/forgot-password" className="text-[14px] font-bold text-primary hover:text-primary/80 hover:underline transition-colors">
              Quên mật khẩu?
            </Link>
          </div>

          {error && (
            <div className="bg-error-container border-l-4 border-error rounded-r-xl p-4 flex items-center gap-3 shadow-sm animate-pulse">
              <Activity className="text-error" size={20} />
              <p className="text-on-error-container font-bold text-[13px] leading-normal">{error}</p>
            </div>
          )}

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
                <>Đăng nhập hệ thống <ArrowRight size={18} strokeWidth={3} /></>
              )}
            </span>
          </button>
        </form>

        <div className="text-center mt-10">
          <p className="text-on-surface-variant text-[15px] font-medium">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-primary font-bold hover:underline transition-colors ml-1">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginScreen;
