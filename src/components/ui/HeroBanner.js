import React from 'react';
import { Camera, Info, ShieldCheck, Activity, HeartPulse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full overflow-hidden bg-white pt-32 pb-16 md:pt-40 md:pb-24 px-4 md:px-8 lg:px-12 transition-colors border-b border-border/10">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-neutral/50 -skew-x-12 transform translate-x-1/4 -z-0" />
      
      <div className="relative z-10 w-full lg:flex lg:items-center lg:justify-between max-w-[1600px] mx-auto">
        <div className="w-full lg:w-3/5">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-sm">
              <ShieldCheck size={16} className="text-primary" />
              <span className="uppercase tracking-[0.1em] text-[0.72rem] font-semibold text-primary">Hệ thống Tầm soát Thông minh</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6.5xl text-main mb-8 leading-[1.1] font-medium tracking-tight">
            Tầm soát đột quỵ <br />
            <span className="text-primary">Chính xác & Nhanh chóng</span>
          </h1>
          
          <p className="text-secondary text-lg md:text-xl mb-12 max-w-2xl leading-relaxed font-normal">
            Sử dụng trí tuệ nhân tạo tiên tiến để phân tích dấu hiệu và cảnh báo nguy cơ đột quỵ sớm. Click Health mang đến giải pháp y tế số tin cậy cho mọi nhà.
          </p>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <button 
              onClick={() => navigate('/befast')}
              className="bg-primary text-white text-lg py-4 px-8 rounded-md font-semibold shadow-sm hover:bg-primary-dark transition-colors flex items-center justify-center gap-3"
            >
              <Camera size={24} />
              BẮT ĐẦU KIỂM TRA
            </button>
            
            <button 
              onClick={() => navigate('/knowledge')}
              className="bg-white text-primary border border-primary text-lg py-4 px-8 rounded-md font-semibold hover:bg-neutral transition-colors flex items-center justify-center gap-3"
            >
              <Info size={24} />
              TÌM HIỂU THÊM
            </button>
          </div>

          <div className="flex flex-wrap gap-8 pt-8 border-t border-border/20">
            <div className="flex items-center space-x-3">
              <Activity className="text-primary" size={20} />
              <span className="font-semibold text-main text-sm">Kết quả trong 30 giây</span>
            </div>
            <div className="flex items-center space-x-3">
              <HeartPulse className="text-danger" size={20} />
              <span className="font-semibold text-main text-sm">Cảnh báo tức thì</span>
            </div>
            <div className="flex items-center space-x-3">
              <ShieldCheck className="text-info" size={20} />
              <span className="font-semibold text-main text-sm">Bảo mật thông tin</span>
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-1/3 relative">
          <div className="relative w-full aspect-[4/5] bg-white border border-border/30 rounded-lg shadow-lg flex items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-neutral/30 pattern-grid-lg opacity-40" />
            <div className="text-center p-8 z-10">
              <div className="w-24 h-24 bg-primary rounded-md flex items-center justify-center mx-auto mb-8 shadow-md">
                <Camera size={48} className="text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-main mb-4">AI SCANNER</h3>
              <p className="text-secondary font-normal text-md">Đứng trước camera để <br/> phân tích dấu hiệu</p>
            </div>
            
            <div className="absolute top-0 left-0 w-full h-1 bg-primary/30 animate-scan" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
