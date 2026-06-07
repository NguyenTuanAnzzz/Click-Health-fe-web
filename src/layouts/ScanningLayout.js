import React from 'react';
import { Camera, RefreshCw, ChevronRight, Play, Square } from 'lucide-react';
import Webcam from 'react-webcam';

const ScanningLayout = ({ 
  title, 
  step, 
  description, 
  icon: Icon, 
  imageSrc, 
  webcamRef, 
  capture, 
  retake, 
  processImage, 
  loading, 
  error,
  buttonText = "Bắt đầu quét",
  facingMode = "environment",
  isAutoScanning = false,
  countdown = null
}) => {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[24px] p-6 md:p-8 max-w-4xl mx-auto shadow-sm transition-all duration-300">
      
      {/* Step Header */}
      <div className="mb-6 flex items-center justify-between font-inter-tight-small">
        <div>
          <span className="bg-[#1F75C1]/10 text-[#1F75C1] border border-[#1F75C1]/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2.5 inline-block">
            {step}
          </span>
          <h2 className="text-2xl font-bold font-inter text-black flex items-center gap-2.5">
            <Icon size={22} className="text-[#7AB5E9]" />
            {title}
          </h2>
        </div>
      </div>
      
      <p className="text-[#858585] text-[14px] font-semibold mb-6 font-inter-tight-small leading-relaxed">
        {description}
      </p>

      {/* Futuristic Live Viewfinder Camera Box */}
      <div className="relative w-full aspect-video bg-[#f0f1f2] rounded-[20px] overflow-hidden border border-[#1F75C1]/15 mb-8 flex flex-col items-center justify-center shadow-xs">
        {imageSrc ? (
          <img src={imageSrc} alt="Captured" className="w-full h-full object-cover" />
        ) : (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode, aspectRatio: 1.7777777778 }}
              className={`w-full h-full object-cover ${facingMode === 'user' ? 'transform scale-x-[-1]' : ''}`}
            />
            
            {/* Scientific AI Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              
              {/* Scanline Laser Overlay */}
              <div className="animate-scan" />
              
              {/* Top Viewport Header */}
              <div className="absolute top-5 left-5 right-5 flex justify-between items-start font-inter-tight-small">
                <div className="bg-[#1F75C1]/85 text-white text-[11px] px-3.5 py-1.5 rounded-full flex items-center gap-2.5 backdrop-blur-md font-bold tracking-wider border border-white/10 shadow-md">
                  <div className={`w-2.5 h-2.5 rounded-full ${isAutoScanning ? 'bg-[#d32f2f] animate-pulse' : 'bg-[#999999]'}`} />
                  {isAutoScanning ? 'HỆ THỐNG ĐANG PHÂN TÍCH...' : 'CHẾ ĐỘ CHỜ SCAN'}
                </div>
                
                {isAutoScanning && (
                  <div className="bg-[#7AB5E9]/90 text-white text-[10px] px-3 py-1 rounded-full backdrop-blur-md border border-white/10 flex items-center gap-2 font-bold uppercase tracking-wider">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                    Analyzing motions
                  </div>
                )}
              </div>

              {/* Countdown Counter */}
              {countdown !== null && countdown > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-3xs">
                  <div className="text-[10rem] font-bold text-[#7AB5E9] drop-shadow-2xl animate-pulse font-inter">
                    {countdown}
                  </div>
                </div>
              )}

              {/* High-tech Viewfinder corner brackets */}
              <div className="absolute inset-0 border-[20px] border-white/[0.02] pointer-events-none" />
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#7AB5E9] m-6" />
              <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#7AB5E9] m-6" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[#7AB5E9] m-6" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#7AB5E9] m-6" />
              
              {/* Circular Reticle Target */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[#7AB5E9]/20 rounded-full animate-pulse" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#7AB5E9] rounded-full shadow-[0_0_8px_#7AB5E9]" />
            </div>
          </>
        )}
      </div>

      {error && (
        <p className="text-[#d32f2f] text-sm font-semibold mb-6 text-center bg-red-50 py-3.5 rounded-xl border border-red-100 font-inter-tight-small">
          {error}
        </p>
      )}

      {/* Custom Control Triggers */}
      <div className="flex justify-center gap-4 font-inter-tight-small">
        {!imageSrc ? (
          <button 
            onClick={capture}
            disabled={isAutoScanning}
            className={`flex items-center gap-2.5 px-10 py-4 rounded-full text-[14px] font-bold transition-all duration-300 shadow-md ${
              isAutoScanning 
              ? 'bg-[#d32f2f] text-white animate-pulse' 
              : 'bg-[#7AB5E9] text-white hover:bg-[#5CA5E4] hover:scale-[1.01] hover:shadow-[#7AB5E9]/15'
            }`}
          >
            {isAutoScanning ? (
              <>
                <Square size={16} className="fill-white" />
                ĐANG CHUẨN BỊ QUÉT...
              </>
            ) : (
              <>
                <Play size={16} className="fill-white" />
                {buttonText}
              </>
            )}
          </button>
        ) : (
          <>
            <button 
              onClick={retake}
              disabled={loading}
              className="flex items-center gap-2 bg-white border border-[#e5e7eb] text-[#1F75C1] px-8 py-3.5 rounded-full text-[14px] font-bold hover:bg-[#f0f1f2] transition-colors duration-300 disabled:opacity-50 shadow-sm"
            >
              <RefreshCw size={16} />
              Quét lại
            </button>
            <button 
              onClick={processImage}
              disabled={loading}
              className="flex items-center gap-2 bg-[#7AB5E9] text-white px-10 py-3.5 rounded-full text-[14px] font-bold hover:bg-[#5CA5E4] hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 shadow-md shadow-[#7AB5E9]/15"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Phân tích kết quả
                  <ChevronRight size={18} strokeWidth={2.5} />
                </>
              )}
            </button>
          </>
        )}
      </div>
      
      {!imageSrc && !isAutoScanning && (
        <p className="mt-5 text-center text-[#858585] font-semibold text-xs italic font-inter-tight-small">
          * Sau khi nhấn bắt đầu, hệ thống sẽ tự động đếm ngược 5 giây để bạn chuẩn bị vị trí chụp ổn định.
        </p>
      )}
    </div>
  );
};

export default ScanningLayout;
