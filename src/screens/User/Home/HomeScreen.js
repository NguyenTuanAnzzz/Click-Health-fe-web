import React, { useEffect } from "react";
import { BookOpen, Sun, Moon, Heart, Activity, Smile, Coffee, ArrowRight, Star, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import UserLayout from "../../../layouts/UserLayout";
import RecentCheckCard from "../../../components/ui/RecentCheckCard";
import ItemMainFunction from "../../../components/ui/ItemMainFunction";
import features from "../../../constants/homeFeatures";
import HeroBanner from "../../../components/ui/HeroBanner";
import HorizontalRow from "../../../components/ui/HorizontalRow";
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

  return (
    <UserLayout>
      <HeroBanner />
      
      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 mt-12 pb-24 bg-background">
        
        {/* Recent Activity Section */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div 
              onClick={() => navigate('/history')}
              className="cursor-pointer group"
            >
              <h2 className="text-3xl font-semibold text-main mb-1">Hoạt động gần đây</h2>
              <div className="w-12 h-1 bg-primary rounded-full transition-all group-hover:w-20" />
            </div>
            <button 
              onClick={() => navigate('/history')}
              className="bg-white border border-border/40 text-main px-5 py-2 rounded-md font-medium flex items-center gap-2 hover:bg-neutral transition-all shadow-sm"
            >
              Xem tất cả <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-1 md:col-span-2 lg:col-span-2 h-[240px] flex flex-col items-center justify-center bg-white rounded-lg border border-border/20 shadow-sm">
                <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
                <p className="text-secondary font-medium">Đang tải dữ liệu...</p>
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
              <div className="col-span-1 md:col-span-2 lg:col-span-2 h-[240px] flex flex-col items-center justify-center bg-white rounded-lg border border-border/20 p-8 text-center shadow-sm">
                <Activity size={40} className="text-primary/20 mb-3" />
                <p className="text-main font-semibold text-xl mb-2">Chưa có dữ liệu</p>
                <p className="text-secondary text-sm">Thực hiện tầm soát để theo dõi sức khỏe của bạn.</p>
              </div>
            )}
            
            <div 
              onClick={() => navigate('/befast')}
              className="hidden lg:flex border border-dashed border-primary/30 rounded-lg items-center justify-center p-8 bg-primary/5 group hover:bg-primary/10 transition-all cursor-pointer h-[240px]"
            >
              <div className="text-center">
                <div className="w-14 h-14 bg-primary rounded-md flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  <Plus size={28} className="text-white" strokeWidth={2.5} />
                </div>
                <p className="text-primary font-semibold text-lg">Kiểm tra BEFAST mới</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Features Grid */}
        <div className="mb-20 relative rounded-xl bg-white border border-border/20 p-10 md:p-14 shadow-sm overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -mr-40 -mt-40 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-sm font-semibold uppercase tracking-wider text-[0.7rem] mb-4 border border-primary/20">
                Dịch vụ y tế trực tuyến
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold text-main mb-4 leading-tight">
                Hệ sinh thái <span className="text-primary">Click Health</span>
              </h2>
              <p className="text-secondary max-w-2xl mx-auto font-medium text-lg mt-4">Giải pháp công nghệ hỗ trợ phòng ngừa và nhận biết sớm nguy cơ đột quỵ</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {features.map((d) => (
                <ItemMainFunction
                  key={d.id}
                  title={d.title}
                  nameIcon={d.icon}
                  danger={d.danger}
                  primary={d.primary}
                  link={d.link}
                  telNumber={d.telNumber}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Health Handbook Section */}
        <div className="relative rounded-xl bg-main text-white overflow-hidden p-10 md:p-16 mb-20 shadow-lg">
          <div className="absolute top-0 right-0 w-full h-full pattern-grid-lg opacity-5" />
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary p-2 rounded-sm shadow-sm">
                    <Star size={24} className="text-white fill-white" />
                  </div>
                  <span className="text-primary-light font-semibold tracking-widest uppercase text-xs">Kiến thức y khoa</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight text-white">Cẩm nang <span className="text-primary-light">Sức khỏe</span></h2>
                <p className="text-white/70 text-lg font-medium leading-relaxed">Tổng hợp những thông tin y khoa chính thống giúp bạn chủ động bảo vệ sức khỏe bản thân và gia đình.</p>
              </div>
              <button 
                onClick={() => navigate("/knowledge")}
                className="bg-primary text-white px-10 py-4 rounded-md font-semibold hover:bg-primary-dark transition-all whitespace-nowrap text-lg shadow-md active:scale-95"
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
                    className="group bg-white/5 border border-white/10 p-6 rounded-lg flex flex-col items-start hover:bg-white/10 transition-all text-left shadow-sm"
                    onClick={() => navigate("/knowledge")}
                  >
                    <div className="w-12 h-12 rounded-md bg-white/10 flex items-center justify-center mb-6 transition-colors">
                      <Icon size={24} className="text-primary-light" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white leading-tight">{item.title}</h3>
                    <p className="text-sm font-medium text-white/50 line-clamp-3 leading-relaxed">{item.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </UserLayout>
  );
};

export default HomeScreen;
