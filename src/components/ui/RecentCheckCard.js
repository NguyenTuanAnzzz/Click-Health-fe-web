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
    <div className="bg-white rounded-lg p-6 h-full flex flex-col justify-between group cursor-pointer relative overflow-hidden border border-border/20 shadow-sm hover:shadow-md transition-all">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
      
      <div>
        <div className="flex flex-row justify-between items-start mb-6">
          <div className="flex-1 pr-3">
            <span className="inline-block px-2 py-0.5 rounded-sm bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-wider mb-3 border border-primary/20">
              {title}
            </span>
            <h2 className="text-2xl font-semibold text-main group-hover:text-primary transition-colors">{code}</h2>
          </div>

          <div className="w-12 h-12 rounded-md bg-neutral border border-border/30 group-hover:bg-primary/10 flex items-center justify-center transition-all shadow-sm">
            <Activity size={24} className="text-primary" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex flex-row items-center space-x-3">
            <div className="w-8 h-8 rounded bg-primary/5 flex items-center justify-center border border-primary/10"><User size={16} className="text-primary" /></div>
            <span className="flex-1 text-sm font-medium text-main">{userName}</span>
          </div>

          <div className="flex flex-row items-center space-x-3">
            <div className="w-8 h-8 rounded bg-primary/5 flex items-center justify-center border border-primary/10"><Calendar size={16} className="text-primary" /></div>
            <span className="flex-1 text-sm font-medium text-main">{date}</span>
          </div>

          <div className="flex flex-row items-center space-x-3">
            <div className="w-8 h-8 rounded bg-green-50 flex items-center justify-center border border-green-100"><CheckCircle size={16} className="text-green-600" /></div>
            <span className="flex-1 text-sm font-semibold text-green-600">Đã hoàn thành</span>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-5 border-t border-border/10 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
             <div className="absolute inset-0 bg-neutral rounded-full border border-border/20" />
             <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-primary">
               100%
             </div>
          </div>
          <div>
            <p className="text-[10px] text-secondary font-semibold uppercase tracking-wider">Tiến trình</p>
            <p className="text-sm font-semibold text-main">Hoàn tất</p>
          </div>
        </div>

        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all shadow-sm">
          <ChevronRight size={18} />
        </div>
      </div>
    </div>
  );
};

export default RecentCheckCard;
