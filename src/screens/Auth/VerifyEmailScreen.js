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
      <div className="w-full">
        <h2 className="mb-2.5 text-2xl font-semibold text-main">Xác thực email</h2>

        <p className="mb-4.5 text-[14px] leading-5 font-normal text-secondary">
          Nhập mã xác thực gồm 6 số đã được gửi đến email của bạn.
        </p>

        {!!email && (
          <div className="min-h-[54px] rounded-md border border-border/30 bg-neutral flex flex-row items-center px-3.5 mb-5.5">
            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
              <Mail size={18} className="text-primary" />
            </div>
            <span className="ml-2.5 flex-1 text-[14px] font-semibold text-primary">{email}</span>
          </div>
        )}

        <div className={`flex flex-row justify-between mb-4.5 gap-2 ${error ? 'animate-shake' : ''}`}>
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
              className={`w-12 h-14 rounded-md border text-center text-[22px] font-semibold outline-none transition-colors
                ${digit ? "border-primary bg-primary/5 text-primary" : "border-border bg-neutral text-main"}
                ${isExpired ? "bg-gray-100 border-gray-200 text-gray-400" : "focus:border-primary"}`}
            />
          ))}
        </div>

        <div className="flex flex-row items-center justify-center mb-4.5 gap-1.5">
          {isExpired ? <AlertCircle size={16} className="text-danger" /> : <Clock size={16} className="text-primary" />}
          <span className={`text-[13px] font-semibold ${isExpired ? "text-danger" : "text-primary"}`}>
            {isExpired ? "Mã xác thực đã hết hạn" : "Mã hết hạn trong "}
            {!isExpired && <span className="font-bold">{formatTime(timeLeft)}</span>}
          </span>
        </div>

        <Button
          title="Xác thực"
          nameIcon="CheckCircle"
          sizeIcon={18}
          loading={loading}
          disabled={!isOtpFull || isExpired}
          handle={handleVerify}
        />

        {error && <Error title="Xác thực thất bại" desc={error} />}

        <button
          type="button"
          onClick={handleResendCode}
          disabled={!isExpired || loading}
          className={`w-full min-h-[48px] mt-3 rounded-md border flex items-center justify-center transition-colors
            ${isExpired ? "border-primary bg-primary/5 text-primary" : "border-border bg-white text-secondary cursor-not-allowed"}
          `}
        >
          <span className="text-[15px] font-semibold">
            {isExpired ? "Gửi lại mã" : `Gửi lại sau ${formatTime(timeLeft)}`}
          </span>
        </button>
      </div>

      <Footer
        titleLeft="Nhập sai email?"
        titleRight="Đăng ký lại"
        goToLink="/register"
      />
    </AuthLayout>
  );
};

export default VerifyEmailScreen;
