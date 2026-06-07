import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Brain, Activity, ArrowRight } from 'lucide-react';

const LandingScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <img src="/My_logo.png" alt="ClickHealth Logo" className="h-8 w-auto object-contain" />
              <span className="font-bold text-xl text-[#1F75C1] tracking-tight">Click Health</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="text-[#1F75C1] font-semibold text-sm hover:text-[#7AB5E9] transition-colors"
              >
                Đăng nhập
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="bg-[#1F75C1] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#155A96] transition-all shadow-md shadow-[#1F75C1]/20 hover:shadow-lg"
              >
                Tạo tài khoản
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 1. Hero Section (Overview & Purpose + Image) */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 text-left">
            <h1 className="text-5xl md:text-[56px] font-extrabold text-[#111827] tracking-tight mb-6 leading-[1.15]">
              Phát hiện sớm đột quỵ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1F75C1] to-[#7AB5E9]">
                Bảo vệ mạng sống
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-medium max-w-xl">
              Ứng dụng Trí tuệ nhân tạo (AI) giúp đánh giá rủi ro và nhận diện dấu hiệu đột quỵ thông qua công nghệ quét khuôn mặt, phân tích giọng nói và cử động cơ thể ngay tại nhà.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={() => navigate('/register')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1F75C1] text-white font-bold text-lg hover:bg-[#155A96] transition-all shadow-xl shadow-[#1F75C1]/30 flex items-center justify-center gap-2 group"
              >
                Bắt đầu kiểm tra
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative hidden md:block">
             <div className="absolute inset-0 bg-[#7AB5E9]/20 blur-[80px] rounded-full" />
             {/* Mockup UI representation */}
             <div className="relative z-10 w-full max-w-[500px] h-[450px] mx-auto bg-gradient-to-br from-[#1F75C1] to-[#7AB5E9] rounded-[40px] p-2 shadow-[0_20px_50px_rgba(31,117,193,0.3)] border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="w-full h-full bg-white/10 rounded-[32px] backdrop-blur-md border border-white/30 overflow-hidden flex flex-col relative">
                   <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
                   
                   {/* Mock Header */}
                   <div className="p-5 flex items-center justify-between border-b border-white/10">
                      <div className="w-12 h-4 bg-white/40 rounded-full" />
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-white/60" />
                        <div className="w-3 h-3 rounded-full bg-white/60" />
                      </div>
                   </div>
                   
                   {/* Mock Body */}
                   <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
                      <div className="w-32 h-32 rounded-full border-4 border-white/30 border-t-white animate-spin flex items-center justify-center mb-6 shadow-lg">
                        <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                           <Activity className="text-white w-10 h-10 animate-pulse" />
                        </div>
                      </div>
                      <div className="bg-white px-6 py-3 rounded-2xl shadow-lg transform -translate-y-4 font-bold text-[#1F75C1] flex items-center gap-2 animate-bounce">
                         <Shield className="w-4 h-4" /> Hệ thống đang phân tích...
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* 2. Meet Clicky Section */}
      <div className="py-16 bg-[#F8FAFC] relative overflow-hidden border-y border-gray-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 flex justify-center relative">
               <div className="absolute inset-0 bg-[#7AB5E9]/20 blur-[60px] rounded-full" />
               <img src="/Mascot.png" alt="Clicky Mascot" className="w-full max-w-[400px] drop-shadow-2xl animate-[bounce_4s_ease-in-out_infinite] relative z-10" />
            </div>
            <div className="w-full md:w-1/2">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#1F75C1]/10 text-[#1F75C1] font-bold text-sm mb-6 shadow-sm">
                 Trợ lý Y tế AI
               </div>
               <h2 className="text-4xl lg:text-5xl font-extrabold text-[#111827] mb-6 flex items-center gap-3">
                 <span className="text-5xl animate-wave origin-bottom-right">👋</span> Xin chào, <br/> mình là Clicky!
               </h2>
               <p className="text-lg text-gray-600 leading-relaxed font-medium mb-8">
                 Trợ lý sức khỏe thông minh, luôn đồng hành cùng bạn trên hành trình chăm sóc sức khỏe mỗi ngày. Vui vẻ, thân thiện và luôn sẵn sàng mang đến những điều tích cực!
               </p>
               <button onClick={() => navigate('/login')} className="px-8 py-4 bg-[#1F75C1] text-white font-bold rounded-full shadow-lg shadow-[#1F75C1]/30 hover:bg-[#7AB5E9] transition-all flex items-center gap-2 group">
                 Trò chuyện với Clicky <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
         </div>
      </div>

      {/* 3. Statistics & Charts Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#111827] mb-4 tracking-tight">Thực trạng đột quỵ hiện nay</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">Đột quỵ không chừa một ai. Việc phát hiện sớm và can thiệp kịp thời là yếu tố quyết định để bảo vệ não bộ và cứu sống người bệnh.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Stat 1 */}
            <div className="p-10 rounded-[32px] bg-[#F8FAFC] border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
               <div className="text-[64px] font-black text-[#1F75C1] mb-2 leading-none">1/4</div>
               <div className="w-12 h-1 bg-[#1F75C1] rounded-full mb-6" />
               <p className="text-gray-700 font-semibold text-lg">Cứ 4 người từ 25 tuổi trở lên sẽ có 1 người bị đột quỵ trong đời.</p>
            </div>
            {/* Stat 2 */}
            <div className="p-10 rounded-[32px] bg-[#F8FAFC] border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
               <div className="text-[64px] font-black text-[#d32f2f] mb-2 leading-none">#2</div>
               <div className="w-12 h-1 bg-[#d32f2f] rounded-full mb-6" />
               <p className="text-gray-700 font-semibold text-lg">Là nguyên nhân gây tử vong đứng thứ 2 trên toàn thế giới.</p>
            </div>
            {/* Stat 3 */}
            <div className="p-10 rounded-[32px] bg-[#F8FAFC] border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
               <div className="text-[64px] font-black text-[#7AB5E9] mb-2 leading-none">80%</div>
               <div className="w-12 h-1 bg-[#7AB5E9] rounded-full mb-6" />
               <p className="text-gray-700 font-semibold text-lg">Các ca đột quỵ có thể phòng ngừa và giảm biến chứng nếu phát hiện sớm.</p>
            </div>
          </div>
          
          {/* High-End CSS Infographic Chart */}
          <div className="max-w-5xl mx-auto w-full bg-white rounded-[40px] p-8 sm:p-12 shadow-[0_20px_60px_rgba(31,117,193,0.06)] border border-[#1F75C1]/10 relative overflow-hidden group">
             {/* Decorative Background Accents */}
             <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#7AB5E9]/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 transition-transform duration-700 group-hover:scale-110" />
             <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-[#1F75C1]/5 to-transparent rounded-full blur-2xl translate-y-1/3 -translate-x-1/3" />
             
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-14 relative z-10">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1F75C1] to-[#7AB5E9] flex items-center justify-center shadow-lg shadow-[#1F75C1]/20">
                   <Activity className="w-6 h-6 text-white" />
                 </div>
                 <div>
                   <h3 className="text-2xl font-black text-[#111827] tracking-tight">Cơ hội phục hồi theo thời gian</h3>
                   <p className="text-sm font-medium text-gray-500 mt-1">Đánh giá y khoa về tỉ lệ sống sót và hồi phục</p>
                 </div>
               </div>
               <div className="px-4 py-2 bg-red-50 rounded-xl border border-red-100 flex items-center gap-2">
                 <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                 <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Thời gian là Não</span>
               </div>
             </div>

             <div className="relative w-full h-[220px] flex items-end mt-8">
                {/* Background grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between border-b-2 border-gray-200 pb-[60px] pointer-events-none">
                   <div className="w-full flex items-center gap-4 opacity-40">
                     <span className="text-xs font-bold text-gray-400 w-8 text-right">90%</span>
                     <div className="flex-1 border-t border-dashed border-gray-300"></div>
                   </div>
                   <div className="w-full flex items-center gap-4 opacity-40">
                     <span className="text-xs font-bold text-gray-400 w-8 text-right">50%</span>
                     <div className="flex-1 border-t border-dashed border-gray-300"></div>
                   </div>
                   <div className="w-full flex items-center gap-4 opacity-40">
                     <span className="text-xs font-bold text-gray-400 w-8 text-right">10%</span>
                     <div className="flex-1 border-t border-dashed border-gray-300"></div>
                   </div>
                </div>

                {/* The Graph Bars */}
                <div className="w-full h-full flex justify-between items-end relative z-10 pb-[60px] px-8 sm:px-16 gap-4 sm:gap-8">
                   {/* Point 1 */}
                   <div className="flex flex-col items-center group w-1/4 h-[100%] cursor-pointer">
                      <div className="relative w-full flex flex-col items-center h-full justify-end">
                         <div className="w-full max-w-[80px] h-[95%] bg-gradient-to-t from-[#1F75C1]/40 to-[#1F75C1] rounded-t-2xl opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-2 shadow-lg relative">
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#1F75C1] text-white px-4 py-1.5 rounded-xl font-bold text-sm shadow-[0_10px_20px_rgba(31,117,193,0.3)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">Tối ưu</div>
                         </div>
                      </div>
                      <div className="absolute bottom-0 text-center w-24">
                         <div className="font-bold text-[#1F75C1] text-[15px]">0 - 3 giờ</div>
                         <div className="text-[11px] text-[#7AB5E9] font-bold uppercase tracking-widest mt-1">Giờ vàng</div>
                      </div>
                   </div>

                   {/* Point 2 */}
                   <div className="flex flex-col items-center group w-1/4 h-[100%] cursor-pointer">
                      <div className="relative w-full flex flex-col items-center h-full justify-end">
                         <div className="w-full max-w-[80px] h-[65%] bg-gradient-to-t from-[#7AB5E9]/40 to-[#7AB5E9] rounded-t-2xl opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-2 shadow-md relative">
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#7AB5E9] text-white px-4 py-1.5 rounded-xl font-bold text-sm shadow-[0_10px_20px_rgba(122,181,233,0.3)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">Khả quan</div>
                         </div>
                      </div>
                      <div className="absolute bottom-0 text-center w-24">
                         <div className="font-bold text-gray-700 text-[15px]">3 - 4.5 giờ</div>
                         <div className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">Can thiệp</div>
                      </div>
                   </div>

                   {/* Point 3 */}
                   <div className="flex flex-col items-center group w-1/4 h-[100%] cursor-pointer">
                      <div className="relative w-full flex flex-col items-center h-full justify-end">
                         <div className="w-full max-w-[80px] h-[30%] bg-gradient-to-t from-gray-300 to-gray-400 rounded-t-2xl opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1 relative">
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-500 text-white px-4 py-1.5 rounded-xl font-bold text-sm shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">Nguy cơ</div>
                         </div>
                      </div>
                      <div className="absolute bottom-0 text-center w-24">
                         <div className="font-bold text-gray-700 text-[15px]">4.5 - 6 giờ</div>
                         <div className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">Di chứng</div>
                      </div>
                   </div>

                   {/* Point 4 */}
                   <div className="flex flex-col items-center group w-1/4 h-[100%] cursor-pointer">
                      <div className="relative w-full flex flex-col items-center h-full justify-end">
                         <div className="w-full max-w-[80px] h-[10%] bg-gradient-to-t from-red-400/40 to-red-500 rounded-t-2xl opacity-80 transition-all duration-300 group-hover:opacity-100 relative">
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-1.5 rounded-xl font-bold text-sm shadow-[0_10px_20px_rgba(239,68,68,0.3)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">Tử vong</div>
                         </div>
                      </div>
                      <div className="absolute bottom-0 text-center w-24">
                         <div className="font-bold text-red-600 text-[15px]">&gt; 6 giờ</div>
                         <div className="text-[11px] text-red-400 font-bold uppercase tracking-widest mt-1">Quá muộn</div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* 4. BEFAST Rules / Features Section */}
      <div className="py-24 bg-[#F8FAFC] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#111827] mb-4 tracking-tight">Quy tắc vàng BEFAST</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">Hệ thống của chúng tôi phân tích tự động dựa trên các dấu hiệu y khoa chuẩn quốc tế thông qua Camera và Micro của bạn.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-[32px] bg-white border border-gray-100 hover:shadow-2xl hover:shadow-[#1F75C1]/10 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-[#F0F4F8] flex items-center justify-center mb-6 group-hover:bg-[#1F75C1] transition-colors duration-300">
                <Brain className="w-8 h-8 text-[#1F75C1] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-[#111827] mb-3">Phân tích Khuôn mặt</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Phát hiện dấu hiệu méo miệng, liệt cơ mặt một bên thông qua công nghệ nhận diện 468 điểm ảnh (Face Mesh).
              </p>
            </div>

            <div className="p-8 rounded-[32px] bg-white border border-gray-100 hover:shadow-2xl hover:shadow-[#1F75C1]/10 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-[#F0F4F8] flex items-center justify-center mb-6 group-hover:bg-[#7AB5E9] transition-colors duration-300">
                <Activity className="w-8 h-8 text-[#7AB5E9] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-[#111827] mb-3">Đánh giá Vận động</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Kiểm tra khả năng giữ thăng bằng và sức yếu của cánh tay qua hệ thống theo dõi khớp xương (Pose Estimation).
              </p>
            </div>

            <div className="p-8 rounded-[32px] bg-white border border-gray-100 hover:shadow-2xl hover:shadow-[#1F75C1]/10 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-[#F0F4F8] flex items-center justify-center mb-6 group-hover:bg-red-400 transition-colors duration-300">
                <Shield className="w-8 h-8 text-red-400 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-[#111827] mb-3">Xử lý Giọng nói</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Đánh giá mức độ líu nhíu, khó nói thông qua AI phân tích mẫu âm thanh giọng nói theo thời gian thực.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 5. Note Section */}
      <div className="py-8 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-[#F8FAFC] px-6 py-4 rounded-xl border border-gray-200 shadow-sm">
             <h2 className="text-[13px] font-bold text-gray-500 mb-1.5 tracking-wider uppercase flex items-center justify-center gap-1.5">
                <Activity size={14} className="text-gray-400" /> Lưu ý
             </h2>
             <p className="text-gray-600 text-[14px] leading-relaxed font-medium">
               Ứng dụng của chúng tôi chỉ hỗ trợ sàng lọc, cảnh báo sớm nguy cơ đột quỵ, <span className="font-bold text-gray-800">không thay thế bác sĩ</span>.
             </p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="py-24 bg-gradient-to-b from-[#1F75C1] to-[#0A2463] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 2px, transparent 0)', backgroundSize: '40px 40px'}} />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md mb-8 border border-white/20">
            <Activity className="w-10 h-10 text-white animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
            Đừng chờ đợi cho đến khi quá muộn
          </h2>
          <p className="text-white text-xl sm:text-2xl mb-12 font-bold bg-black/20 px-6 py-3 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg inline-block">
            Mỗi phút trôi qua khi bị đột quỵ, não bộ mất đi 2 triệu tế bào.
          </p>
          <button 
            onClick={() => navigate('/register')}
            className="px-12 py-5 rounded-full bg-white text-[#1F75C1] font-black text-xl hover:bg-[#F8FAFC] transition-all shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:scale-105 border-4 border-white/90"
          >
            Tạo tài khoản & Kiểm tra ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
