import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Camera, Activity, HeartPulse, ShieldCheck, ArrowRight, Plus, MapPin, PhoneCall, Star, Sun, Moon, Heart, BookOpen, Info } from 'lucide-react';
import { motion } from 'framer-motion';

import { fetchMyHistory } from '../store/slices/historySlice';
import RecentCheckCard from '../components/ui/RecentCheckCard';
import ItemMainFunction from '../components/ui/ItemMainFunction';
import features from '../constants/homeFeatures';
import UserLayout from '../layouts/UserLayout';

const IndexScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { token, user } = useSelector((state) => state.auth);
  const { data: history, loading } = useSelector((state) => state.history);

  useEffect(() => {
    if (token) {
      const roleObj = user?.role;
      const roleName = typeof roleObj === 'object' ? roleObj.name : roleObj;
      const ADMIN_ID = '698f5a89fe5addce4f8e3b52';
      
      if (roleName === 'ADMIN' || roleName === ADMIN_ID) {
        navigate('/admin');
      } else {
        dispatch(fetchMyHistory());
      }
    }
  }, [dispatch, token, user, navigate]);

  const getShortName = (fullName) => {
    if (!fullName) return "Người dùng";
    const parts = fullName.split(" ");
    if (parts.length > 1) {
      return `${parts[0]} ${parts[parts.length - 1]}`;
    }
    return fullName;
  };

  const screeningFeatures = features.filter(f => f.id === 1 || f.id === 2 || f.id === 3 || f.id === 6);
  const emergencyFeature = features.find(f => f.id === 4);
  const hospitalFeature = features.find(f => f.id === 5);

  return (
    <UserLayout noPaddingTop={false}>
      <div className="bg-surface text-on-surface antialiased min-h-screen font-body selection:bg-primary/20 selection:text-primary">
        <main>
          {/* 2. Unified Hero Section with AI Scanner Mascot */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden px-6 md:px-10 py-20 bg-surface">
          <div className="absolute top-0 right-0 w-full h-full pattern-grid-lg opacity-[0.03] pointer-events-none" />
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-secondary-container/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-[1200px] mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Left Content */}
            <div className="max-w-2xl">
              <div className="inline-block mb-6">
                <div className="flex items-center gap-2.5 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full shadow-sm">
                  <ShieldCheck size={16} className="text-primary animate-pulse" />
                  <span className="uppercase tracking-[0.15em] text-[10px] font-extrabold text-primary">
                    Trợ lý y tế AI 24/7
                  </span>
                </div>
              </div>
              
              <motion.h1 
                initial={{ x: -60, opacity: 0, filter: "blur(8px)" }}
                animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-on-surface leading-[1.1] tracking-tight mb-6 font-headline"
              >
                Bảo vệ <span className="text-primary relative inline-block">Trái Tim
                  <svg className="absolute -bottom-1 left-0 w-full h-3 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round"/>
                  </svg>
                </span> &amp; <motion.span
                  initial={{ x: -40, opacity: 0, filter: "blur(8px)" }}
                  animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                >
                  Trí Tuệ
                </motion.span> Người Thân
              </motion.h1>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-10 max-w-lg font-medium"
              >
                Sử dụng trí tuệ nhân tạo tiên tiến để phân tích dấu hiệu khuôn mặt và cảnh báo nguy cơ đột quỵ sớm. Vì mỗi giây đều là kim cương.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <button 
                  onClick={() => navigate(token ? '/befast' : '/register')}
                  className="bg-primary text-on-primary px-10 py-5 rounded-full font-black text-[18px] shadow-2xl shadow-primary/30 hover:scale-105 hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center gap-4 active:scale-95 group"
                >
                  <Camera size={24} className="group-hover:animate-pulse" />
                  {token ? 'KIỂM TRA BEFAST NGAY' : 'BẮT ĐẦU KIỂM TRA'}
                </button>
                <button 
                  onClick={() => navigate('/knowledge')}
                  className="bg-surface-container-low text-on-surface px-10 py-5 rounded-full font-black text-[18px] border-2 border-outline-variant/60 hover:bg-surface-container hover:border-outline-variant transition-all duration-300 flex items-center justify-center gap-4 shadow-lg hover:shadow-xl"
                >
                  <Info size={24} className="text-on-surface-variant" />
                  TÌM HIỂU THÊM
                </button>
              </motion.div>

              <div className="flex flex-wrap gap-6 pt-8 border-t border-outline-variant/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center border border-outline-variant/50 shadow-sm">
                    <Activity className="text-primary" size={18} />
                  </div>
                  <span className="font-bold text-on-surface text-[14px]">Kết quả trong 30s</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-error/10 flex items-center justify-center border border-error/20 shadow-sm">
                    <HeartPulse className="text-error" size={18} />
                  </div>
                  <span className="font-bold text-on-surface text-[14px]">Cảnh báo tức thì</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary-container/10 flex items-center justify-center border border-secondary-container/20 shadow-sm">
                    <ShieldCheck className="text-secondary-container" size={18} />
                  </div>
                  <span className="font-bold text-on-surface text-[14px]">Bảo mật y tế</span>
                </div>
              </div>
            </div>

            {/* Right Content - The Blue Window & Mascot (The 2 Souls of the App) */}
            <div className="relative w-full max-w-[520px] mx-auto lg:mx-0 flex flex-col gap-8">
              {/* Blue Browser Window Animation */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full aspect-[4/3] bg-gradient-to-br from-[#5E9EE4] to-[#4A88D0] rounded-[24px] shadow-2xl flex flex-col overflow-hidden relative"
              >
                {/* Browser Top Bar */}
                <div className="h-10 bg-white/10 flex items-center px-5 gap-2 backdrop-blur-sm border-b border-white/10">
                  <div className="w-3 h-3 rounded-full bg-white/50" />
                  <div className="w-3 h-3 rounded-full bg-white/50" />
                  <div className="w-3 h-3 rounded-full bg-white/50" />
                </div>
                
                {/* Browser Content */}
                <div className="flex-1 relative flex flex-col items-center justify-center">
                  {/* Glowing Radar Circle */}
                  <div className="relative w-36 h-36 flex items-center justify-center mb-8">
                    <div className="absolute inset-0 rounded-full border border-white/20 animate-[ping_2.5s_ease-in-out_infinite]" />
                    <div className="absolute inset-4 rounded-full border-2 border-white/40" />
                    <div className="absolute inset-4 rounded-full bg-white/10 blur-sm" />
                    <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                      <span className="text-white text-4xl font-extrabold italic font-serif">Z</span>
                    </div>
                  </div>
                  
                  {/* Status Pill */}
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="bg-white text-[#4A88D0] px-6 py-3 rounded-full font-bold text-[14px] shadow-xl flex items-center gap-3"
                  >
                    <div className="w-4 h-4 border-2 border-[#4A88D0] border-t-transparent rounded-full animate-spin" />
                    Hệ thống đang phân tích...
                  </motion.div>
                </div>
              </motion.div>

              {/* The Mascot Robot Card */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center gap-6 self-start bg-white rounded-3xl p-6 shadow-xl w-[90%] md:-ml-12 relative z-20"
              >
                <div className="w-32 h-32 bg-surface-container-lowest rounded-2xl flex-shrink-0 flex items-center justify-center shadow-inner overflow-hidden">
                  {/* Note: User must supply correct Mascot.png. Adding bounce animation as requested */}
                  <img src="/Mascot.png" alt="Clicky Mascot" className="w-full h-full object-contain animate-[bounce_3s_ease-in-out_infinite]" onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/4712/4712035.png' }} />
                </div>
                <div>
                  <div className="inline-block bg-[#EBF3FB] text-[#1F75C1] px-4 py-1.5 rounded-full font-bold text-[11px] mb-3">
                    Trợ lý Y tế AI
                  </div>
                  <h4 className="text-2xl font-extrabold text-[#1E293B] mb-2 leading-tight font-headline">Xin chào,<br/>mình là Clicky!</h4>
                  <p className="text-[13px] font-medium text-slate-500 leading-relaxed">Trợ lý sức khỏe thông minh, luôn đồng hành cùng bạn trên hành trình chăm sóc sức khỏe mỗi ngày.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* BEFAST Protocol Section - Visible to All */}
        <section className="w-full bg-surface-container-lowest py-24 border-b border-outline-variant/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />
          <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block bg-error/10 text-error border border-error/20 px-5 py-2 rounded-full font-extrabold uppercase tracking-widest text-[11px] mb-5">
                Cẩm nang sơ cứu khẩn cấp
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-5 font-headline tracking-tight">
                Giao thức <span className="text-primary">BEFAST</span>
              </h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto font-medium text-[16px] leading-relaxed">
                BEFAST là tiêu chuẩn vàng toàn cầu giúp nhận diện sớm các dấu hiệu của đột quỵ. Ghi nhớ 6 chữ cái này có thể cứu sống chính bạn và người thân.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { img: '/b.png', letter: 'B', title: 'Balance', sub: 'Thăng bằng', desc: 'Mất thăng bằng đột ngột, chóng mặt, đau đầu dữ dội, hoặc mất khả năng phối hợp vận động cơ thể.', color: 'from-blue-50 to-blue-100/50', textColor: 'text-blue-700' },
                { img: '/e.png', letter: 'E', title: 'Eyes', sub: 'Thị lực', desc: 'Mờ mắt đột ngột, giảm hoặc mất thị lực ở một hoặc cả hai bên mắt mà không rõ nguyên nhân.', color: 'from-indigo-50 to-indigo-100/50', textColor: 'text-indigo-700' },
                { img: '/f.png', letter: 'F', title: 'Face', sub: 'Khuôn mặt', desc: 'Khuôn mặt bị méo, xệ một bên. Yêu cầu bệnh nhân mỉm cười để dễ dàng kiểm tra sự bất đối xứng.', color: 'from-purple-50 to-purple-100/50', textColor: 'text-purple-700' },
                { img: '/a.png', letter: 'A', title: 'Arm', sub: 'Cánh tay', desc: 'Tê yếu một bên tay hoặc chân. Yêu cầu giơ cả hai tay lên cao, một bên tay sẽ có xu hướng rũ xuống.', color: 'from-rose-50 to-rose-100/50', textColor: 'text-rose-700' },
                { img: '/s.png', letter: 'S', title: 'Speech', sub: 'Giọng nói', desc: 'Nói ngọng, khó phát âm, giọng nói thay đổi bất thường hoặc không hiểu được người khác đang nói gì.', color: 'from-amber-50 to-amber-100/50', textColor: 'text-amber-700' },
                { img: '/t.png', letter: 'T', title: 'Time', sub: 'Thời gian', desc: 'Khi xuất hiện bất kỳ dấu hiệu nào trên, hãy gọi Cấp cứu (115) ngay lập tức. "Thời gian là Não".', color: 'from-red-50 to-red-100/50', textColor: 'text-red-700' }
              ].map((item, index) => (
                <div key={index} className="group bg-surface rounded-[32px] overflow-hidden border border-outline-variant/40 hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
                  <div className={`w-full aspect-[4/3] bg-gradient-to-br ${item.color} p-8 flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <img src={item.img} alt={item.title} className="w-full h-full object-contain filter drop-shadow-xl group-hover:scale-110 transition-transform duration-700 ease-out relative z-10" />
                    {/* Big blurred letter in background */}
                    <div className={`absolute -right-4 -bottom-8 text-[120px] font-black opacity-10 ${item.textColor} font-headline italic pointer-events-none group-hover:scale-125 transition-transform duration-700`}>
                      {item.letter}
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-end gap-3 mb-3">
                      <span className={`text-4xl font-extrabold font-headline ${item.textColor} leading-none`}>{item.letter}</span>
                      <h3 className="text-xl font-bold text-on-surface leading-tight mb-0.5">{item.title} <span className="text-on-surface-variant font-medium">({item.sub})</span></h3>
                    </div>
                    <p className="text-[14px] text-on-surface-variant font-medium leading-relaxed mt-2 flex-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Conditional Content Based on Auth */}
        {token ? (
          /* ==============================================================
             DASHBOARD CONTENT (FOR LOGGED IN USERS)
             ============================================================== */
          <>
            {/* Section 1: Recent Activity */}
            <section className="w-full bg-surface-container-low py-24 border-t border-outline-variant/30 relative overflow-hidden">
              <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
                <div className="flex items-center justify-between mb-12">
                  <div 
                    onClick={() => navigate('/history')}
                    className="cursor-pointer group"
                  >
                    <h2 className="text-3xl md:text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-2">
                      Hoạt động gần đây
                    </h2>
                    <div className="w-12 h-1.5 bg-primary rounded-full transition-all duration-300 group-hover:w-24" />
                  </div>
                  <button 
                    onClick={() => navigate('/history')}
                    className="hidden sm:flex px-6 py-3 rounded-full border border-primary/20 text-primary bg-white text-[14px] font-bold hover:bg-primary/5 transition-all duration-300 items-center gap-2 shadow-sm"
                  >
                    Xem tất cả <ArrowRight size={16} strokeWidth={2.5} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {loading ? (
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 h-[340px] flex flex-col items-center justify-center bg-surface rounded-[32px] border border-outline-variant/50 shadow-sm">
                      <div className="w-10 h-10 border-4 border-primary/25 border-t-primary rounded-full animate-spin mb-4" />
                      <p className="text-on-surface-variant font-bold text-[14px]">Đang tải dữ liệu...</p>
                    </div>
                  ) : history && history.length > 0 ? (
                    history.slice(0, 2).map((item, idx) => (
                      <div key={item._id || item.id || idx} className="h-full min-h-[340px]">
                        <RecentCheckCard 
                          title={idx === 0 ? "Lần kiểm tra mới nhất" : "Lần kiểm tra trước đó"}
                          code={`#${(item._id || item.id || 'XXXX').slice(-4).toUpperCase()}/2026`}
                          date={new Date(item.createdAt).toLocaleDateString('vi-VN')}
                          step="5/5"
                          userName={getShortName(user?.fullName)}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 h-[340px] flex flex-col items-center justify-center bg-white rounded-[32px] border border-outline-variant/40 p-8 text-center shadow-sm relative overflow-hidden group">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/5 rounded-full blur-[40px] pointer-events-none" />
                      <div className="relative z-10 w-32 h-32 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <img src="/history.png" alt="Lịch sử hoạt động" className="w-full h-full object-contain drop-shadow-xl" />
                      </div>
                      <p className="text-[#1E293B] font-black text-2xl mb-2 font-headline tracking-tight relative z-10">Chưa có dữ liệu</p>
                      <p className="text-slate-500 text-[15px] font-medium relative z-10">Thực hiện tầm soát BEFAST để bắt đầu theo dõi sức khỏe.</p>
                    </div>
                  )}
                  
                  <div 
                    onClick={() => navigate('/befast')}
                    className="hidden lg:flex border border-outline-variant/40 rounded-[32px] items-center justify-center p-8 bg-gradient-to-br from-primary/5 to-transparent group hover:from-primary/10 hover:to-primary/5 hover:border-primary/40 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer h-full min-h-[340px] relative overflow-hidden"
                  >
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-[30px] group-hover:bg-primary/20 transition-colors duration-500 pointer-events-none" />
                    <div className="text-center font-body relative z-10">
                      <div className="w-20 h-20 bg-white text-primary rounded-[24px] flex items-center justify-center mx-auto mb-6 shadow-[0_10px_20px_rgba(31,117,193,0.1)] group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:rotate-90 group-hover:shadow-[0_10px_30px_rgba(31,117,193,0.3)] transition-all duration-500">
                        <Plus size={36} strokeWidth={2.5} />
                      </div>
                      <p className="text-primary font-black text-[18px] uppercase tracking-widest font-headline">Tầm soát mới</p>
                      <p className="text-slate-500 text-[13px] font-medium mt-3">Khởi tạo nhanh quy trình<br/>BEFAST qua AI</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Health Ecosystem Features */}
            <section className="w-full bg-surface py-24 border-t border-outline-variant/30">
              <div className="w-full max-w-[1200px] mx-auto px-6">
                <div className="text-center mb-16">
                  <div className="inline-block bg-primary/10 text-primary border border-primary/10 px-5 py-2 rounded-full font-extrabold uppercase tracking-widest text-[11px] mb-5">
                    Hệ sinh thái y tế số
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-5 font-headline tracking-tight">
                    Tính năng nổi bật
                  </h2>
                  <p className="text-on-surface-variant max-w-2xl mx-auto font-medium text-[16px] leading-relaxed">
                    Giải pháp công nghệ đồng bộ hỗ trợ phòng ngừa, nhận biết sớm và đồng hành khôi phục sức khỏe đột quỵ.
                  </p>
                </div>

                <div>
                  {/* AI Smart Screening - Full Width Panel */}
                  <div className="w-full rounded-[40px] bg-surface-container-low border border-outline-variant/50 p-8 md:p-12 flex flex-col relative overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
                    
                    <div className="mb-12 relative z-10 text-center lg:text-left flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6">
                      <div>
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                          <Activity size={24} className="text-primary" />
                          <span className="text-[14px] font-black text-primary uppercase tracking-widest">
                            Tầm soát chuyên sâu
                          </span>
                        </div>
                        <h3 className="text-4xl font-extrabold text-on-surface font-headline tracking-tight mb-3">
                          Chẩn đoán AI & Trị liệu
                        </h3>
                        <p className="text-on-surface-variant text-[16px] font-medium max-w-xl mx-auto lg:mx-0">
                          Đánh giá các chỉ số sinh trắc học cử động và luyện tập phục hồi chức năng thông qua AI.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                      {screeningFeatures.map((f) => (
                        <ItemMainFunction
                          key={f.id}
                          title={f.title}
                          nameIcon={f.icon}
                          imgSrc={f.imgSrc}
                          danger={f.danger}
                          primary={f.primary}
                          link={f.link}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          /* ==============================================================
             LANDING CONTENT (FOR LOGGED OUT USERS)
             ============================================================== */
          <>
            <section className="py-24 px-6 md:px-10 max-w-[1200px] mx-auto">
              <div className="text-center mb-20">
                <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px] mb-6">Công nghệ bảo vệ sự sống</div>
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6 font-headline tracking-tight">Hệ thống phân tích thông minh</h2>
                <p className="text-on-surface-variant max-w-2xl mx-auto text-[16px] font-medium leading-relaxed">Click Health kết hợp sức mạnh của trí tuệ nhân tạo và chuyên môn y tế tiêu chuẩn thế giới để đưa ra những phân tích chính xác nhất ngay tại nhà.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-10 bg-surface-container-low rounded-[32px] hover:shadow-xl transition-all border border-outline-variant/50 hover:border-primary/30 group">
                  <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center mb-8 text-primary shadow-sm border border-outline-variant/50 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <Activity size={32} />
                  </div>
                  <h3 className="text-2xl font-extrabold mb-4 font-headline">AI Nhận diện khuôn mặt</h3>
                  <p className="text-on-surface-variant text-[15px] font-medium leading-relaxed">Phân tích sự lệch cơ mặt và thay đổi nụ cười bằng FaceMesh - một trong những dấu hiệu đột quỵ sớm nhất theo quy tắc FAST.</p>
                </div>
                <div className="p-10 bg-surface-container-low rounded-[32px] hover:shadow-xl transition-all border border-outline-variant/50 hover:border-primary/30 group">
                  <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center mb-8 text-primary shadow-sm border border-outline-variant/50 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <HeartPulse size={32} />
                  </div>
                  <h3 className="text-2xl font-extrabold mb-4 font-headline">Chỉ số rủi ro AI</h3>
                  <p className="text-on-surface-variant text-[15px] font-medium leading-relaxed">Đánh giá nguy cơ đột quỵ tổng thể thông qua bộ câu hỏi y khoa chuẩn WHO và chỉ số khối cơ thể BMI.</p>
                </div>
                <div className="p-10 bg-surface-container-low rounded-[32px] hover:shadow-xl transition-all border border-outline-variant/50 hover:border-primary/30 group">
                  <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center mb-8 text-primary shadow-sm border border-outline-variant/50 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <MapPin size={32} />
                  </div>
                  <h3 className="text-2xl font-extrabold mb-4 font-headline">Định vị cấp cứu</h3>
                  <p className="text-on-surface-variant text-[15px] font-medium leading-relaxed">Tự động gợi ý bản đồ các bệnh viện, trạm y tế có khả năng can thiệp đột quỵ gần bạn nhất khi phát hiện sự cố.</p>
                </div>
              </div>
            </section>

            <section className="py-24 bg-primary text-on-primary rounded-t-[60px] md:rounded-t-[80px] overflow-hidden relative">
              <div className="absolute inset-0 pattern-grid-lg opacity-10" />
              <div className="max-w-[1200px] mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-20 items-center relative z-10">
                <div>
                  <div className="inline-block bg-white/10 text-white px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px] mb-6 border border-white/20">Vận hành đơn giản</div>
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-10 font-headline leading-tight tracking-tight">Quy trình <span className="text-secondary-container">bảo vệ</span> 3 bước</h2>
                  <div className="space-y-10">
                    <div className="flex gap-6 group">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 font-extrabold text-xl border border-white/20 group-hover:bg-white group-hover:text-primary transition-colors duration-300">1</div>
                      <div>
                        <h4 className="text-2xl font-extrabold mb-3 font-headline">Tạo tài khoản & Hồ sơ y tế</h4>
                        <p className="text-white/80 font-medium text-[15px] leading-relaxed">Khai báo tuổi, chiều cao, cân nặng và tiền sử bệnh lý để AI hiểu rõ cơ thể bạn.</p>
                      </div>
                    </div>
                    <div className="flex gap-6 group">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 font-extrabold text-xl border border-white/20 group-hover:bg-white group-hover:text-primary transition-colors duration-300">2</div>
                      <div>
                        <h4 className="text-2xl font-extrabold mb-3 font-headline">Tầm soát tự động qua Camera</h4>
                        <p className="text-white/80 font-medium text-[15px] leading-relaxed">Sử dụng điện thoại hoặc máy tính để AI phân tích mắt, mặt, tay và giọng nói (BEFAST).</p>
                      </div>
                    </div>
                    <div className="flex gap-6 group">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 font-extrabold text-xl border border-white/20 group-hover:bg-white group-hover:text-primary transition-colors duration-300">3</div>
                      <div>
                        <h4 className="text-2xl font-extrabold mb-3 font-headline">Nhận kết quả & Xử lý</h4>
                        <p className="text-white/80 font-medium text-[15px] leading-relaxed">Ngay khi có dấu hiệu bất thường, hệ thống sẽ cảnh báo đỏ và cung cấp nút gọi cấp cứu ngay lập tức.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-secondary-container/20 rounded-full blur-[60px]" />
                  <div className="space-y-6 pt-12">
                    <div className="bg-surface-container-lowest/10 backdrop-blur-md p-8 rounded-[32px] aspect-square flex flex-col justify-end border border-white/10 hover:-translate-y-2 transition-transform duration-300">
                      <p className="text-5xl font-extrabold mb-3 font-headline">98%</p>
                      <p className="text-[14px] font-bold text-white/80 uppercase tracking-wider">Độ chính xác AI</p>
                    </div>
                    <div className="bg-surface-container-lowest/10 backdrop-blur-md p-8 rounded-[32px] aspect-square flex flex-col justify-end border border-white/10 hover:-translate-y-2 transition-transform duration-300">
                      <p className="text-5xl font-extrabold mb-3 font-headline">&lt; 5s</p>
                      <p className="text-[14px] font-bold text-white/80 uppercase tracking-wider">Tốc độ phân tích</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-surface-container-lowest/10 backdrop-blur-md p-8 rounded-[32px] aspect-square flex flex-col justify-end border border-white/10 hover:-translate-y-2 transition-transform duration-300">
                      <p className="text-5xl font-extrabold mb-3 font-headline">24/7</p>
                      <p className="text-[14px] font-bold text-white/80 uppercase tracking-wider">Sẵn sàng</p>
                    </div>
                    <div className="bg-surface-container-lowest/10 backdrop-blur-md p-8 rounded-[32px] aspect-square flex flex-col justify-end border border-white/10 hover:-translate-y-2 transition-transform duration-300">
                      <p className="text-5xl font-extrabold mb-3 font-headline">100%</p>
                      <p className="text-[14px] font-bold text-white/80 uppercase tracking-wider">Bảo mật dữ liệu</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      </div>
    </UserLayout>
  );
};

export default IndexScreen;
