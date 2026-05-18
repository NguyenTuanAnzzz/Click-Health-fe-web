import React, { useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Smile } from 'lucide-react';
import { analyzeFace } from '../../../store/slices/befastSlice';
import ScanningLayout from '../../../layouts/ScanningLayout';

const FaceScreen = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.befast);
  
  const [imageSrc, setImageSrc] = useState(null);

  const capture = useCallback(() => {
    const capturedImage = webcamRef.current.getScreenshot();
    setImageSrc(capturedImage);
  }, [webcamRef]);

  const retake = () => {
    setImageSrc(null);
  };

  const processImage = async () => {
    if (!imageSrc) return;
    
    try {
      const res = await fetch(imageSrc);
      const blob = await res.blob();
      const file = new File([blob], "face.jpg", { type: "image/jpeg" });
      
      const formData = new FormData();
      formData.append("file", file);

      const resultAction = await dispatch(analyzeFace(formData));
      if (analyzeFace.fulfilled.match(resultAction)) {
        navigate('/befast/arm');
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScanningLayout
      title="F - Face (Khuôn mặt)"
      step="Bước 3/5"
      description="Người bệnh có bị méo miệng, một bên mặt bị xệ xuống không? Yêu cầu người bệnh cười hoặc nhe răng trước camera."
      icon={Smile}
      imageSrc={imageSrc}
      webcamRef={webcamRef}
      capture={capture}
      retake={retake}
      processImage={processImage}
      loading={loading}
      error={error}
      buttonText="Quét khuôn mặt"
      facingMode="user"
    />
  );
};

export default FaceScreen;
