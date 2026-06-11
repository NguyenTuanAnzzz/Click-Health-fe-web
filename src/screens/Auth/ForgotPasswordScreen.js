import React, { useState, useEffect } from "react";
import { Mail, ArrowRight, Activity, ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AuthLayout from "../../layouts/AuthLayout";
import { forgotPassword, clearError } from "../../store/slices/authSlice";

const ForgotPasswordScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const { loading, error } = useSelector((state) => state.auth);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!email) {
      setLocalError("Vui lòng nhập địa chỉ email của bạn.");
      return;
    }

    try {
      const resultAction = await dispatch(forgotPassword({ email }));
      if (forgotPassword.fulfilled.match(resultAction)) {
        // Navigate to reset-password and pass the email in state
        navigate("/reset-password", { state: { email } });
      }
    } catch (err) {
      setLocalError("Đã xảy ra lỗi hệ thống, vui lòng thử lại sau.");
    }
  };

  const displayError = localError || error;

  return (
    <AuthLayout tagline="Khôi phục mật khẩu tài khoản">
      <div className="w-full">
        {/* Back Button */}
        <Link 
          to="/login" 
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#1F75C1] transition-colors mb-6 group"
        >
          <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
          Quay lại Đăng nhập
        </Link>

        <div className="mb-8 text-center lg:text-left">
          <h2 className="text-3xl font-black text-[#111827] font-inter tracking-tight mb-3">
            Quên mật khẩu?
          </h2>
          <p className="text-[15px] font-medium text-gray-500">
            Nhập email đăng ký của bạn. Chúng tôi sẽ gửi mã OTP để bạn đặt lại mật khẩu mới.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                required
              />
            </div>
          </div>

          {displayError && (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4 flex items-center gap-3 shadow-sm">
              <Activity className="text-red-500" size={20} />
              <p className="text-red-600 font-bold text-[13px] leading-normal">{displayError}</p>
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
                <>Gửi mã xác thực <ArrowRight size={18} strokeWidth={3} /></>
              )}
            </span>
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordScreen;
