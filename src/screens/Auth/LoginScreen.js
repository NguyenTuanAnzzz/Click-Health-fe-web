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
    <AuthLayout tagline="Hệ thống tầm soát đột quỵ Click Health">
      <div className="w-full space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-black font-inter tracking-tight mb-1">
            Đăng nhập
          </h2>
          <p className="text-sm font-medium text-[#858585]">
            Đăng nhập tài khoản của bạn để tiếp tục sử dụng dịch vụ.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase text-[#151515] tracking-wider ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#858585]/40 group-focus-within:text-[#2ecea0] transition-colors" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-[#e5e7eb] rounded-full py-3.5 pl-12 pr-6 text-black text-sm font-medium focus:ring-2 focus:ring-[#2ecea0]/20 focus:border-[#2ecea0] outline-none transition-all placeholder-[#999999]"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase text-[#151515] tracking-wider ml-1">Mật khẩu</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#858585]/40 group-focus-within:text-[#2ecea0] transition-colors" size={18} />
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-[#e5e7eb] rounded-full py-3.5 pl-12 pr-12 text-black text-sm font-medium focus:ring-2 focus:ring-[#2ecea0]/20 focus:border-[#2ecea0] outline-none transition-all placeholder-[#999999]"
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#858585]/60 hover:text-[#2ecea0] text-xs font-semibold"
              >
                {showPassword ? "ẨN" : "HIỆN"}
              </button>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center py-1">
            <button
              type="button"
              className="flex items-center gap-2 group cursor-pointer text-left"
              onClick={() => setRememberMe(!rememberMe)}
            >
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all shadow-2xs shrink-0
                ${rememberMe ? "bg-[#2ecea0] border-[#2ecea0]" : "bg-white border-[#e5e7eb] group-hover:border-[#2ecea0]/60"}`}
              >
                {rememberMe && <Check size={12} className="text-white" strokeWidth={3} />}
              </div>
              <span className="text-xs font-medium text-[#858585]">Ghi nhớ đăng nhập</span>
            </button>

            <button type="button" className="text-xs font-semibold text-[#2ecea0] hover:underline transition-colors">
              Quên mật khẩu?
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
              <Activity className="text-red-500" size={18} />
              <p className="text-red-600 font-semibold text-xs leading-normal">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-activation-filled py-4 mt-6 flex items-center justify-center gap-2 text-sm font-semibold tracking-tight shadow-md hover:shadow-lg transition-all"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Đăng nhập <ArrowRight size={16} strokeWidth={2.5} />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-6 border-t border-[#e5e7eb]">
          <p className="text-[#858585] text-sm font-medium">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-[#2ecea0] font-semibold hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginScreen;
