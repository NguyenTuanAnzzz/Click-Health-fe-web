import React, { useEffect } from 'react';
import { ArrowLeft, Check, AlertTriangle } from 'lucide-react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getInfo } from '../store/slices/authSlice';

const BefastLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  // Fetch user info to get free attempts count
  useEffect(() => {
    dispatch(getInfo());
  }, [dispatch]);

  const freeAttemptsLeft = user?.freeAttemptsBefastLeft || 0;
  const hasNoAttempts = freeAttemptsLeft === 0;
  const isLowAttempts = freeAttemptsLeft > 0 && freeAttemptsLeft <= 2;

  const steps = [
    { key: 'balance', label: 'Balance', short: 'B', desc: 'Thăng bằng' },
    { key: 'eyes', label: 'Eyes', short: 'E', desc: 'Thị lực' },
    { key: 'face', label: 'Face', short: 'F', desc: 'Cơ mặt' },
    { key: 'arm', label: 'Arm', short: 'A', desc: 'Cánh tay' },
    { key: 'speech', label: 'Speech', short: 'S', desc: 'Giọng nói' },
    { key: 'result', label: 'Result', short: 'T', desc: 'Kết quả' }
  ];

  // Get current active index
  const getCurrentStepIndex = () => {
    const path = location.pathname.split('/').pop();
    const index = steps.findIndex(s => s.key === path);
    return index !== -1 ? index : 0;
  };

  const currentIdx = getCurrentStepIndex();

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col font-sans overflow-x-hidden transition-colors duration-300">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-[#ffffff]/90 backdrop-blur-md border-b border-[#e5e7eb] py-4 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/')}
              className="w-10 h-10 rounded-full bg-[#f0f1f2] flex items-center justify-center text-[#1F75C1] hover:bg-[#e5e7eb] transition-all mr-4 shadow-2xs"
            >
              <ArrowLeft size={18} strokeWidth={2.5} />
            </button>
            <div>
              <h1 className="text-xl font-bold font-inter text-black tracking-tight leading-none mb-1">
                Tầm soát Đột quỵ <span className="text-[#7AB5E9]">BEFAST</span>
              </h1>
              <p className="text-[11px] font-bold text-[#858585] uppercase tracking-wider font-inter-tight-small">
                Hệ thống AI phân tích cử động lâm sàng
              </p>
            </div>
          </div>

          {/* Glowing BEFAST Stepper */}
          <div className="flex items-center font-inter-tight-small w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <div className="flex items-center gap-2 md:gap-4 pr-4">
              {steps.map((step, idx) => {
                const isCompleted = idx < currentIdx;
                const isActive = idx === currentIdx;
                const isFuture = idx > currentIdx;

                return (
                  <React.Fragment key={step.key}>
                    <div className="flex items-center gap-2 group shrink-0">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[13px] border transition-all duration-500
                          ${isCompleted 
                            ? 'bg-[#7AB5E9] border-[#7AB5E9] text-white shadow-sm' 
                            : isActive 
                            ? 'bg-white border-[#7AB5E9] text-[#7AB5E9] ring-4 ring-[#7AB5E9]/15 shadow-sm' 
                            : 'bg-white border-[#e5e7eb] text-[#999999]'}`}
                      >
                        {isCompleted ? <Check size={14} strokeWidth={3} /> : step.short}
                      </div>
                      
                      <div className="hidden lg:block text-left">
                        <p className={`text-[10px] font-extrabold uppercase tracking-wider leading-none mb-0.5
                          ${isActive ? 'text-[#7AB5E9]' : isCompleted ? 'text-black/80' : 'text-[#999999]'}`}>
                          {step.label}
                        </p>
                        <p className={`text-[11px] font-bold leading-none
                          ${isActive ? 'text-black' : isCompleted ? 'text-[#858585]' : 'text-[#999999]'}`}>
                          {step.desc}
                        </p>
                      </div>
                    </div>

                    {idx < steps.length - 1 && (
                      <div 
                        className={`h-0.5 w-6 md:w-8 transition-colors duration-500 shrink-0
                          ${idx < currentIdx ? 'bg-[#7AB5E9]' : 'bg-[#e5e7eb]'}`} 
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Content Container */}
      <div className="flex-1 bg-[#ffffff]">
        {/* Free Attempts Warning Banner */}
        {hasNoAttempts && (
          <div className="bg-gradient-to-r from-red-50 to-red-100/50 border-b-2 border-red-300 px-6 py-4">
            <div className="max-w-[1200px] mx-auto flex items-start gap-3">
              <AlertTriangle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold text-red-700 mb-1">Bạn đã hết lượt thử miễn phí</p>
                <p className="text-red-600 text-[13px] font-medium">
                  Vui lòng nâng cấp gói VIP để tiếp tục sử dụng tầm soát BEFAST. Đội ngũ chúng tôi sẵn sàng hỗ trợ bạn.
                </p>
              </div>
              <button
                onClick={() => navigate('/pricing')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold text-[12px] hover:bg-red-700 transition-all flex-shrink-0"
              >
                Nâng cấp ngay
              </button>
            </div>
          </div>
        )}

        {isLowAttempts && !hasNoAttempts && (
          <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 border-b-2 border-orange-300 px-6 py-4">
            <div className="max-w-[1200px] mx-auto flex items-start gap-3">
              <AlertTriangle size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold text-orange-700 mb-1">Cảnh báo: Chỉ còn {freeAttemptsLeft} lượt thử miễn phí</p>
                <p className="text-orange-600 text-[13px] font-medium">
                  Sau khi hết lượt, bạn cần nâng cấp gói VIP để tiếp tục sử dụng. Hãy nâng cấp ngay để không bị gián đoạn.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-[1200px] w-full mx-auto px-6 py-12 md:py-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BefastLayout;
