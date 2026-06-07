import React, { useRef, useState, useEffect } from "react";
import { Feather, AlertCircle, Clock, CheckCircle, Mail } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/ui/Button";
import Footer from "../../components/ui/Footer";
import Error from "../../components/ui/Error";
import { verifyOtp, resendOtp } from "../../store/slices/authSlice";

const OTP_EXPIRE_TIME = 60;

const VerifyEmailScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading, error, isOtpVerified, user } = useSelector((state) => state.auth);

  const email = location.state?.email || user?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(OTP_EXPIRE_TIME);

  const inputsRef = useRef([]);
  const hasAutoVerified = useRef(false);

  const otpValue = otp.join("");
  const isOtpFull = otpValue.length === 6;
  const isExpired = timeLeft <= 0;

  useEffect(() => {
    const focusTimer = setTimeout(() => {
      inputsRef.current[0]?.focus();
    }, 300);

    return () => clearTimeout(focusTimer);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (isOtpVerified) {
      navigate("/login");
    }
  }, [isOtpVerified, navigate]);

  useEffect(() => {
    if (
      isOtpFull &&
      email &&
      !isExpired &&
      !loading &&
      !hasAutoVerified.current
    ) {
      hasAutoVerified.current = true;
      handleVerify();
    }

    if (!isOtpFull) {
      hasAutoVerified.current = false;
    }
  }, [isOtpFull, email, isExpired, loading]);

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

  const handleVerify = () => {
    if (!email || !isOtpFull || isExpired || loading) return;

    dispatch(
      verifyOtp({
        email,
        otp: otpValue,
      })
    );
  };

  const handleResendCode = () => {
    if (timeLeft > 0 || loading || !email) return;

    dispatch(resendOtp({ email }));

    setOtp(["", "", "", "", "", ""]);
    setTimeLeft(OTP_EXPIRE_TIME);
    hasAutoVerified.current = false;

    setTimeout(() => {
      inputsRef.current[0]?.focus();
    }, 100);
  };

  return (
    <AuthLayout tagline="Xác thực tài khoản của bạn">
      <div className="w-full space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-black font-inter tracking-tight mb-1">
            Xác thực email
          </h2>
          <p className="text-sm font-medium text-[#858585]">
            Nhập mã xác thực gồm 6 số đã được gửi đến email của bạn.
          </p>
        </div>

        {!!email && (
          <div className="min-h-[50px] rounded-full border border-[#e5e7eb] bg-[#f0f1f2] flex flex-row items-center px-4 mb-4 shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-[#7AB5E9]/15 flex items-center justify-center">
              <Mail size={16} className="text-[#7AB5E9]" />
            </div>
            <span className="ml-3 flex-1 text-sm font-semibold text-[#1F75C1]">{email}</span>
          </div>
        )}

        <div className={`flex flex-row justify-between mb-4 gap-2 ${error ? 'animate-shake' : ''}`}>
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
              className={`w-11 h-14 rounded-xl border text-center text-[22px] font-semibold outline-none transition-all duration-300
                ${digit ? "border-[#7AB5E9] bg-[#7AB5E9]/5 text-[#7AB5E9]" : "border-[#e5e7eb] bg-[#f0f1f2]/40 text-black"}
                ${isExpired ? "bg-gray-100 border-gray-200 text-gray-400" : "focus:border-[#7AB5E9] focus:ring-2 focus:ring-[#7AB5E9]/10"}`}
            />
          ))}
        </div>

        <div className="flex flex-row items-center justify-center mb-6 gap-2">
          {isExpired ? <AlertCircle size={16} className="text-red-500 animate-pulse" /> : <Clock size={16} className="text-[#7AB5E9]" />}
          <span className={`text-xs font-semibold ${isExpired ? "text-red-600" : "text-[#7AB5E9]"}`}>
            {isExpired ? "Mã xác thực đã hết hạn" : "Mã hết hạn trong "}
            {!isExpired && <span className="font-bold">{formatTime(timeLeft)}</span>}
          </span>
        </div>

        <Button
          title="Xác thực tài khoản"
          nameIcon="CheckCircle"
          sizeIcon={16}
          loading={loading}
          disabled={!isOtpFull || isExpired}
          handle={handleVerify}
        />

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 mt-4">
            <AlertCircle className="text-red-500" size={18} />
            <p className="text-red-600 font-semibold text-xs leading-normal">{error}</p>
          </div>
        )}

        <button
          type="button"
          onClick={handleResendCode}
          disabled={!isExpired || loading}
          className={`w-full min-h-[44px] mt-4 rounded-full border flex items-center justify-center transition-all text-xs font-semibold
            ${isExpired 
              ? "border-[#7AB5E9] bg-[#7AB5E9]/5 text-[#7AB5E9] hover:bg-[#7AB5E9]/10 cursor-pointer" 
              : "border-[#e5e7eb] bg-white text-[#858585] cursor-not-allowed"}`}
        >
          <span>
            {isExpired ? "Gửi lại mã xác thực" : `Gửi lại mã sau ${formatTime(timeLeft)}`}
          </span>
        </button>
      </div>

      <Footer
        titleLeft="Nhập sai email?"
        titleRight="Đăng ký lại"
        goToLink="/register"
        className="mt-6 pt-4 border-t border-[#e5e7eb]/60"
      />
    </AuthLayout>
  );
};

export default VerifyEmailScreen;
