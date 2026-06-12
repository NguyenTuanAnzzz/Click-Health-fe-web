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
    <div className="bg-white rounded-[32px] p-7 md:p-8 h-full flex flex-col justify-between group cursor-pointer relative overflow-hidden border border-outline-variant/40 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(31,117,193,0.1)] hover:-translate-y-2 hover:border-primary/30">
      {/* Decorative background glows */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-[40px] group-hover:bg-primary/20 transition-colors duration-700 pointer-events-none" />
      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary/30 to-secondary-container group-hover:from-primary group-hover:to-primary transition-all duration-500" />
      
      <div className="relative z-10">
        <div className="flex flex-row justify-between items-start mb-8">
          <div className="flex-1 pl-4">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-3 font-body shadow-sm">
              {title}
            </span>
            <h2 className="text-3xl font-black text-[#1E293B] font-headline tracking-tight">{code}</h2>
          </div>

          <div className="w-16 h-16 rounded-[22px] bg-primary/5 border border-primary/20 group-hover:bg-primary group-hover:border-primary flex items-center justify-center transition-all duration-500 shadow-sm group-hover:shadow-primary/30 group-hover:rotate-12 group-hover:scale-110">
            <Activity size={28} className="text-primary group-hover:text-white transition-colors duration-500" />
          </div>
        </div>

        <div className="space-y-4 pl-4">
          <div className="flex flex-row items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] flex items-center justify-center border border-slate-200 group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
              <User size={18} className="text-slate-500" />
            </div>
            <span className="flex-1 text-[15px] font-bold text-[#1E293B]">{userName}</span>
          </div>

          <div className="flex flex-row items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] flex items-center justify-center border border-slate-200 group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
              <Calendar size={18} className="text-slate-500" />
            </div>
            <span className="flex-1 text-[15px] font-bold text-[#1E293B]">{date}</span>
          </div>

          <div className="flex flex-row items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center border border-green-200">
              <CheckCircle size={18} className="text-green-500" />
            </div>
            <span className="flex-1 text-[15px] font-bold text-green-600">Đã hoàn thành</span>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-slate-100 flex flex-row items-center justify-between pl-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 flex items-center justify-center">
             <div className="absolute inset-0 bg-blue-50 rounded-full border border-blue-100 shadow-inner" />
             <div className="absolute inset-0 rounded-full border-[3px] border-primary border-t-transparent -rotate-45" />
             <span className="relative text-[13px] font-black text-primary">
               100%
             </span>
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-1 font-body">Tiến trình</p>
            <p className="text-[16px] font-extrabold text-[#1E293B] font-headline">Hoàn tất</p>
          </div>
        </div>

        <div className="w-12 h-12 rounded-full bg-[#F8FAFC] text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all duration-500 shadow-sm group-hover:shadow-primary/40 group-hover:scale-110 border border-slate-200 group-hover:border-primary">
          <ChevronRight size={20} strokeWidth={3} />
        </div>
      </div>
    </div>
  );
};

export default RecentCheckCard;
