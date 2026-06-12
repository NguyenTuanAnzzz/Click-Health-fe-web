import React, { useEffect } from "react";
import { BookOpen, Sun, Moon, Heart, Activity, ArrowRight, Star, Plus, ShieldAlert, PhoneCall, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import UserLayout from "../../../layouts/UserLayout";
import RecentCheckCard from "../../../components/ui/RecentCheckCard";
import ItemMainFunction from "../../../components/ui/ItemMainFunction";
import features from "../../../constants/homeFeatures";
import HeroBanner from "../../../components/ui/HeroBanner";
import { fetchMyHistory } from "../../../store/slices/historySlice";

const HomeScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: history, loading } = useSelector((state) => state.history);
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchMyHistory());
    }
  }, [dispatch, token]);

  const getShortName = (fullName) => {
    if (!fullName) return "Người dùng";
    const parts = fullName.split(" ");
    if (parts.length > 1) {
      return `${parts[0]} ${parts[parts.length - 1]}`;
    }
    return fullName;
  };

  // Split features into functional groups
  const screeningFeatures = features.filter(f => f.id === 1 || f.id === 2 || f.id === 3 || f.id === 6);
  const emergencyFeature = features.find(f => f.id === 4);
  const hospitalFeature = features.find(f => f.id === 5);  return (
    <UserLayout noPaddingTop={false}>
      <HeroBanner />
      
      {/* 2.AG Alternating Layout System */}
      
      {/* Section 1: Recent Activity */}
      <section className="w-full bg-surface py-20 border-b border-outline-variant/30">
        <div className="w-full max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div 
              onClick={() => navigate('/history')}
              className="cursor-pointer group"
            >
              <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight mb-1">
                Hoạt động gần đây
              </h2>
              <div className="w-8 h-1 bg-primary rounded-full transition-all duration-300 group-hover:w-16" />
            </div>
            <button 
              onClick={() => navigate('/history')}
              className="px-5 py-2.5 rounded-full border border-primary/20 text-primary bg-transparent text-[14px] font-bold font-body hover:bg-primary/5 transition-all duration-300 flex items-center gap-2"
            >
              Xem tất cả <ArrowRight size={14} strokeWidth={2.5} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-1 md:col-span-2 lg:col-span-2 h-[240px] flex flex-col items-center justify-center bg-surface-container-lowest rounded-3xl border border-outline-variant shadow-sm">
                <div className="w-8 h-8 border-4 border-primary/25 border-t-primary rounded-full animate-spin mb-4" />
                <p className="text-on-surface-variant font-bold text-[14px] font-body">Đang tải dữ liệu...</p>
              </div>
            ) : history && history.length > 0 ? (
              history.slice(0, 2).map((item, idx) => (
                <div key={item._id || item.id || idx} className="h-[240px]">
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
              <div className="col-span-1 md:col-span-2 lg:col-span-2 h-[240px] flex flex-col items-center justify-center bg-surface-container-lowest rounded-3xl border border-outline-variant p-8 text-center">
                <Activity size={36} className="text-primary/30 mb-4" />
                <p className="text-on-surface font-extrabold text-xl mb-1 font-headline tracking-tight">Chưa có dữ liệu</p>
                <p className="text-on-surface-variant text-[15px] font-medium font-body">Thực hiện tầm soát để theo dõi sức khỏe của bạn.</p>
              </div>
            )}
            
            <div 
              onClick={() => navigate('/befast')}
              className="hidden lg:flex border-2 border-dashed border-primary/30 rounded-3xl items-center justify-center p-8 bg-primary/5 group hover:bg-primary/10 transition-all duration-300 cursor-pointer h-[240px]"
            >
              <div className="text-center font-body">
                <div className="w-14 h-14 bg-primary text-on-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-90 transition-transform duration-300 soft-glow-primary">
                  <Plus size={24} strokeWidth={2.5} />
                </div>
                <p className="text-primary font-bold text-[16px]">Kiểm tra BEFAST mới</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Health Ecosystem Features */}
      <section className="w-full bg-surface-container-low py-20 border-b border-outline-variant/30">
        <div className="w-full max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-primary/10 text-primary border border-primary/10 px-4 py-1.5 rounded-full font-bold uppercase tracking-wider text-[11px] mb-4 font-body">
              Dịch vụ y tế trực tuyến
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface mb-4 font-headline tracking-tight">
              Hệ sinh thái sức khỏe số
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto font-medium text-[16px] font-body leading-relaxed">
              Giải pháp công nghệ đồng bộ hỗ trợ phòng ngừa, nhận biết sớm và đồng hành khôi phục sức khỏe đột quỵ
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2/3 Panel - AI Smart Screening */}
            <div className="lg:col-span-2 rounded-[32px] bg-surface-container-lowest border border-outline-variant/50 p-8 md:p-10 flex flex-col justify-between relative overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[60px] -mr-20 -mt-20 pointer-events-none" />
              
              <div className="mb-10 relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Activity size={20} className="text-primary" />
                  <span className="text-[13px] font-black text-primary uppercase tracking-wider font-body">
                    Tầm soát chuyên sâu & Phục hồi
                  </span>
                </div>
                <h3 className="text-3xl font-extrabold text-on-surface font-headline tracking-tight">
                  Chẩn đoán AI & Trị liệu
                </h3>
                <p className="text-on-surface-variant text-[15px] font-medium font-body mt-2 max-w-md">
                  Đánh giá các chỉ số sinh trắc học cử động và luyện tập phục hồi chức năng
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative z-10">
                {screeningFeatures.map((f) => (
                  <ItemMainFunction
                    key={f.id}
                    title={f.title}
                    nameIcon={f.icon}
                    danger={f.danger}
                    primary={f.primary}
                    link={f.link}
                  />
                ))}
              </div>
            </div>

            {/* Right 1/3 Panel - Emergency & Utilities */}
            <div className="flex flex-col gap-6">
              {/* Emergency Alert Card */}
              {emergencyFeature && (
                <div 
                  onClick={() => window.location.href = `tel:${emergencyFeature.telNumber}`}
                  className="rounded-[32px] bg-error-container/40 border border-error/20 p-8 flex flex-col justify-between cursor-pointer group hover:bg-error-container/60 hover:border-error/30 transition-all duration-300 relative overflow-hidden h-1/2 min-h-[240px]"
                >
                  <div className="absolute top-[-30px] right-[-30px] w-40 h-40 bg-error/10 rounded-full blur-[30px] pointer-events-none group-hover:scale-125 transition-transform duration-500" />
                  
                  <div className="flex items-center justify-between relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-error flex items-center justify-center text-on-error shadow-lg shadow-error/20 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300">
                      <PhoneCall size={24} className="animate-[pulse_2s_ease-in-out_infinite]" />
                    </div>
                    <span className="bg-error text-on-error font-extrabold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm animate-pulse">
                      Khẩn cấp
                    </span>
                  </div>

                  <div className="mt-8 relative z-10">
                    <h4 className="text-2xl font-extrabold font-headline text-on-error-container mb-2 leading-snug">
                      {emergencyFeature.title}
                    </h4>
                    <p className="text-on-error-container/80 font-medium text-[14px] font-body leading-relaxed">
                      Hệ thống tự động liên hệ xe cứu thương và cơ sở y tế gần nhất.
                    </p>
                  </div>
                  
                  <div className="w-8 h-1 bg-error/40 rounded-full mt-6 group-hover:w-1/2 transition-all duration-300 relative z-10" />
                </div>
              )}

              {/* Utility Clinic Card */}
              {hospitalFeature && (
                <div 
                  onClick={() => navigate(hospitalFeature.link)}
                  className="rounded-[32px] bg-primary text-on-primary p-8 flex flex-col justify-between cursor-pointer group hover:bg-primary/90 transition-all duration-300 relative overflow-hidden h-1/2 min-h-[240px] shadow-lg shadow-primary/20"
                >
                  <div className="absolute top-[-30px] right-[-30px] w-40 h-40 bg-white/10 rounded-full blur-[30px] pointer-events-none group-hover:scale-125 transition-transform duration-500" />
                  
                  <div className="flex items-center justify-between relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-white group-hover:text-primary transition-colors duration-300">
                      <MapPin size={24} />
                    </div>
                    <span className="bg-white/15 text-white font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm">
                      Bản đồ y tế
                    </span>
                  </div>

                  <div className="mt-8 relative z-10">
                    <h4 className="text-2xl font-extrabold font-headline text-white mb-2 leading-snug">
                      {hospitalFeature.title}
                    </h4>
                    <p className="text-white/80 font-medium text-[14px] font-body leading-relaxed">
                      Tìm kiếm chính xác bệnh viện có trung tâm can thiệp đột quỵ gần nhất.
                    </p>
                  </div>
                  
                  <div className="w-8 h-1 bg-white/40 rounded-full mt-6 group-hover:w-1/2 transition-all duration-300 relative z-10" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Health Handbook */}
      <section className="w-full bg-surface py-24">
        <div className="w-full max-w-[1200px] mx-auto px-6">
          <div className="relative rounded-[40px] bg-surface-container-lowest border border-outline-variant/40 overflow-hidden p-10 md:p-14 shadow-sm hover:shadow-xl transition-shadow duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 gap-8">
                <div className="max-w-2xl font-body">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-xl">
                      <Star size={18} className="text-primary fill-primary" />
                    </div>
                    <span className="text-primary font-black tracking-wider uppercase text-[13px]">Kiến thức y khoa</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-4 font-headline text-on-surface tracking-tight leading-tight">
                    Cẩm nang <span className="text-primary relative inline-block">
                      Sức khỏe
                      <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round"/>
                      </svg>
                    </span>
                  </h2>
                  <p className="text-on-surface-variant text-[16px] font-medium leading-relaxed max-w-xl">
                    Tổng hợp những thông tin y khoa chính thống giúp bạn chủ động bảo vệ sức khỏe bản thân và gia đình.
                  </p>
                </div>
                <button 
                  onClick={() => navigate("/knowledge")}
                  className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold hover:translate-y-[-2px] transition-all duration-300 whitespace-nowrap text-[16px] font-body soft-glow-primary"
                >
                  Khám phá ngay
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { id: 1, title: "Kiến thức đột quỵ", desc: "Dấu hiệu nhận biết sớm và quy trình xử lý khẩn cấp.", icon: BookOpen },
                  { id: 2, title: "Chế độ sinh hoạt", desc: "Xây dựng thói quen sống lành mạnh, kiểm soát huyết áp.", icon: Sun },
                  { id: 3, title: "Chất lượng giấc ngủ", desc: "Tầm quan trọng của giấc ngủ đối với phục hồi não bộ.", icon: Moon },
                  { id: 4, title: "Dinh dưỡng hợp lý", desc: "Thực đơn giảm mỡ máu và tăng cường hệ tuần hoàn.", icon: Heart },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      className="group bg-surface border border-outline-variant/60 p-7 rounded-3xl flex flex-col items-start hover:bg-surface-container-low hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 text-left shadow-sm hover:shadow-md"
                      onClick={() => navigate("/knowledge")}
                    >
                      <div className="w-14 h-14 rounded-[16px] bg-primary/10 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary text-primary">
                        <Icon size={24} strokeWidth={2.5} />
                      </div>
                      <h3 className="text-xl font-extrabold mb-3 text-on-surface font-headline tracking-tight leading-tight group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-[15px] font-medium text-on-surface-variant leading-relaxed font-body">{item.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default HomeScreen;
