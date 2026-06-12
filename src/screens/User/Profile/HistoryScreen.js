import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  ArrowLeft, Activity, Eye, Smile, UserCircle2, Mic, Clock, 
  ShieldAlert, CheckCircle, Brain, Scale, Heart, Navigation, Info
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserLayout from "../../../layouts/UserLayout";
import { fetchMyHistory, fetchMyBmiHistory } from "../../../store/slices/historySlice";
import SecureVideoPlayer from "../../../components/SecureVideoPlayer";

const HistoryScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { data: history, loading, bmiData, bmiLoading } = useSelector((state) => state.history);
  const [activeTab, setActiveTab] = useState("befast");

  useEffect(() => {
    dispatch(fetchMyHistory());
    dispatch(fetchMyBmiHistory());
  }, [dispatch]);

  const renderStatusIcon = (status) => {
    if (status?.is_abnormal) return <ShieldAlert size={14} className="text-error" />;
    return <CheckCircle size={14} className="text-primary" />;
  };

  return (
    <UserLayout noPaddingTop={false}>
      <div className="w-full max-w-[1200px] mx-auto px-6 mt-8 pb-24 bg-surface font-body">
        
        {/* Breadcrumb back */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors mb-6 font-bold text-sm uppercase tracking-wider"
        >
          <ArrowLeft size={14} /> Quay lại
        </button>

        {/* Header Section */}
        <div className="relative rounded-[32px] bg-primary text-white p-8 md:p-12 mb-10 overflow-hidden shadow-xl shadow-primary/10">
          <div className="absolute inset-0 pattern-grid-lg opacity-25 pointer-events-none" />
          <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="inline-block bg-white/10 text-white border border-white/20 px-4 py-1.5 rounded-full font-bold uppercase tracking-wider text-[15px] mb-6">
                Nhật ký Sức khỏe cá nhân
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold font-headline tracking-tight mb-4 leading-tight text-white">
                Lịch sử <span className="text-secondary-container">kiểm tra</span>
              </h1>
              <p className="text-white/80 text-[15px] font-medium leading-relaxed max-w-xl">
                Theo dõi, thống kê và quản lý các lượt phân tích nguy cơ đột quỵ sớm bằng AI thông qua camera BeFast AI và chẩn đoán chỉ số BMI.
              </p>
            </div>
            <div className="hidden md:flex flex-shrink-0 relative mr-8">
              <div className="absolute inset-0 bg-white/20 blur-[40px] rounded-full pointer-events-none" />
              <img 
                src="/history.png" 
                alt="History" 
                className="w-40 h-40 md:w-56 md:h-56 object-contain drop-shadow-2xl relative z-10 hover:scale-110 hover:-rotate-3 transition-all duration-700" 
              />
            </div>
          </div>
        </div>

        {/* Dynamic Capsule Tab Selector */}
        <div className="flex gap-2 p-2 bg-surface-container-low border border-outline-variant/50 rounded-2xl mb-10 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab("befast")}
            className={`flex-1 flex items-center justify-center gap-2.5 py-5 px-4 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === "befast"
                ? "bg-primary text-on-primary shadow-md"
                : "text-on-surface-variant hover:bg-surface hover:text-on-surface"
            }`}
          >
            <Brain size={16} /> Tầm soát BEFAST AI
          </button>
          <button
            onClick={() => setActiveTab("bmi")}
            className={`flex-1 flex items-center justify-center gap-2.5 py-5 px-4 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === "bmi"
                ? "bg-primary text-on-primary shadow-md"
                : "text-on-surface-variant hover:bg-surface hover:text-on-surface"
            }`}
          >
            <Scale size={16} /> BMI & Đột quỵ
          </button>
        </div>

        {/* Main Content Area */}
        <div>
          {activeTab === "befast" ? (
            /* TAB 1: BEFAST AI HISTORY */
            loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-10 h-10 border-2 border-primary/25 border-t-primary rounded-full animate-spin mb-4" />
                <p className="text-on-surface-variant font-medium text-[18px]">Đang tải dữ liệu lịch sử BeFast...</p>
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-[32px] border border-outline-variant/40 max-w-2xl mx-auto px-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden group">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/5 rounded-full blur-[40px] pointer-events-none" />
                <div className="relative z-10 w-36 h-36 mx-auto mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <img src="/history.png" alt="Chưa có dữ liệu BEFAST" className="w-full h-full object-contain drop-shadow-xl" />
                </div>
                <h3 className="text-2xl font-black text-[#1E293B] font-headline tracking-tight mb-3 relative z-10">Chưa có dữ liệu BEFAST</h3>
                <p className="text-slate-500 text-[15px] font-medium mb-10 relative z-10 max-w-md mx-auto">
                  Bạn chưa thực hiện bất kỳ lượt tầm soát BEFAST bằng AI camera nào.
                </p>
                <button 
                  onClick={() => navigate('/befast')}
                  className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold hover:translate-y-[-2px] hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 text-[18px] cursor-pointer"
                >
                  Kiểm tra ngay
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {history.map((record) => {
                  const date = new Date(record.createdAt);
                  const isDanger = record.conclusion?.isDanger;
                  const isMriOnly = record.conclusion?.analysisMode === "mri_only";

                  return (
                    <div 
                      key={record._id} 
                      className="rounded-[24px] bg-surface border border-outline-variant/60 p-6 flex flex-col justify-between hover:bg-surface-container-lowest hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Tiny visual indicators line */}
                      <div className={`absolute top-0 left-0 w-2 h-full transition-colors ${isDanger ? 'bg-error' : 'bg-primary'}`} />
                      
                      <div className="mb-6 pl-2">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2.5">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[15px] font-extrabold uppercase tracking-wider">
                              #{record._id.slice(-4).toUpperCase()}
                            </span>
                            <span className="text-on-surface-variant text-[16px] font-medium">
                              {date.toLocaleDateString('vi-VN')} {date.toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}
                            </span>
                          </div>
                          <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center border shadow-sm ${isDanger ? 'bg-error/10 border-error/20 text-error' : 'bg-primary/10 border-primary/20 text-primary'}`}>
                            {isDanger ? <ShieldAlert size={20} /> : <CheckCircle size={20} />}
                          </div>
                        </div>
                        
                        <h3 className={`text-xl font-extrabold font-headline leading-snug mt-2 text-left ${isDanger ? 'text-error' : 'text-on-surface'}`}>
                          {isDanger ? 'Phát hiện nguy cơ đột quỵ' : 'Trạng thái bình thường'}
                        </h3>
                      </div>

                      <div className="bg-surface-container-low rounded-[20px] p-5 border border-outline-variant/50 mb-2 pl-5 ml-2">
                        <h4 className="text-[16px] font-extrabold uppercase text-primary tracking-widest mb-4">Kết quả phân tích chi tiết</h4>
                        {isMriOnly ? (
                          <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center bg-surface p-3.5 rounded-xl border border-outline-variant/50">
                              <span className="text-on-surface-variant font-medium text-[16px]">Bệnh lý:</span>
                              <span className={`font-bold text-[18px] ${isDanger ? 'text-error' : 'text-primary'}`}>
                                {record.mri?.diagnosis || "Chưa xác định"}
                              </span>
                            </div>
                            <div className="flex justify-between items-center bg-surface p-3.5 rounded-xl border border-outline-variant/50">
                              <span className="text-on-surface-variant font-medium text-[16px]">Độ tin cậy:</span>
                              <span className="font-bold text-on-surface text-[18px]">
                                {record.mri?.confidence_percent ? `${record.mri.confidence_percent}%` : "N/A"}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2.5 text-[18px] font-semibold text-on-surface">
                              {renderStatusIcon(record.balance)}
                              <span className="flex-1">Thăng bằng</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-[18px] font-semibold text-on-surface">
                              {renderStatusIcon(record.eyes)}
                              <span className="flex-1">Tầm nhìn</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-[18px] font-semibold text-on-surface col-span-2 border-t border-outline-variant/40 pt-3">
                              {renderStatusIcon(record.face)}
                              <span className="flex-1">Cơ mặt {record.face?.deviation_percentage ? `(Lệch ${record.face.deviation_percentage}%)` : ''}</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-[18px] font-semibold text-on-surface">
                              {renderStatusIcon(record.arm)}
                              <span className="flex-1">Cánh tay</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-[18px] font-semibold text-on-surface">
                              {renderStatusIcon(record.speech)}
                              <span className="flex-1">Giọng nói</span>
                            </div>
                          </div>
                        )}

                        {record.videoKey && (
                          <div className="mt-5 border-t border-outline-variant/40 pt-5">
                            <h4 className="text-[16px] font-extrabold uppercase text-primary tracking-widest mb-3 flex items-center gap-1.5">
                              <Eye size={15} className="text-primary" /> Xem lại quá trình kiểm tra
                            </h4>
                            <div className="rounded-xl overflow-hidden border border-outline-variant/50 shadow-sm">
                              <SecureVideoPlayer videoKey={record.videoKey} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            /* TAB 2: BMI & STROKE RISK HISTORY */
            bmiLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-10 h-10 border-2 border-primary/25 border-t-primary rounded-full animate-spin mb-4" />
                <p className="text-on-surface-variant font-medium text-[18px]">Đang tải dữ liệu lịch sử BMI...</p>
              </div>
            ) : bmiData.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-[32px] border border-outline-variant/40 max-w-2xl mx-auto px-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden group">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/5 rounded-full blur-[40px] pointer-events-none" />
                <div className="relative z-10 w-36 h-36 mx-auto mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <img src="/cal.png" alt="Chưa có lịch sử BMI" className="w-full h-full object-contain drop-shadow-xl" />
                </div>
                <h3 className="text-2xl font-black text-[#1E293B] font-headline tracking-tight mb-3 relative z-10">Chưa có lịch sử đo BMI</h3>
                <p className="text-slate-500 text-[15px] font-medium mb-10 relative z-10 max-w-md mx-auto">
                  Bạn chưa thực hiện bất kỳ lượt tầm soát sức khỏe & tính toán BMI nào.
                </p>
                <button 
                  onClick={() => navigate('/stroke-risk-score')}
                  className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold hover:translate-y-[-2px] hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 text-[18px] cursor-pointer"
                >
                  Tính toán ngay
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {bmiData.map((record) => {
                  const date = new Date(record.createdAt);
                  const riskCat = record.riskCategory;
                  
                  let riskTheme = {
                    text: "text-primary",
                    bg: "bg-primary/10",
                    border: "border-primary/20",
                    bar: "bg-primary"
                  };
                  if (riskCat === "Trung bình") {
                    riskTheme = {
                      text: "text-amber-500",
                      bg: "bg-amber-500/10",
                      border: "border-amber-500/20",
                      bar: "bg-amber-500"
                    };
                  } else if (riskCat === "Cao") {
                    riskTheme = {
                      text: "text-error",
                      bg: "bg-error/10",
                      border: "border-error/20",
                      bar: "bg-error"
                    };
                  }

                  return (
                    <div 
                      key={record._id || record.id} 
                      className="rounded-[24px] bg-surface border border-outline-variant/60 p-6 flex flex-col justify-between hover:bg-surface-container-lowest hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden text-left"
                    >
                      {/* Left border strip */}
                      <div className={`absolute top-0 left-0 w-2 h-full transition-colors ${riskTheme.bar}`} />
                      
                      <div className="mb-6 pl-2">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2.5">
                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[15px] font-extrabold uppercase tracking-wider">
                              #{record._id ? record._id.slice(-4).toUpperCase() : "BMI"}
                            </span>
                            <span className="text-on-surface-variant text-[16px] font-medium">
                              {date.toLocaleDateString('vi-VN')} {date.toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}
                            </span>
                          </div>
                          <div className={`w-12 h-12 rounded-[14px] flex flex-col items-center justify-center border font-extrabold text-[16px] shadow-sm ${riskTheme.bg} ${riskTheme.text} ${riskTheme.border}`}>
                            <span className="text-[15px] font-bold opacity-70">Risk</span>
                            <span>{record.riskPercentage}%</span>
                          </div>
                        </div>

                        <h3 className="text-xl font-extrabold font-headline leading-snug mt-2 text-on-surface">
                          Nguy cơ đột quỵ: <span className={riskTheme.text}>{riskCat}</span>
                        </h3>
                      </div>

                      {/* Stats Grid */}
                      <div className="bg-surface-container-low rounded-[20px] p-5 border border-outline-variant/50 mb-4 pl-5 ml-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-on-surface-variant block text-[15px] uppercase font-extrabold tracking-wider mb-1">Chiều cao</span>
                            <span className="text-on-surface font-extrabold text-[15px]">{record.height} cm</span>
                          </div>
                          <div>
                            <span className="text-on-surface-variant block text-[15px] uppercase font-extrabold tracking-wider mb-1">Cân nặng</span>
                            <span className="text-on-surface font-extrabold text-[15px]">{record.weight} kg</span>
                          </div>
                          <div className="col-span-2 border-t border-outline-variant/40 pt-3 flex justify-between items-center">
                            <div>
                              <span className="text-on-surface-variant text-[15px] uppercase font-extrabold tracking-wider mb-1 block">Chỉ số BMI cơ thể</span>
                              <span className="text-on-surface font-extrabold text-[15px]">{record.bmi} kg/m²</span>
                            </div>
                            <span className={`px-3 py-1.5 rounded-full text-[16px] font-extrabold uppercase tracking-wider border ${
                              record.bmiCategory === "Bình thường" ? "bg-primary/10 text-primary border-primary/20" :
                              record.bmiCategory === "Thiếu cân" ? "bg-secondary-container/20 text-secondary-container border-secondary-container/30" :
                              "bg-amber-500/10 text-amber-600 border-amber-500/20"
                            }`}>
                              {record.bmiCategory}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Health history */}
                      <div className="bg-surface-container-low rounded-[20px] p-5 border border-outline-variant/50 mb-4 pl-5 ml-2">
                        <h4 className="text-[16px] font-extrabold uppercase text-primary tracking-widest mb-3 border-b border-outline-variant/40 pb-2 flex items-center gap-1.5">
                          <Activity size={14} className="text-primary" /> Chỉ số bệnh lý & sinh hoạt
                        </h4>
                        <div className="grid grid-cols-2 gap-x-5 gap-y-3 font-semibold text-[16px]">
                          <div className="flex justify-between">
                            <span className="text-on-surface-variant">Tuổi đo:</span>
                            <span className="text-on-surface font-bold">{record.userAge || "N/A"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-on-surface-variant">Đường huyết:</span>
                            <span className="text-on-surface font-bold">{record.glucoseLevel} mg/dL</span>
                          </div>
                          <div className="flex justify-between border-t border-outline-variant/30 pt-2">
                            <span className="text-on-surface-variant">Huyết áp:</span>
                            <span className={record.hypertension ? "text-error font-extrabold" : "text-on-surface font-bold"}>
                              {record.hypertension ? "Cao" : "Thường"}
                            </span>
                          </div>
                          <div className="flex justify-between border-t border-outline-variant/30 pt-2">
                            <span className="text-on-surface-variant">Hút thuốc:</span>
                            <span className="text-on-surface font-bold truncate max-w-[80px]" title={record.smokingStatus}>
                              {record.smokingStatus}
                            </span>
                          </div>
                          <div className="flex justify-between col-span-2 border-t border-outline-variant/30 pt-2">
                            <span className="text-on-surface-variant">Bệnh tim mạch:</span>
                            <span className={record.heartDisease ? "text-error font-extrabold" : "text-on-surface font-bold"}>
                              {record.heartDisease ? "Có" : "Không"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Recommendation Box */}
                      {record.recommendation && (
                        <div className={`rounded-xl p-4 border text-[16px] font-medium leading-relaxed text-left ml-2 ${riskTheme.bg} ${riskTheme.text} ${riskTheme.border}`}>
                          <p className="font-extrabold uppercase text-[15px] tracking-widest mb-1.5 flex items-center gap-1.5">
                            <ShieldAlert size={14} /> Khuyến nghị Y tế:
                          </p>
                          {record.recommendation}
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default HistoryScreen;
