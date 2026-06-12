import React from 'react';
import { Camera, Info, ShieldCheck, Activity, HeartPulse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full overflow-hidden bg-primary pt-32 pb-20 md:pt-40 md:pb-28 px-6 transition-colors">
      {/* 2.AG grid decoration */}
      <div className="absolute inset-0 pattern-grid-lg opacity-35 pointer-events-none" />
      
      {/* Radial glow */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-white/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-white/5 blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 w-full lg:flex lg:items-center lg:justify-between max-w-[1200px] mx-auto gap-12 font-body">
        <div className="w-full lg:w-3/5">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-2 px-3.5 py-1 bg-white/5 border border-white/10 rounded-full">
              <ShieldCheck size={14} className="text-secondary-container" />
              <span className="uppercase tracking-[0.12em] text-[10px] font-bold text-white/90">
                Hệ thống Tầm soát Thông minh AI
              </span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-[54px] text-white mb-6 leading-[1.15] font-extrabold tracking-tight font-headline">
            Tầm soát đột quỵ <br />
            <span className="text-secondary-container">Chính xác & Nhanh chóng</span>
          </h1>
          
          <p className="text-white/70 text-[15px] md:text-[16px] mb-10 max-w-2xl leading-relaxed font-medium">
            Sử dụng trí tuệ nhân tạo tiên tiến để phân tích dấu hiệu và cảnh báo nguy cơ đột quỵ sớm. Click Health mang đến giải pháp y tế số tin cậy cho sức khỏe của bạn và gia đình.
          </p>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            <button 
              onClick={() => navigate('/befast')}
              className="bg-white text-primary text-[15px] py-4 px-8 rounded-full font-bold shadow-md hover:bg-surface-container-lowest hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2.5 animate-bounce-small"
            >
              <Camera size={20} strokeWidth={2.5} />
              BẮT ĐẦU KIỂM TRA
            </button>
            
            <button 
              onClick={() => navigate('/knowledge')}
              className="bg-transparent text-white border-2 border-white/30 text-[15px] py-3.5 px-8 rounded-full font-bold hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2.5"
            >
              <Info size={20} strokeWidth={2.5} />
              TÌM HIỂU THÊM
            </button>
          </div>

          <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Activity className="text-secondary-container" size={16} />
              </div>
              <span className="font-semibold text-white/90 text-[13px]">Kết quả trong 30 giây</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-error/20 flex items-center justify-center border border-error/30">
                <HeartPulse className="text-error" size={16} />
              </div>
              <span className="font-semibold text-white/90 text-[13px]">Cảnh báo tức thì</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <ShieldCheck className="text-secondary-container" size={16} />
              </div>
              <span className="font-semibold text-white/90 text-[13px]">Bảo mật thông tin</span>
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-1/3 relative">
          <div className="relative w-full aspect-[4/5] bg-white/[0.03] border border-white/10 rounded-[32px] shadow-2xl flex items-center justify-center overflow-hidden group">
            {/* Embedded grid decoration */}
            <div className="absolute inset-0 bg-primary/25 pattern-grid-lg opacity-60" />
            
            <div className="text-center p-8 z-10 font-body">
              <div className="w-24 h-24 bg-white/10 border border-white/20 backdrop-blur-md rounded-[20px] flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
                <Camera size={40} className="text-white" strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-extrabold font-headline text-white mb-2 tracking-wide">AI SCANNER</h3>
              <p className="text-white/60 font-medium text-[14px] leading-relaxed">
                Đứng trước camera để<br/>phân tích cử động cơ mặt
              </p>
            </div>
            
            {/* Glowing scanning laser bar */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-secondary-container animate-[scan_2s_ease-in-out_infinite] shadow-[0_0_15px_rgba(122,181,233,0.8)]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
