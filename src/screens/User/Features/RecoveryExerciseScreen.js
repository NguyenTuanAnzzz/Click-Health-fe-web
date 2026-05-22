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
      color: "bg-[#2ecea0]/10 text-[#2ecea0]",
      border: "border-[#2ecea0]/25",
      items: ["Cười liên tục 5s", "Thổi khí phồng hai má", "Chuyển động lưỡi tròn"]
    },
    {
      id: "arm",
      title: "Arm Power",
      desc: "Tăng cường độ linh hoạt, khôi phục phản xạ cử động và sức mạnh cho cánh tay bị yếu hoặc co cứng.",
      icon: Dumbbell,
      color: "bg-[#6dddbd]/20 text-[#244d54]",
      border: "border-[#6dddbd]/30",
      items: ["Nâng cánh tay robot", "Xoay cổ tay 360 độ", "Bóp bóng cao su phục hồi"]
    },
    {
      id: "balance",
      title: "Balance Master",
      desc: "Lấy lại khả năng giữ thăng bằng cơ thể, kiểm soát trọng tâm khi đứng và di chuyển vững chãi.",
      icon: Activity,
      color: "bg-[#244d54]/10 text-[#244d54]",
      border: "border-[#244d54]/20",
      items: ["Đứng thăng bằng một chân", "Đi bộ nối gót thẳng hàng", "Xoay hông nhẹ nhàng"]
    },
    {
      id: "speech",
      title: "Vocal Hero",
      desc: "Luyện phát âm tròn vành rõ chữ, kiểm soát cơ vòm họng và cải thiện chất lượng ngôn ngữ đàm thoại.",
      icon: Mic,
      color: "bg-red-50 text-[#d32f2f]",
      border: "border-red-100",
      items: ["Luyện cơ lưỡi phát âm", "Phát âm nguyên âm dài", "Kể các mẩu truyện ngắn"]
    }
  ];

  return (
    <UserLayout noPaddingTop={false}>
      <div className="w-full max-w-[1200px] mx-auto px-6 mt-8 pb-24 bg-[#ffffff]">
        
        {/* Breadcrumb Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#858585] hover:text-black transition-colors mb-6 font-bold text-xs uppercase tracking-wider font-inter-tight-small"
        >
          <ArrowLeft size={14} /> Quay lại trang chủ
        </button>

        {/* 2.AG Styled Clinical Header Banner (Midnight Teal card layout) */}
        <div className="relative rounded-[24px] bg-[#244d54] text-white p-8 md:p-12 mb-16 overflow-hidden shadow-lg">
          <div className="absolute inset-0 pattern-grid-lg opacity-25 pointer-events-none" />
          <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-[#2ecea0]/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-left font-inter-tight-small">
              <div className="inline-block bg-[#2ecea0]/15 text-[#2ecea0] border border-[#2ecea0]/30 px-4 py-1.5 rounded-full font-bold uppercase tracking-wider text-[10px] mb-6">
                Chương trình Phục hồi Chức năng
              </div>
              <h1 className="text-3xl md:text-5xl font-bold font-inter text-white tracking-tight mb-4 leading-tight">
                Luyện tập <span className="text-[#2ecea0]">Khắc phục</span>
              </h1>
              <p className="text-white/70 text-[15px] font-medium leading-relaxed max-w-xl">
                Cải thiện khả năng vận động và ngôn ngữ với các bài tập trị liệu tại nhà được thiết kế theo quy chuẩn chuyên gia. Hãy kiên trì mỗi ngày để thấy sự khác biệt rõ rệt.
              </p>
            </div>
            
            {/* Elegant glassmorphic goals card */}
            <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-[20px] p-6 backdrop-blur-md shadow-2xl font-inter-tight-small">
              <div className="absolute -top-4 -right-4 bg-[#2ecea0] text-white w-10 h-10 rounded-full flex items-center justify-center border-2 border-[#244d54] rotate-12 shadow-lg">
                <Zap size={18} className="fill-white" />
              </div>
              <div className="space-y-5">
                <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <div className="w-9 h-9 bg-white/10 rounded-[10px] flex items-center justify-center text-[#2ecea0]">
                    <Trophy size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Mục tiêu hôm nay</p>
                    <p className="text-sm font-bold text-white">Hoàn thành 3 bài tập bất kỳ</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-[#2ecea0]/20 rounded-[10px] flex items-center justify-center text-[#2ecea0]">
                    <Heart size={16} className="fill-[#2ecea0]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#2ecea0] uppercase tracking-wider">Chuỗi tích lũy</p>
                    <p className="text-sm font-bold text-white">05 ngày liên tiếp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selection Center Grid */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-black font-inter-heading tracking-tight mb-2">
              Lựa chọn kỹ năng rèn luyện
            </h2>
            <div className="w-12 h-0.5 bg-[#2ecea0] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div 
                  key={cat.id} 
                  className="rounded-[20px] bg-[#f0f1f2] border border-transparent p-6 flex flex-col justify-between hover:border-[#244d54]/15 hover:bg-[#e9eaec] transition-all duration-300 shadow-sm"
                >
                  <div>
                    <div className={`w-12 h-12 ${cat.color} rounded-[12px] flex items-center justify-center mb-6 border ${cat.border} shadow-sm`}>
                      <Icon size={20} strokeWidth={2.2} />
                    </div>
                    
                    <h3 className="text-xl font-bold font-inter text-black mb-3">{cat.title}</h3>
                    <p className="text-[#858585] text-[13px] font-semibold font-inter-tight-small mb-6 leading-relaxed">
                      {cat.desc}
                    </p>
                    
                    <div className="space-y-2 mb-8 font-inter-tight-small">
                      {cat.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 bg-white px-3.5 py-2.5 rounded-lg border border-[#e5e7eb] shadow-2xs">
                          <div className="w-1.5 h-1.5 bg-[#2ecea0] rounded-full" />
                          <span className="text-[12px] font-bold text-[#151515] leading-none">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full bg-[#2ecea0] text-white py-3 rounded-full font-bold hover:bg-[#26b38a] hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 text-[13px] font-inter-tight-small shadow-sm shadow-[#2ecea0]/15">
                    <Play size={14} className="fill-white" /> Bắt đầu tập
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
