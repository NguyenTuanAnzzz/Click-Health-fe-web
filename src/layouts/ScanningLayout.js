import React, { useEffect, useState } from 'react';
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
    <div className="bg-surface border border-border rounded-lg p-6 shadow-sm max-w-5xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-label text-tertiary bg-neutral px-2 py-1 rounded-sm uppercase mb-2 inline-block">
            {step}
          </span>
          <h2 className="text-h1 text-primary text-2xl flex items-center gap-2">
            <Icon size={24} className="text-tertiary" />
            {title}
          </h2>
        </div>
      </div>
      
      <p className="text-body text-secondary mb-6 text-lg">
        {description}
      </p>

      <div className="relative w-full aspect-video bg-neutral rounded-lg overflow-hidden border-2 border-border mb-6 flex flex-col items-center justify-center shadow-inner">
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
            
            {/* Scanning Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="animate-scan" />
              
              {/* Status Header */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                <div className="bg-tertiary/80 text-white text-sm px-4 py-2 rounded-sm flex items-center gap-3 backdrop-blur-md font-bold tracking-wider border border-white/20">
                  <div className={`w-3 h-3 rounded-full ${isAutoScanning ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`} />
                  {isAutoScanning ? 'HỆ THỐNG ĐANG QUÉT TỰ ĐỘNG...' : 'CHẾ ĐỘ CHỜ QUÉT'}
                </div>
                
                {isAutoScanning && (
                  <div className="bg-black/50 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                    ĐANG PHÂN TÍCH CHUYỂN ĐỘNG
                  </div>
                )}
              </div>

              {/* Countdown Overlay */}
              {countdown !== null && countdown > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="text-[12rem] font-bold text-white drop-shadow-2xl animate-bounce">
                    {countdown}
                  </div>
                </div>
              )}

              {/* Viewfinder Brackets */}
              <div className="absolute inset-0 border-[30px] border-tertiary/5 pointer-events-none" />
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-tertiary m-8" />
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-tertiary m-8" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-tertiary m-8" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-tertiary m-8" />
              
              {/* Center Target */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-tertiary/20 rounded-full animate-ping" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-tertiary rounded-full shadow-[0_0_10px_var(--color-tertiary)]" />
            </div>
          </>
        )}
      </div>

      {error && <p className="text-red-500 text-sm font-medium mb-4 text-center bg-red-50 py-3 rounded-md border border-red-100">{error}</p>}

      <div className="flex justify-center gap-6">
        {!imageSrc ? (
          <button 
            onClick={capture}
            disabled={isAutoScanning}
            className={`flex items-center gap-3 px-12 py-5 rounded-md text-xl font-bold transition-all transform hover:scale-105 shadow-xl ${
              isAutoScanning 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-tertiary text-on-primary hover:bg-opacity-90'
            }`}
          >
            {isAutoScanning ? (
              <>
                <Square size={28} fill="currentColor" />
                ĐANG QUÉT...
              </>
            ) : (
              <>
                <Play size={28} fill="currentColor" />
                {buttonText}
              </>
            )}
          </button>
        ) : (
          <>
            <button 
              onClick={retake}
              disabled={loading}
              className="flex items-center gap-2 bg-surface border-2 border-border text-secondary px-8 py-4 rounded-md text-lg font-bold hover:bg-neutral transition-colors disabled:opacity-50"
            >
              <RefreshCw size={24} />
              Quét lại
            </button>
            <button 
              onClick={processImage}
              disabled={loading}
              className="flex items-center gap-2 bg-tertiary text-on-primary px-12 py-4 rounded-md text-lg font-bold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Phân tích kết quả
                  <ChevronRight size={24} />
                </>
              )}
            </button>
          </>
        )}
      </div>
      
      {!imageSrc && !isAutoScanning && (
        <p className="mt-6 text-center text-secondary font-medium italic">
          * Sau khi nhấn bắt đầu, hệ thống sẽ tự động đếm ngược 5 giây để bạn đứng vào vị trí.
        </p>
      )}
    </div>
  );
};

export default ScanningLayout;
