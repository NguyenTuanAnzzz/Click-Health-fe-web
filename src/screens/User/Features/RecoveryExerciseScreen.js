import React from "react";
import { ArrowLeft, Play, Dumbbell, Zap, Heart, Trophy, Smile, Activity, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserLayout from "../../../layouts/UserLayout";

const RecoveryExerciseScreen = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: "face",
      title: "Face Gym",
      desc: "Cải thiện sự đàn hồi cơ mặt, khôi phục nụ cười tự nhiên với các bài tập biểu cảm trị liệu chuyên sâu.",
      icon: Smile,
      color: "bg-secondary-container/10 text-secondary-container",
      border: "border-secondary-container/20",
      items: ["Cười liên tục 5s", "Thổi khí phồng hai má", "Chuyển động lưỡi tròn"]
    },
    {
      id: "arm",
      title: "Arm Power",
      desc: "Tăng cường độ linh hoạt, khôi phục phản xạ cử động và sức mạnh cho cánh tay bị yếu hoặc co cứng.",
      icon: Dumbbell,
      color: "bg-primary/10 text-primary",
      border: "border-primary/20",
      items: ["Nâng cánh tay robot", "Xoay cổ tay 360 độ", "Bóp bóng cao su phục hồi"]
    },
    {
      id: "balance",
      title: "Balance Master",
      desc: "Lấy lại khả năng giữ thăng bằng cơ thể, kiểm soát trọng tâm khi đứng và di chuyển vững chãi.",
      icon: Activity,
      color: "bg-primary-container/20 text-primary",
      border: "border-primary/20",
      items: ["Đứng thăng bằng một chân", "Đi bộ nối gót thẳng hàng", "Xoay hông nhẹ nhàng"]
    },
    {
      id: "speech",
      title: "Vocal Hero",
      desc: "Luyện phát âm tròn vành rõ chữ, kiểm soát cơ vòm họng và cải thiện chất lượng ngôn ngữ đàm thoại.",
      icon: Mic,
      color: "bg-error/10 text-error",
      border: "border-error/20",
      items: ["Luyện cơ lưỡi phát âm", "Phát âm nguyên âm dài", "Kể các mẩu truyện ngắn"]
    }
  ];

  return (
    <UserLayout noPaddingTop={false}>
      <div className="w-full max-w-[1200px] mx-auto px-6 mt-8 pb-24 bg-surface font-body">
        
        {/* Breadcrumb Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-6 font-bold text-xs uppercase tracking-wider"
        >
          <ArrowLeft size={14} /> Quay lại trang chủ
        </button>

        {/* 2.AG Styled Clinical Header Banner (Midnight Teal card layout) */}
        <div className="relative rounded-[32px] bg-primary text-white p-8 md:p-12 mb-16 overflow-hidden shadow-xl shadow-primary/20">
          <div className="absolute inset-0 pattern-grid-lg opacity-25 pointer-events-none" />
          <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-left">
              <div className="inline-block bg-white/15 text-white border border-white/30 px-4 py-1.5 rounded-full font-bold uppercase tracking-wider text-[10px] mb-6">
                Chương trình Phục hồi Chức năng
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-white tracking-tight mb-4 leading-tight">
                Luyện tập <span className="text-secondary-container">Khắc phục</span>
              </h1>
              <p className="text-white/80 text-[15px] font-medium leading-relaxed max-w-xl">
                Cải thiện khả năng vận động và ngôn ngữ với các bài tập trị liệu tại nhà được thiết kế theo quy chuẩn chuyên gia. Hãy kiên trì mỗi ngày để thấy sự khác biệt rõ rệt.
              </p>
            </div>
            
            {/* Elegant glassmorphic goals card */}
            <div className="w-full max-w-sm bg-white/10 border border-white/20 rounded-[24px] p-6 backdrop-blur-md shadow-2xl">
              <div className="absolute -top-4 -right-4 bg-secondary-container text-primary w-12 h-12 rounded-full flex items-center justify-center border-4 border-primary rotate-12 shadow-lg">
                <Zap size={20} className="fill-primary" />
              </div>
              <div className="space-y-5">
                <div className="flex items-center gap-4 border-b border-white/10 pb-5">
                  <div className="w-10 h-10 bg-white/20 rounded-[12px] flex items-center justify-center text-white">
                    <Trophy size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-extrabold text-white/60 uppercase tracking-wider">Mục tiêu hôm nay</p>
                    <p className="text-[14px] font-extrabold text-white mt-0.5">Hoàn thành 3 bài tập bất kỳ</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-secondary-container/20 rounded-[12px] flex items-center justify-center text-secondary-container">
                    <Heart size={18} className="fill-secondary-container" />
                  </div>
                  <div>
                    <p className="text-[11px] font-extrabold text-secondary-container uppercase tracking-wider">Chuỗi tích lũy</p>
                    <p className="text-[14px] font-extrabold text-white mt-0.5">05 ngày liên tiếp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selection Center Grid */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface font-headline tracking-tight mb-3">
              Lựa chọn kỹ năng rèn luyện
            </h2>
            <div className="w-16 h-1.5 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div 
                  key={cat.id} 
                  className="rounded-[28px] bg-surface border border-outline-variant/60 p-7 flex flex-col justify-between hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-sm group"
                >
                  <div>
                    <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center mb-6 border ${cat.border} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={24} strokeWidth={2.5} />
                    </div>
                    
                    <h3 className="text-xl font-extrabold font-headline text-on-surface mb-3 group-hover:text-primary transition-colors">{cat.title}</h3>
                    <p className="text-on-surface-variant text-[14px] font-medium mb-8 leading-relaxed">
                      {cat.desc}
                    </p>
                    
                    <div className="space-y-3 mb-8">
                      {cat.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 bg-surface-container-lowest px-4 py-3 rounded-xl border border-outline-variant/40 shadow-sm group-hover:border-primary/10 transition-colors">
                          <div className="w-2 h-2 bg-primary rounded-full shrink-0" />
                          <span className="text-[13px] font-extrabold text-on-surface leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full bg-primary text-on-primary py-3.5 rounded-full font-extrabold hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 text-[13px] shadow-lg shadow-primary/20">
                    <Play size={16} className="fill-white" /> Bắt đầu tập
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </UserLayout>
  );
};

export default RecoveryExerciseScreen;
