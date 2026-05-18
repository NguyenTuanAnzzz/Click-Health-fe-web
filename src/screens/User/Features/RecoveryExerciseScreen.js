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
      desc: "Cải thiện cơ mặt và nụ cười với các bài tập biểu cảm vui nhộn.",
      icon: Smile,
      color: "bg-accent",
      items: ["Cười rạng rỡ", "Phồng má thổi hơi", "Luyện cơ hàm"]
    },
    {
      id: "arm",
      title: "Arm Power",
      desc: "Tăng cường sự linh hoạt và sức mạnh cho cánh tay bị yếu.",
      icon: Dumbbell,
      color: "bg-primary",
      items: ["Nâng tay robot", "Xoay cổ tay", "Bóp bóng năng lực"]
    },
    {
      id: "balance",
      title: "Balance Master",
      desc: "Lấy lại sự thăng bằng và tự tin trong từng bước đi.",
      icon: Activity,
      color: "bg-info",
      items: ["Đứng một chân", "Đi bộ đường thẳng", "Xoay người nhẹ nhàng"]
    },
    {
      id: "speech",
      title: "Vocal Hero",
      desc: "Luyện phát âm rõ ràng thông qua các bài hát và trò chơi chữ.",
      icon: Mic,
      color: "bg-danger",
      items: ["Uốn lưỡi nghệ thuật", "Phát âm nguyên âm", "Kể chuyện ngắn"]
    }
  ];

  return (
    <UserLayout noPaddingTop>
      {/* Hero Section */}
      <div className="bg-primary-dark pt-32 pb-20 px-4 md:px-8 lg:px-12 border-b-8 border-accent relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full pattern-grid-lg opacity-10" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        
        <div className="max-w-[1200px] mx-auto relative z-10">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/60 hover:text-accent transition-colors mb-8 font-bold uppercase tracking-widest text-sm"
          >
            <ArrowLeft size={20} /> Quay lại trang chủ
          </button>
          
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block bg-accent text-primary-dark px-6 py-2 rounded-full font-black uppercase tracking-widest text-xs mb-6 shadow-accent-glow">
                Level Up Your Health
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-white uppercase italic leading-[0.85] mb-8">
                Luyện tập <br />
                <span className="text-accent drop-shadow-[6px_6px_0_rgba(43,168,162,1)]">Khắc phục</span>
              </h1>
              <p className="text-white/80 text-xl md:text-2xl font-bold italic leading-relaxed max-w-xl">
                Biến quá trình phục hồi thành một cuộc phiêu lưu! Chọn "vũ khí" của bạn và bắt đầu luyện tập ngay hôm nay.
              </p>
            </div>
            
            <div className="w-full max-w-md bg-surface/10 border-4 border-accent rounded-[3rem] p-8 backdrop-blur-md relative rotate-3 shadow-2xl">
              <div className="absolute -top-6 -right-6 bg-danger text-white w-20 h-20 rounded-2xl flex items-center justify-center border-4 border-primary-dark rotate-12 animate-bounce-small shadow-lg">
                <Zap size={40} fill="currentColor" />
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4 border-b-2 border-dashed border-white/20 pb-4">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-primary-dark shadow-md">
                    <Trophy size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-accent uppercase">Mục tiêu hôm nay</p>
                    <p className="text-lg font-bold text-white uppercase italic">Hoàn thành 3 bài tập</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-md">
                    <Heart size={24} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-primary uppercase">Streak hiện tại</p>
                    <p className="text-lg font-bold text-white uppercase italic">05 Ngày liên tiếp</p>
                  </div>
                </div>
                <button className="w-full btn-primary-game text-xl py-6 mt-4">
                  TIẾP TỤC LUYỆN TẬP!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-24">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-primary-dark dark:text-white uppercase italic mb-6">
            Chọn <span className="text-primary">Kỹ năng</span> cần rèn luyện
          </h2>
          <div className="w-32 h-2 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.id} className="game-card flex flex-col group hover:-translate-y-4 hover:shadow-2xl transition-all duration-500">
                <div className={`w-20 h-20 ${cat.color} rounded-3xl flex items-center justify-center mb-8 border-4 border-primary-dark shadow-lg group-hover:rotate-12 transition-transform`}>
                  <Icon size={40} className="text-primary-dark" strokeWidth={3} />
                </div>
                
                <h3 className="text-3xl font-black text-primary-dark uppercase italic mb-4">{cat.title}</h3>
                <p className="text-primary-dark/60 font-bold mb-8 leading-relaxed italic">{cat.desc}</p>
                
                <div className="space-y-3 mb-10 flex-1">
                  {cat.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-neutral p-3 rounded-xl border-2 border-primary-dark/5">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <span className="text-sm font-black text-primary-dark uppercase italic">{item}</span>
                    </div>
                  ))}
                </div>
                
                <button className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm border-4 border-primary-dark transition-all flex items-center justify-center gap-2 ${cat.color} text-primary-dark hover:bg-primary-dark hover:text-white shadow-md`}>
                  <Play size={18} fill="currentColor" /> Bắt đầu ngay
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </UserLayout>
  );
};

export default RecoveryExerciseScreen;
