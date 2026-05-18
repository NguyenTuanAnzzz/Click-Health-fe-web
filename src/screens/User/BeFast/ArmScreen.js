import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserCircle2 } from 'lucide-react';
import { analyzeArm } from '../../../store/slices/befastSlice';
import ScanningLayout from '../../../layouts/ScanningLayout';

const ArmScreen = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.befast);
  
  const [imageSrc, setImageSrc] = useState(null);
  const [isAutoScanning, setIsAutoScanning] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const startAutoScan = () => {
    setIsAutoScanning(true);
    setCountdown(5);
  };

  useEffect(() => {
    let timer;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      capture();
      setCountdown(null);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const capturedImage = webcamRef.current.getScreenshot();
      setImageSrc(capturedImage);
      setIsAutoScanning(false);
    }
  }, [webcamRef]);

  const retake = () => {
    setImageSrc(null);
    setIsAutoScanning(false);
    setCountdown(null);
  };

  const processImage = async () => {
    if (!imageSrc) return;
    
    try {
      const res = await fetch(imageSrc);
      const blob = await res.blob();
      const file = new File([blob], "arm.jpg", { type: "image/jpeg" });
      
      const formData = new FormData();
      formData.append("file", file);

      const resultAction = await dispatch(analyzeArm(formData));
      if (analyzeArm.fulfilled.match(resultAction)) {
        navigate('/befast/speech');
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScanningLayout
      title="A - Arm (Cánh tay)"
      step="Bước 4/5"
      description="Yêu cầu người bệnh đứng lùi lại và giơ cả 2 tay lên cao cùng lúc. Nhấn bắt đầu để hệ thống tự động quét sau 5 giây."
      icon={UserCircle2}
      imageSrc={imageSrc}
      webcamRef={webcamRef}
      capture={startAutoScan}
      retake={retake}
      processImage={processImage}
      loading={loading}
      error={error}
      buttonText="Bắt đầu đếm ngược quét"
      isAutoScanning={isAutoScanning}
      countdown={countdown}
    />
  );
};

export default ArmScreen;
