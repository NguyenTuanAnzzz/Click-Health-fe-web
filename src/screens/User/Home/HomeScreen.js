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
  const hospitalFeature = features.find(f => f.id === 5);

  return (
    <UserLayout noPaddingTop={false}>
      <HeroBanner />
      
      {/* 2.AG Alternating Layout System */}
      
      {/* Section 1: Recent Activity (Pure White Canvas) */}
      <section className="w-full bg-[#ffffff] py-20 border-b border-[#e5e7eb]/60">
        <div className="w-full max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div 
              onClick={() => navigate('/history')}
              className="cursor-pointer group"
            >
              <h2 className="text-[28px] font-bold text-black font-inter tracking-tight mb-1">
                Hoạt động gần đây
              </h2>
              <div className="w-8 h-0.5 bg-[#7AB5E9] rounded-full transition-all duration-300 group-hover:w-16" />
            </div>
            <button 
              onClick={() => navigate('/history')}
              className="px-5 py-2.5 rounded-full border border-[#1F75C1]/20 text-[#1F75C1] bg-transparent text-[13px] font-bold font-inter-tight hover:bg-[#1F75C1]/5 transition-all duration-300 flex items-center gap-2"
            >
              Xem tất cả <ArrowRight size={14} strokeWidth={2.5} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-1 md:col-span-2 lg:col-span-2 h-[240px] flex flex-col items-center justify-center bg-white rounded-xl border border-[#e5e7eb] shadow-sm">
                <div className="w-8 h-8 border-2 border-[#7AB5E9]/25 border-t-[#7AB5E9] rounded-full animate-spin mb-4" />
                <p className="text-[#858585] font-semibold text-[13px] font-inter-tight">Đang tải dữ liệu...</p>
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
              <div className="col-span-1 md:col-span-2 lg:col-span-2 h-[240px] flex flex-col items-center justify-center bg-[#f5f5f5] rounded-xl border border-[#e5e7eb] p-8 text-center">
                <Activity size={32} className="text-[#1F75C1]/30 mb-3" />
                <p className="text-black font-bold text-lg mb-1 font-inter tracking-tight">Chưa có dữ liệu</p>
                <p className="text-[#858585] text-xs font-semibold font-inter-tight">Thực hiện tầm soát để theo dõi sức khỏe của bạn.</p>
              </div>
            )}
            
            <div 
              onClick={() => navigate('/befast')}
              className="hidden lg:flex border border-dashed border-[#1F75C1]/30 rounded-xl items-center justify-center p-8 bg-[#1F75C1]/5 group hover:bg-[#1F75C1]/10 transition-all duration-300 cursor-pointer h-[240px]"
            >
              <div className="text-center font-inter-tight">
                <div className="w-12 h-12 bg-[#7AB5E9] rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <Plus size={22} className="text-white" strokeWidth={2.5} />
                </div>
                <p className="text-[#1F75C1] font-bold text-[15px]">Kiểm tra BEFAST mới</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Health Ecosystem Features (Light Pearl Background) */}
      <section className="w-full bg-[#f0f1f2] py-20 border-b border-[#e5e7eb]/60">
        <div className="w-full max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-[#1F75C1]/10 text-[#1F75C1] border border-[#1F75C1]/10 px-3.5 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] mb-4 font-inter-tight">
              Dịch vụ y tế trực tuyến
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 font-inter tracking-tight">
              Hệ sinh thái sức khỏe số
            </h2>
            <p className="text-[#858585] max-w-xl mx-auto font-semibold text-[14px] font-inter-tight leading-relaxed">
              Giải pháp công nghệ đồng bộ hỗ trợ phòng ngừa, nhận biết sớm và đồng hành khôi phục sức khỏe đột quỵ
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2/3 Panel - AI Smart Screening */}
            <div className="lg:col-span-2 rounded-[24px] bg-[#ffffff] border border-[#e5e7eb]/80 p-8 flex flex-col justify-between relative overflow-hidden shadow-2xs">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#7AB5E9]/5 rounded-full blur-[50px] -mr-20 -mt-20 pointer-events-none" />
              
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <Activity size={18} className="text-[#7AB5E9]" />
                  <span className="text-[12px] font-extrabold text-[#1F75C1] uppercase tracking-wider font-inter-tight">
                    Tầm soát chuyên sâu & Phục hồi
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-black font-inter tracking-tight">
                  Chẩn đoán AI & Trị liệu
                </h3>
                <p className="text-[#858585] text-[13px] font-semibold font-inter-tight mt-1">
                  Đánh giá các chỉ số sinh trắc học cử động và luyện tập phục hồi chức năng
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              {/* Emergency Alert Card (Calls 115) */}
              {emergencyFeature && (
                <div 
                  onClick={() => window.location.href = `tel:${emergencyFeature.telNumber}`}
                  className="rounded-[24px] bg-red-50 border border-red-150 p-8 flex flex-col justify-between cursor-pointer group hover:bg-red-100 hover:border-red-200 transition-all duration-300 relative overflow-hidden h-1/2 min-h-[220px]"
                >
                  <div className="absolute top-[-30px] right-[-30px] w-36 h-36 bg-red-500/10 rounded-full blur-[20px] pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                  
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-[16px] bg-[#d32f2f] flex items-center justify-center text-white border border-[#d32f2f] shadow-md shadow-red-500/20 group-hover:scale-105 transition-all">
                      <PhoneCall size={22} className="animate-pulse" />
                    </div>
                    <span className="bg-red-500 text-white font-extrabold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full border border-red-500/20 shadow-sm animate-pulse">
                      Khẩn cấp
                    </span>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-xl font-bold font-inter text-red-800 mb-1 leading-snug">
                      {emergencyFeature.title}
                    </h4>
                    <p className="text-red-700/70 font-semibold text-[13px] font-inter-tight leading-normal">
                      Hệ thống tự động liên hệ xe cứu thương và cơ sở y tế gần nhất của bạn.
                    </p>
                  </div>
                  
                  <div className="w-6 h-0.5 bg-[#d32f2f]/30 rounded-full mt-4 group-hover:w-1/3 transition-all duration-300" />
                </div>
              )}

              {/* Utility Clinic Card */}
              {hospitalFeature && (
                <div 
                  onClick={() => navigate(hospitalFeature.link)}
                  className="rounded-[24px] bg-[#1F75C1] text-white p-8 flex flex-col justify-between cursor-pointer group hover:bg-[#1a383d] transition-all duration-300 relative overflow-hidden h-1/2 min-h-[220px] shadow-sm"
                >
                  <div className="absolute top-[-30px] right-[-30px] w-36 h-36 bg-[#BEDBF4]/10 rounded-full blur-[25px] pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                  
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-[16px] bg-white/10 flex items-center justify-center text-[#BEDBF4] border border-white/10 group-hover:bg-[#7AB5E9] group-hover:text-white group-hover:border-[#7AB5E9] transition-all">
                      <MapPin size={22} />
                    </div>
                    <span className="bg-[#BEDBF4]/15 text-[#BEDBF4] font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full border border-[#BEDBF4]/25">
                      Bản đồ y tế
                    </span>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-xl font-bold font-inter text-white mb-1 leading-snug">
                      {hospitalFeature.title}
                    </h4>
                    <p className="text-white/60 font-semibold text-[13px] font-inter-tight leading-normal">
                      Tìm kiếm chính xác bệnh viện có trung tâm can thiệp đột quỵ gần bạn nhất.
                    </p>
                  </div>
                  
                  <div className="w-6 h-0.5 bg-[#7AB5E9] rounded-full mt-4 group-hover:w-1/3 transition-all duration-300" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Health Handbook (Pure White Background) */}
      <section className="w-full bg-[#ffffff] py-20">
        <div className="w-full max-w-[1200px] mx-auto px-6">
          <div className="relative rounded-[24px] bg-[#1F75C1] text-white overflow-hidden p-8 md:p-12 shadow-lg">
            <div className="absolute inset-0 pattern-grid-lg opacity-20 pointer-events-none" />
            <div className="absolute top-[-50px] right-[-50px] w-80 h-80 bg-[#BEDBF4]/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-8">
                <div className="max-w-2xl font-inter-tight">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-[#7AB5E9]/15 border border-[#7AB5E9]/30 p-1.5 rounded-full">
                      <Star size={16} className="text-[#7AB5E9] fill-[#7AB5E9]" />
                    </div>
                    <span className="text-[#BEDBF4] font-bold tracking-wider uppercase text-[12px]">Kiến thức y khoa</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 font-inter text-white tracking-tight leading-tight">
                    Cẩm nang <span className="text-[#7AB5E9]">Sức khỏe</span>
                  </h2>
                  <p className="text-white text-[16px] font-semibold leading-relaxed max-w-xl opacity-90">
                    Tổng hợp những thông tin y khoa chính thống giúp bạn chủ động bảo vệ sức khỏe bản thân và gia đình.
                  </p>
                </div>
                <button 
                  onClick={() => navigate("/knowledge")}
                  className="bg-[#7AB5E9] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#5CA5E4] hover:scale-102 transition-all duration-300 whitespace-nowrap text-[15px] font-inter-tight shadow-md shadow-[#7AB5E9]/15"
                >
                  Khám phá ngay
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[
                  { id: 1, title: "Kiến thức đột quỵ", desc: "Dấu hiệu nhận biết sớm và quy trình xử lý khẩn cấp chuẩn y khoa.", icon: BookOpen },
                  { id: 2, title: "Chế độ sinh hoạt", desc: "Xây dựng thói quen sống lành mạnh để kiểm soát huyết áp và tim mạch.", icon: Sun },
                  { id: 3, title: "Chất lượng giấc ngủ", desc: "Tầm quan trọng của giấc ngủ đối với sự phục hồi của não bộ.", icon: Moon },
                  { id: 4, title: "Dinh dưỡng hợp lý", desc: "Thực đơn giúp giảm mỡ máu và tăng cường sức khỏe hệ tuần hoàn.", icon: Heart },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      className="group bg-white/10 border border-white/20 p-6 rounded-xl flex flex-col items-start hover:bg-white/20 hover:border-white/30 transition-all duration-300 text-left"
                      onClick={() => navigate("/knowledge")}
                    >
                      <div className="w-12 h-12 rounded-[12px] bg-white/20 flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-[#7AB5E9]/30 shadow-sm">
                        <Icon size={20} className="text-white" strokeWidth={2} />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white font-inter tracking-tight leading-tight">{item.title}</h3>
                      <p className="text-[15px] font-medium text-[#E2F1FF] leading-relaxed font-inter-tight">{item.desc}</p>
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
