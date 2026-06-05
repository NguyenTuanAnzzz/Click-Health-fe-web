import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Brain, Activity, ArrowRight } from 'lucide-react';

const LandingScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] font-inter">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#244d54] to-[#2ecea0] flex items-center justify-center">
                <Activity className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-[#244d54] tracking-tight">Click Health</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="text-[#244d54] font-semibold text-sm hover:text-[#2ecea0] transition-colors"
              >
                Đăng nhập
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="bg-[#244d54] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#1a383d] transition-all shadow-md shadow-[#244d54]/20"
              >
                Tạo tài khoản
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
          <div className="w-[600px] h-[600px] rounded-full bg-[#2ecea0]/10 blur-[80px]" />
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3">
          <div className="w-[500px] h-[500px] rounded-full bg-[#244d54]/5 blur-[60px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ecea0]/10 border border-[#2ecea0]/20 text-[#244d54] text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-[#2ecea0] animate-pulse" />
              Công nghệ AI tầm soát y tế
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#111827] tracking-tight mb-8 leading-[1.1]">
              Phát hiện sớm đột quỵ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#244d54] to-[#2ecea0]">
                Bảo vệ mạng sống
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Ứng dụng Trí tuệ nhân tạo (AI) giúp đánh giá rủi ro đột quỵ thông qua phân tích khuôn mặt, giọng nói và cử động cơ thể (Quy tắc BEFAST) ngay tại nhà.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/register')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#2ecea0] text-white font-bold text-lg hover:bg-[#25ba8e] transition-all shadow-lg shadow-[#2ecea0]/30 flex items-center justify-center gap-2 group"
              >
                Bắt đầu kiểm tra miễn phí
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => navigate('/knowledge')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#244d54] font-bold text-lg border border-gray-200 hover:border-[#2ecea0] hover:bg-[#f8fafc] transition-all flex items-center justify-center gap-2"
              >
                Tìm hiểu thêm
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#111827] mb-4">Quy trình kiểm tra BEFAST chuẩn Y khoa</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Phân tích đa chiều bằng Camera và Micro trên thiết bị của bạn để đưa ra cảnh báo nhanh nhất.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-[#f8fafc] border border-gray-100 hover:shadow-xl hover:shadow-[#244d54]/5 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-[#244d54]/5 flex items-center justify-center mb-6 group-hover:bg-[#244d54] transition-colors">
                <Brain className="w-7 h-7 text-[#244d54] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-[#111827] mb-3">Phân tích Khuôn mặt</h3>
              <p className="text-gray-600 leading-relaxed">
                Phát hiện dấu hiệu méo miệng, liệt cơ mặt một bên thông qua công nghệ nhận diện 468 điểm ảnh (Face Mesh).
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-[#f8fafc] border border-gray-100 hover:shadow-xl hover:shadow-[#244d54]/5 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-[#2ecea0]/10 flex items-center justify-center mb-6 group-hover:bg-[#2ecea0] transition-colors">
                <Activity className="w-7 h-7 text-[#2ecea0] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-[#111827] mb-3">Đánh giá Vận động</h3>
              <p className="text-gray-600 leading-relaxed">
                Kiểm tra khả năng giữ thăng bằng và sức yếu của cánh tay qua hệ thống theo dõi khớp xương (Pose Estimation).
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-[#f8fafc] border border-gray-100 hover:shadow-xl hover:shadow-[#244d54]/5 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                <Shield className="w-7 h-7 text-blue-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-[#111827] mb-3">Xử lý Giọng nói</h3>
              <p className="text-gray-600 leading-relaxed">
                Đánh giá mức độ líu nhíu, khó nói thông qua AI phân tích mẫu âm thanh giọng nói theo thời gian thực.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer CTA */}
      <div className="py-20 bg-[#244d54] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px'}} />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Đừng chờ đợi cho đến khi quá muộn</h2>
          <p className="text-[#2ecea0] text-lg mb-10">Mỗi phút trôi qua khi bị đột quỵ, não bộ mất đi 2 triệu tế bào.</p>
          <button 
            onClick={() => navigate('/register')}
            className="px-8 py-4 rounded-full bg-white text-[#244d54] font-bold text-lg hover:bg-[#f8fafc] transition-all shadow-xl hover:scale-105"
          >
            Tạo tài khoản & Kiểm tra ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
