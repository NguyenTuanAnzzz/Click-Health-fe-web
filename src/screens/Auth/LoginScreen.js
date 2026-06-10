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
      <div className="w-full">
        <div className="mb-10 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-black text-[#111827] font-inter tracking-tight mb-3">
            Đăng nhập
          </h2>
          <p className="text-[15px] font-medium text-gray-500">
            Mừng bạn quay trở lại. Hãy đăng nhập để tiếp tục.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-gray-700 tracking-wide ml-1">ĐỊA CHỈ EMAIL</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1F75C1] transition-colors duration-300" size={20} strokeWidth={2.5} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F8FAFC] border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 text-gray-900 text-[15px] font-semibold focus:bg-white focus:border-[#1F75C1] focus:ring-4 focus:ring-[#1F75C1]/10 outline-none transition-all duration-300 placeholder-gray-400"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-bold text-gray-700 tracking-wide ml-1">MẬT KHẨU</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1F75C1] transition-colors duration-300" size={20} strokeWidth={2.5} />
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F8FAFC] border-2 border-transparent rounded-2xl py-4 pl-12 pr-16 text-gray-900 text-[15px] font-semibold focus:bg-white focus:border-[#1F75C1] focus:ring-4 focus:ring-[#1F75C1]/10 outline-none transition-all duration-300 placeholder-gray-400"
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1F75C1] text-[11px] font-bold px-2.5 py-1.5 bg-white rounded-lg shadow-sm border border-gray-100 transition-all"
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
                ${rememberMe ? "bg-[#1F75C1] border-[#1F75C1] shadow-md shadow-[#1F75C1]/30" : "bg-[#F8FAFC] border-gray-200 group-hover:border-[#1F75C1]/50"}`}
              >
                {rememberMe && <Check size={14} className="text-white" strokeWidth={4} />}
              </div>
              <span className="text-[14px] font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">Ghi nhớ đăng nhập</span>
            </button>

            <Link to="/forgot-password" className="text-[14px] font-bold text-[#1F75C1] hover:text-[#155A96] hover:underline transition-colors">
              Quên mật khẩu?
            </Link>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4 flex items-center gap-3 shadow-sm animate-pulse">
              <Activity className="text-red-500" size={20} />
              <p className="text-red-600 font-bold text-[13px] leading-normal">{error}</p>
            </div>
          )}

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
                <>Đăng nhập hệ thống <ArrowRight size={18} strokeWidth={3} /></>
              )}
            </span>
          </button>
        </form>

        <div className="text-center mt-10">
          <p className="text-gray-500 text-[15px] font-medium">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-[#1F75C1] font-black hover:text-[#155A96] hover:underline transition-colors ml-1">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginScreen;
