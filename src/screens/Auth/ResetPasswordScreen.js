import React, { useRef, useState, useEffect } from "react";
import { Mail, KeyRound, AlertCircle, Clock, CheckCircle, Activity, ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AuthLayout from "../../layouts/AuthLayout";
import { resetPassword, forgotPassword, clearError } from "../../store/slices/authSlice";

const OTP_EXPIRE_TIME = 300; // 5 minutes

const ResetPasswordScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);
  const email = location.state?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [timeLeft, setTimeLeft] = useState(OTP_EXPIRE_TIME);
  const [localError, setLocalError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const inputsRef = useRef([]);

  const otpValue = otp.join("");
  const isOtpFull = otpValue.length === 6;
  const isExpired = timeLeft <= 0;

  useEffect(() => {
    dispatch(clearError());
    // Focus first input automatically
    const focusTimer = setTimeout(() => {
      inputsRef.current[0]?.focus();
    }, 300);
    return () => clearTimeout(focusTimer);
  }, [dispatch]);

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // If email is missing, redirect back to forgot-password
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const handleChangeOtp = (text, index) => {
    if (isExpired || loading) return;

    const sanitizedValue = text.replace(/[^0-9]/g, "");

    if (sanitizedValue.length > 1) {
      const digits = sanitizedValue.slice(0, 6).split("");

      setOtp((prev) => {
        const next = [...prev];
        digits.forEach((digit, i) => {
          next[i] = digit;
        });
        return next;
      });

      const nextIndex = Math.min(digits.length, 5);
      inputsRef.current[nextIndex]?.focus();
      return;
    }

    setOtp((prev) => {
      const next = [...prev];
      next[index] = sanitizedValue;
      return next;
    });

    if (sanitizedValue && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    setSuccessMessage("");

    if (!isOtpFull) {
      setLocalError("Vui lòng nhập đầy đủ mã xác thực OTP 6 số.");
      return;
    }

    if (newPassword.length < 6) {
      setLocalError("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setLocalError("Xác nhận mật khẩu mới không khớp.");
      return;
    }

    try {
      const resultAction = await dispatch(
        resetPassword({
          email,
          otp: otpValue,
          newPassword,
        })
      );

      if (resetPassword.fulfilled.match(resultAction)) {
        setSuccessMessage("Đặt lại mật khẩu thành công! Đang chuyển hướng về trang đăng nhập...");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      setLocalError("Đã xảy ra lỗi hệ thống, vui lòng thử lại sau.");
    }
  };

  const handleResendOtp = async () => {
    if (timeLeft > 0 || loading || !email) return;

    try {
      const resultAction = await dispatch(forgotPassword({ email }));
      if (forgotPassword.fulfilled.match(resultAction)) {
        setOtp(["", "", "", "", "", ""]);
        setTimeLeft(OTP_EXPIRE_TIME);
        setLocalError("");
        setSuccessMessage("Mã OTP mới đã được gửi thành công!");
        setTimeout(() => {
          inputsRef.current[0]?.focus();
        }, 100);
      }
    } catch (err) {
      setLocalError("Không thể gửi lại mã OTP, vui lòng thử lại.");
    }
  };

  const displayError = localError || error;

  return (
    <AuthLayout tagline="Đặt lại mật khẩu mới">
      <div className="w-full space-y-6">
        {/* Back link */}
        <Link 
          to="/forgot-password" 
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#1F75C1] transition-colors mb-2 group"
        >
          <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
          Quay lại email
        </Link>

        <div>
          <h2 className="text-3xl font-black text-[#111827] font-inter tracking-tight mb-2">
            Đặt lại mật khẩu
          </h2>
          <p className="text-sm font-medium text-gray-500">
            Chúng tôi đã gửi mã xác thực đến email của bạn. Nhập mã OTP và mật khẩu mới của bạn ở bên dưới.
          </p>
        </div>

        {/* Display Destination Email */}
        {!!email && (
          <div className="min-h-[50px] rounded-2xl border border-gray-200 bg-gray-50 flex flex-row items-center px-4 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-[#1F75C1]/10 flex items-center justify-center">
              <Mail size={16} className="text-[#1F75C1]" />
            </div>
            <span className="ml-3 flex-1 text-sm font-semibold text-[#1F75C1] truncate">{email}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 6 Digit OTP Inputs */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-gray-700 tracking-wide ml-1">MÃ XÁC THỰC (OTP)</label>
            <div className="flex flex-row justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(ref) => {
                    inputsRef.current[index] = ref;
                  }}
                  value={digit}
                  onChange={(e) => handleChangeOtp(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  disabled={isExpired || loading}
                  className={`w-12 h-14 rounded-2xl border-2 text-center text-[22px] font-bold outline-none transition-all duration-300
                    ${digit ? "border-[#1F75C1] bg-[#1F75C1]/5 text-[#1F75C1]" : "border-transparent bg-[#F8FAFC] text-gray-900"}
                    ${isExpired ? "bg-gray-100 border-gray-200 text-gray-400" : "focus:border-[#1F75C1] focus:ring-4 focus:ring-[#1F75C1]/10"}`}
                />
              ))}
            </div>
          </div>

          {/* OTP Countdown */}
          <div className="flex flex-row items-center justify-center gap-2 py-1">
            {isExpired ? (
              <AlertCircle size={16} className="text-red-500 animate-pulse" />
            ) : (
              <Clock size={16} className="text-[#1F75C1]" />
            )}
            <span className={`text-xs font-semibold ${isExpired ? "text-red-600" : "text-gray-500"}`}>
              {isExpired ? "Mã xác thực đã hết hạn" : "Mã hết hạn trong "}
              {!isExpired && <span className="font-bold text-[#1F75C1]">{formatTime(timeLeft)}</span>}
            </span>
          </div>

          {/* New Password Input */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-gray-700 tracking-wide ml-1">MẬT KHẨU MỚI</label>
            <div className="relative group">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1F75C1] transition-colors duration-300" size={20} strokeWidth={2.5} />
              <input 
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-[#F8FAFC] border-2 border-transparent rounded-2xl py-4 pl-12 pr-16 text-gray-900 text-[15px] font-semibold focus:bg-white focus:border-[#1F75C1] focus:ring-4 focus:ring-[#1F75C1]/10 outline-none transition-all duration-300 placeholder-gray-400"
                placeholder="••••••••"
                required
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

          {/* Confirm Password Input */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-gray-700 tracking-wide ml-1">XÁC NHẬN MẬT KHẨU MỚI</label>
            <div className="relative group">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1F75C1] transition-colors duration-300" size={20} strokeWidth={2.5} />
              <input 
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#F8FAFC] border-2 border-transparent rounded-2xl py-4 pl-12 pr-16 text-gray-900 text-[15px] font-semibold focus:bg-white focus:border-[#1F75C1] focus:ring-4 focus:ring-[#1F75C1]/10 outline-none transition-all duration-300 placeholder-gray-400"
                placeholder="••••••••"
                required
              />
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1F75C1] text-[11px] font-bold px-2.5 py-1.5 bg-white rounded-lg shadow-sm border border-gray-100 transition-all"
              >
                {showConfirmPassword ? "ẨN" : "HIỆN"}
              </button>
            </div>
          </div>

          {displayError && (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4 flex items-center gap-3 shadow-sm">
              <Activity className="text-red-500" size={20} />
              <p className="text-red-600 font-bold text-[13px] leading-normal">{displayError}</p>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 border-l-4 border-green-500 rounded-r-xl p-4 flex items-center gap-3 shadow-sm">
              <CheckCircle className="text-green-500" size={20} />
              <p className="text-green-600 font-bold text-[13px] leading-normal">{successMessage}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || isExpired}
            className="w-full bg-gradient-to-r from-[#1F75C1] to-[#7AB5E9] py-4 mt-8 rounded-2xl flex items-center justify-center gap-2 text-white text-[16px] font-bold shadow-[0_10px_25px_rgba(31,117,193,0.3)] hover:shadow-[0_15px_35px_rgba(31,117,193,0.4)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 flex items-center gap-2">
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Đang xử lý...</span>
                </div>
              ) : (
                <>Đặt lại mật khẩu <ArrowRight size={18} strokeWidth={3} /></>
              )}
            </span>
          </button>

          {/* Resend OTP button */}
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={!isExpired || loading}
            className={`w-full min-h-[48px] mt-4 rounded-2xl border-2 flex items-center justify-center transition-all text-sm font-bold
              ${isExpired 
                ? "border-[#1F75C1] bg-[#1F75C1]/5 text-[#1F75C1] hover:bg-[#1F75C1]/10 cursor-pointer" 
                : "border-gray-200 bg-white text-gray-400 cursor-not-allowed"}`}
          >
            <span>
              {isExpired ? "Gửi lại mã xác thực" : `Gửi lại mã sau ${formatTime(timeLeft)}`}
            </span>
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordScreen;
