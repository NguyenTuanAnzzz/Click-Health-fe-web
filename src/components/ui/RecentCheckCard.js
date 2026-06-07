import React from 'react';
import { Activity, User, Calendar, CheckCircle, ChevronRight } from 'lucide-react';

const RecentCheckCard = ({ 
  title = "Lượt kiểm tra mới nhất", 
  code = "#150/2026", 
  step = "2/3", 
  date = "20/05/2026",
  userName = "Người dùng"
}) => {
  return (
    <div className="bg-[#f5f5f5] rounded-xl p-6 h-full flex flex-col justify-between group cursor-pointer relative overflow-hidden border border-[#e5e7eb] transition-all duration-300 hover:bg-[#ececec] hover:border-[#1F75C1]/20 hover:shadow-sm">
      <div className="absolute top-0 left-0 w-1 h-full bg-[#1F75C1]/30 group-hover:bg-[#7AB5E9] transition-colors duration-300" />
      
      <div>
        <div className="flex flex-row justify-between items-start mb-5">
          <div className="flex-1 pr-3">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#1F75C1]/10 text-[#1F75C1] text-[10px] font-bold uppercase tracking-wider mb-2 font-inter-tight-small">
              {title}
            </span>
            <h2 className="text-xl font-bold text-black font-inter-heading tracking-tight mt-1">{code}</h2>
          </div>

          <div className="w-10 h-10 rounded-[10px] bg-white border border-[#e5e7eb] group-hover:bg-[#1F75C1]/10 group-hover:border-[#1F75C1]/10 flex items-center justify-center transition-all duration-300 shadow-sm">
            <Activity size={18} className="text-[#7AB5E9]" />
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="flex flex-row items-center space-x-3">
            <div className="w-7 h-7 rounded bg-white flex items-center justify-center border border-[#e5e7eb]"><User size={13} className="text-[#1F75C1]" /></div>
            <span className="flex-1 text-[13px] font-semibold text-[#151515] font-inter-tight-small">{userName}</span>
          </div>

          <div className="flex flex-row items-center space-x-3">
            <div className="w-7 h-7 rounded bg-white flex items-center justify-center border border-[#e5e7eb]"><Calendar size={13} className="text-[#1F75C1]" /></div>
            <span className="flex-1 text-[13px] font-semibold text-[#151515] font-inter-tight-small">{date}</span>
          </div>

          <div className="flex flex-row items-center space-x-3">
            <div className="w-7 h-7 rounded bg-[#7AB5E9]/10 flex items-center justify-center border border-[#7AB5E9]/20"><CheckCircle size={13} className="text-[#7AB5E9]" /></div>
            <span className="flex-1 text-[13px] font-bold text-[#7AB5E9] font-inter-tight-small">Đã hoàn thành</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[#e5e7eb]/80 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 flex items-center justify-center">
             <div className="absolute inset-0 bg-white rounded-full border border-[#e5e7eb] shadow-sm" />
             <span className="relative text-[10px] font-extrabold text-[#7AB5E9] font-inter-tight-small">
               100%
             </span>
          </div>
          <div>
            <p className="text-[9px] text-[#858585] font-bold uppercase tracking-wider font-inter-tight-small">Tiến trình</p>
            <p className="text-[12px] font-bold text-black font-inter-tight-small">Hoàn tất</p>
          </div>
        </div>

        <div className="w-7 h-7 rounded-full bg-white text-[#1F75C1] group-hover:bg-[#7AB5E9] group-hover:text-white flex items-center justify-center transition-all duration-300 border border-[#e5e7eb] shadow-sm">
          <ChevronRight size={14} />
        </div>
      </div>
    </div>
  );
};

export default RecentCheckCard;
