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
    if (status?.is_abnormal) return <ShieldAlert size={14} className="text-[#d32f2f]" />;
    return <CheckCircle size={14} className="text-[#7AB5E9]" />;
  };

  return (
    <UserLayout noPaddingTop={false}>
      <div className="w-full max-w-[1200px] mx-auto px-6 mt-8 pb-24 bg-[#ffffff]">
        
        {/* Breadcrumb back */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#858585] hover:text-black transition-colors mb-6 font-bold text-xs uppercase tracking-wider font-inter-tight-small"
        >
          <ArrowLeft size={14} /> Quay lại
        </button>

        {/* 2.AG Styled Header Section */}
        <div className="relative rounded-[24px] bg-[#1F75C1] text-white p-8 md:p-12 mb-10 overflow-hidden shadow-lg">
          <div className="absolute inset-0 pattern-grid-lg opacity-25 pointer-events-none" />
          <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-[#BEDBF4]/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex items-center justify-between font-inter-tight-small">
            <div>
              <div className="inline-block bg-[#7AB5E9]/15 text-[#7AB5E9] border border-[#7AB5E9]/30 px-4 py-1.5 rounded-full font-bold uppercase tracking-wider text-[10px] mb-6">
                Nhật ký Sức khỏe cá nhân
              </div>
              <h1 className="text-3xl md:text-5xl font-bold font-inter text-white tracking-tight mb-4 leading-tight">
                Lịch sử <span className="text-[#7AB5E9]">kiểm tra</span>
              </h1>
              <p className="text-white/70 text-[14px] font-medium leading-relaxed max-w-xl">
                Theo dõi, thống kê và quản lý các lượt phân tích nguy cơ đột quỵ sớm bằng AI thông qua camera BeFast AI và chẩn đoán chỉ số BMI.
              </p>
            </div>
            <div className="hidden md:flex w-16 h-16 bg-white/10 rounded-[16px] border border-white/15 items-center justify-center shadow-lg">
              <Clock size={28} className="text-[#BEDBF4]" />
            </div>
          </div>
        </div>

        {/* Dynamic Capsule Tab Selector */}
        <div className="flex gap-2 p-1.5 bg-[#f0f1f2] border border-[#e5e7eb] rounded-2xl mb-10 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab("befast")}
            className={`flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === "befast"
                ? "bg-[#1F75C1] text-white shadow-md"
                : "text-[#1F75C1] hover:bg-white/50"
            }`}
          >
            <Brain size={15} /> Tầm soát BEFAST AI
          </button>
          <button
            onClick={() => setActiveTab("bmi")}
            className={`flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === "bmi"
                ? "bg-[#1F75C1] text-white shadow-md"
                : "text-[#1F75C1] hover:bg-white/50"
            }`}
          >
            <Scale size={15} /> BMI & Đột quỵ
          </button>
        </div>

        {/* Main Content Area */}
        <div>
          {activeTab === "befast" ? (
            /* TAB 1: BEFAST AI HISTORY */
            loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-10 h-10 border-2 border-[#7AB5E9]/25 border-t-[#7AB5E9] rounded-full animate-spin mb-4" />
                <p className="text-[#858585] font-semibold text-[13px] font-inter-tight-small">Đang tải dữ liệu lịch sử BeFast...</p>
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-16 bg-[#f0f1f2] rounded-[24px] border border-[#e5e7eb]/80 max-w-2xl mx-auto px-8">
                <Activity size={48} className="text-[#1F75C1]/20 mx-auto mb-5" />
                <h3 className="text-xl font-bold text-black font-inter tracking-tight mb-2">Chưa có dữ liệu</h3>
                <p className="text-[#858585] text-[13px] font-semibold font-inter-tight-small mb-8">
                  Bạn chưa thực hiện bất kỳ lượt tầm soát BEFAST bằng camera nào.
                </p>
                <button 
                  onClick={() => navigate('/befast')}
                  className="bg-[#7AB5E9] text-white px-8 py-3 rounded-full font-bold hover:bg-[#5CA5E4] hover:scale-[1.01] transition-all duration-300 text-[13px] font-inter-tight-small shadow-sm shadow-[#7AB5E9]/15 cursor-pointer"
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
                      className="rounded-[20px] bg-[#f5f5f5] border border-[#e5e7eb] p-6 flex flex-col justify-between hover:bg-[#ececec] hover:border-[#1F75C1]/20 hover:shadow-xs transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Tiny visual indicators line */}
                      <div className={`absolute top-0 left-0 w-1.5 h-full transition-colors ${isDanger ? 'bg-[#d32f2f]' : 'bg-[#7AB5E9]'}`} />
                      
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-4 font-inter-tight-small text-left">
                          <div className="flex items-center gap-2.5">
                            <span className="bg-[#1F75C1]/10 text-[#1F75C1] px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                              #{record._id.slice(-4).toUpperCase()}
                            </span>
                            <span className="text-[#858585] text-[12px] font-semibold">
                              {date.toLocaleDateString('vi-VN')} {date.toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}
                            </span>
                          </div>
                          <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center border shadow-2xs ${isDanger ? 'bg-red-50 border-red-100 text-[#d32f2f]' : 'bg-green-50 border-green-100 text-[#7AB5E9]'}`}>
                            {isDanger ? <ShieldAlert size={16} /> : <CheckCircle size={16} />}
                          </div>
                        </div>
                        
                        <h3 className={`text-xl font-bold font-inter leading-snug mt-2 text-left ${isDanger ? 'text-[#d32f2f]' : 'text-black'}`}>
                          {isDanger ? 'Phát hiện nguy cơ đột quỵ' : 'Trạng thái bình thường'}
                        </h3>
                      </div>

                      <div className="bg-white rounded-xl p-4 border border-[#e5e7eb] mb-2 font-inter-tight-small text-left">
                        <h4 className="text-[10px] font-extrabold uppercase text-[#1F75C1] tracking-widest mb-3">Kết quả phân tích chi tiết</h4>
                        {isMriOnly ? (
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100">
                              <span className="text-gray-500 font-medium">Bệnh lý:</span>
                              <span className={`font-bold ${isDanger ? 'text-red-600' : 'text-green-600'}`}>
                                {record.mri?.diagnosis || "Chưa xác định"}
                              </span>
                            </div>
                            <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100">
                              <span className="text-gray-500 font-medium">Độ tin cậy:</span>
                              <span className="font-bold text-[#1E293B]">
                                {record.mri?.confidence_percent ? `${record.mri.confidence_percent}%` : "N/A"}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-3.5">
                            <div className="flex items-center gap-2 text-[13px] font-semibold text-[#151515]">
                              {renderStatusIcon(record.balance)}
                              <span className="flex-1">Thăng bằng</span>
                            </div>
                            <div className="flex items-center gap-2 text-[13px] font-semibold text-[#151515]">
                              {renderStatusIcon(record.eyes)}
                              <span className="flex-1">Tầm nhìn</span>
                            </div>
                            <div className="flex items-center gap-2 text-[13px] font-semibold text-[#151515] col-span-2 border-t border-[#e5e7eb]/60 pt-2">
                              {renderStatusIcon(record.face)}
                              <span className="flex-1">Cơ mặt {record.face?.deviation_percentage ? `(Lệch ${record.face.deviation_percentage}%)` : ''}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[13px] font-semibold text-[#151515]">
                              {renderStatusIcon(record.arm)}
                              <span className="flex-1">Cánh tay</span>
                            </div>
                            <div className="flex items-center gap-2 text-[13px] font-semibold text-[#151515]">
                              {renderStatusIcon(record.speech)}
                              <span className="flex-1">Giọng nói</span>
                            </div>
                          </div>
                        )}

                        {/* HIỂN THỊ VIDEO NẾU CÓ */}
                        {record.videoKey && (
                          <div className="mt-4 border-t border-[#e5e7eb]/60 pt-4">
                            <h4 className="text-[10px] font-extrabold uppercase text-[#1F75C1] tracking-widest mb-2 flex items-center gap-1.5">
                              <Eye size={13} className="text-[#1F75C1]" /> Xem lại quá trình kiểm tra
                            </h4>
                            <SecureVideoPlayer videoKey={record.videoKey} />
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
                <div className="w-10 h-10 border-2 border-[#7AB5E9]/25 border-t-[#7AB5E9] rounded-full animate-spin mb-4" />
                <p className="text-[#858585] font-semibold text-[13px] font-inter-tight-small">Đang tải dữ liệu lịch sử BMI...</p>
              </div>
            ) : bmiData.length === 0 ? (
              <div className="text-center py-16 bg-[#f0f1f2] rounded-[24px] border border-[#e5e7eb]/80 max-w-2xl mx-auto px-8">
                <Scale size={48} className="text-[#1F75C1]/20 mx-auto mb-5" />
                <h3 className="text-xl font-bold text-black font-inter tracking-tight mb-2">Chưa có lịch sử đo BMI</h3>
                <p className="text-[#858585] text-[13px] font-semibold font-inter-tight-small mb-8">
                  Bạn chưa thực hiện bất kỳ lượt tầm soát sức khỏe & tính toán BMI nào.
                </p>
                <button 
                  onClick={() => navigate('/stroke-risk-score')}
                  className="bg-[#7AB5E9] text-white px-8 py-3 rounded-full font-bold hover:bg-[#5CA5E4] hover:scale-[1.01] transition-all duration-300 text-[13px] font-inter-tight-small shadow-sm shadow-[#7AB5E9]/15 cursor-pointer"
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
                    text: "text-[#7AB5E9]",
                    bg: "bg-[#7AB5E9]/10",
                    border: "border-[#7AB5E9]/20",
                    bar: "bg-[#7AB5E9]"
                  };
                  if (riskCat === "Trung bình") {
                    riskTheme = {
                      text: "text-amber-500",
                      bg: "bg-amber-50",
                      border: "border-amber-200",
                      bar: "bg-amber-500"
                    };
                  } else if (riskCat === "Cao") {
                    riskTheme = {
                      text: "text-red-500",
                      bg: "bg-red-50",
                      border: "border-red-200",
                      bar: "bg-red-500"
                    };
                  }

                  return (
                    <div 
                      key={record._id || record.id} 
                      className="rounded-[20px] bg-[#f5f5f5] border border-[#e5e7eb] p-6 flex flex-col justify-between hover:bg-[#ececec] hover:border-[#1F75C1]/20 hover:shadow-xs transition-all duration-300 relative overflow-hidden text-left"
                    >
                      {/* Left border strip */}
                      <div className={`absolute top-0 left-0 w-1.5 h-full transition-colors ${riskTheme.bar}`} />
                      
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-4 font-inter-tight-small text-left">
                          <div className="flex items-center gap-2.5">
                            <span className="bg-[#1F75C1]/10 text-[#1F75C1] px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                              #{record._id ? record._id.slice(-4).toUpperCase() : "BMI"}
                            </span>
                            <span className="text-[#858585] text-[12px] font-semibold">
                              {date.toLocaleDateString('vi-VN')} {date.toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}
                            </span>
                          </div>
                          <div className={`w-10 h-10 rounded-[10px] flex flex-col items-center justify-center border font-extrabold text-[12px] shadow-2xs ${riskTheme.bg} ${riskTheme.text} ${riskTheme.border}`}>
                            <span className="text-[10px] font-bold opacity-60">Risk</span>
                            <span>{record.riskPercentage}%</span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold font-inter leading-snug mt-2 text-black">
                          Nguy cơ đột quỵ: <span className={riskTheme.text}>{riskCat}</span>
                        </h3>
                      </div>

                      {/* Patient and Body Stats Grid */}
                      <div className="bg-white rounded-xl p-4 border border-[#e5e7eb] mb-4 font-inter-tight-small text-xs space-y-2 text-left">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <span className="text-[#858585] block text-[9px] uppercase font-bold tracking-wider mb-0.5">Chiều cao</span>
                            <span className="text-black font-extrabold text-sm">{record.height} cm</span>
                          </div>
                          <div>
                            <span className="text-[#858585] block text-[9px] uppercase font-bold tracking-wider mb-0.5">Cân nặng</span>
                            <span className="text-black font-extrabold text-sm">{record.weight} kg</span>
                          </div>
                          <div className="col-span-2 border-t border-[#e5e7eb]/60 pt-2 flex justify-between items-center">
                            <div>
                              <span className="text-[#858585] text-[9px] uppercase font-bold tracking-wider mb-0.5 block">Chỉ số BMI cơ thể</span>
                              <span className="text-black font-extrabold text-sm">{record.bmi} kg/m²</span>
                            </div>
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                              record.bmiCategory === "Bình thường" ? "bg-green-50 text-[#7AB5E9] border-green-100" :
                              record.bmiCategory === "Thiếu cân" ? "bg-blue-50 text-blue-500 border-blue-100" :
                              "bg-amber-50 text-amber-600 border-amber-100"
                            }`}>
                              {record.bmiCategory}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Health history in calculation */}
                      <div className="bg-white rounded-xl p-4 border border-[#e5e7eb] mb-4 font-inter-tight-small text-xs space-y-2 text-left">
                        <h4 className="text-[9px] font-extrabold uppercase text-[#1F75C1] tracking-widest mb-2 border-b border-[#e5e7eb]/60 pb-1.5 flex items-center gap-1">
                          <Activity size={12} className="text-[#7AB5E9]" /> Chỉ số bệnh lý & sinh hoạt
                        </h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 font-semibold">
                          <div className="flex justify-between">
                            <span className="text-[#858585]">Tuổi đo:</span>
                            <span className="text-black font-bold">{record.userAge || "N/A"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#858585]">Đường huyết:</span>
                            <span className="text-black font-bold">{record.glucoseLevel} mg/dL</span>
                          </div>
                          <div className="flex justify-between border-t border-[#e5e7eb]/40 pt-1.5">
                            <span className="text-[#858585]">Huyết áp:</span>
                            <span className={record.hypertension ? "text-red-500 font-extrabold" : "text-black font-bold"}>
                              {record.hypertension ? "Cao" : "Thường"}
                            </span>
                          </div>
                          <div className="flex justify-between border-t border-[#e5e7eb]/40 pt-1.5">
                            <span className="text-[#858585]">Hút thuốc:</span>
                            <span className="text-black font-bold truncate max-w-[80px]" title={record.smokingStatus}>
                              {record.smokingStatus}
                            </span>
                          </div>
                          <div className="flex justify-between col-span-2 border-t border-[#e5e7eb]/40 pt-1.5">
                            <span className="text-[#858585]">Bệnh tim mạch:</span>
                            <span className={record.heartDisease ? "text-red-500 font-extrabold" : "text-black font-bold"}>
                              {record.heartDisease ? "Có" : "Không"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Recommendation Box */}
                      {record.recommendation && (
                        <div className={`rounded-xl p-4 border text-[11px] font-semibold leading-relaxed text-left ${riskTheme.bg} ${riskTheme.text} ${riskTheme.border}`}>
                          <p className="font-extrabold uppercase text-[9px] tracking-wider mb-1 flex items-center gap-1.5">
                            <ShieldAlert size={13} /> Khuyến nghị Y tế:
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
