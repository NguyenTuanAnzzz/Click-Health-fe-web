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
      <div className="w-full space-y-8">
        <h2 className="text-2xl font-semibold text-main border-b border-border/10 pb-4">
          Đăng <span className="text-primary">Nhập</span>
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-secondary tracking-wider ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral border border-border/40 rounded-md py-3.5 pl-11 pr-4 text-main font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-secondary tracking-wider ml-1">Mật khẩu</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/40 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral border border-border/40 rounded-md py-3.5 pl-11 pr-4 text-main font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary/40 hover:text-primary text-xs font-semibold"
              >
                {showPassword ? "ẨN" : "HIỆN"}
              </button>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center py-2">
            <button
              type="button"
              className="flex items-center gap-2 group cursor-pointer"
              onClick={() => setRememberMe(!rememberMe)}
            >
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all
                ${rememberMe ? "bg-primary border-primary" : "bg-neutral border-border"}`}
              >
                {rememberMe && <Check size={12} className="text-white" strokeWidth={3} />}
              </div>
              <span className="text-xs font-medium text-secondary">Ghi nhớ đăng nhập</span>
            </button>

            <button type="button" className="text-xs font-semibold text-primary uppercase tracking-wider hover:text-primary-dark transition-colors">
              Quên mật khẩu?
            </button>
          </div>

          {error && (
            <div className="bg-danger/5 border border-danger/20 rounded-md p-4 flex items-center gap-3">
              <Activity className="text-danger" size={20} />
              <p className="text-danger font-semibold text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white text-lg py-4 mt-4 rounded-md font-semibold shadow-md hover:bg-primary-dark transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                ĐĂNG NHẬP <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-6 border-t border-border/10">
          <p className="text-secondary font-medium text-sm">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginScreen;
