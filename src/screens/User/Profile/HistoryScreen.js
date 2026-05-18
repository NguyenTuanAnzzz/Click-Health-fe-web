import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Activity, Eye, Smile, UserCircle2, Mic, Clock, ShieldAlert, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserLayout from "../../../layouts/UserLayout";
import { fetchMyHistory } from "../../../store/slices/historySlice";

const HistoryScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: history, loading } = useSelector((state) => state.history);

  useEffect(() => {
    dispatch(fetchMyHistory());
  }, [dispatch]);

  const renderStatusIcon = (status) => {
    if (status?.is_abnormal) return <ShieldAlert size={16} className="text-danger" />;
    return <CheckCircle size={16} className="text-green-500" />;
  };

  return (
    <UserLayout noPaddingTop>
      <div className="bg-primary-dark pt-32 pb-16 px-4 md:px-8 lg:px-12 border-b-8 border-accent relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -mr-20 -mt-20" />
        <div className="max-w-[1200px] mx-auto relative z-10 flex items-center justify-between">
          <div>
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-main/80 hover:text-accent transition-colors mb-6 font-bold"
            >
              <ArrowLeft size={20} /> Quay lại
            </button>
            <h1 className="text-4xl md:text-6xl font-black text-main uppercase italic">
              Lịch sử <span className="text-accent">kiểm tra</span>
            </h1>
            <p className="text-main/70 mt-4 text-lg font-bold">Theo dõi và quản lý các kết quả tầm soát BEFAST của bạn.</p>
          </div>
          <div className="hidden md:flex w-24 h-24 bg-surface/10 rounded-3xl border-2 border-accent/30 items-center justify-center rotate-12 shadow-accent-glow">
            <Clock size={40} className="text-accent" />
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin mb-4" />
            <p className="text-main font-bold italic">Đang tải dữ liệu...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-20 bg-surface/5 rounded-[3rem] border-4 border-dashed border-border">
            <Activity size={64} className="text-primary-dark/20 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-main mb-2">Chưa có dữ liệu</h3>
            <p className="text-main/60 font-bold mb-8">Bạn chưa thực hiện bài kiểm tra BEFAST nào.</p>
            <button 
              onClick={() => navigate('/befast')}
              className="btn-primary-game"
            >
              Kiểm tra ngay
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {history.map((record) => {
              const date = new Date(record.createdAt);
              const isDanger = record.conclusion?.isDanger;

              return (
                <div key={record._id} className="game-card flex flex-col group cursor-pointer hover:-translate-y-2">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-primary/10 text-primary-dark px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                          #{record._id.slice(-4).toUpperCase()}
                        </span>
                        <span className="text-main/50 text-sm font-bold">
                          {date.toLocaleDateString('vi-VN')} {date.toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                      <h3 className={`text-2xl font-black ${isDanger ? 'text-danger' : 'text-primary-dark'}`}>
                        {isDanger ? 'Phát hiện bất thường' : 'Hoàn toàn bình thường'}
                      </h3>
                    </div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border-2 ${isDanger ? 'bg-danger/10 border-danger/30 text-danger' : 'bg-green-100 border-green-500/30 text-green-600'}`}>
                      {isDanger ? <ShieldAlert size={24} /> : <CheckCircle size={24} />}
                    </div>
                  </div>

                  <div className="bg-surface/50 rounded-2xl p-4 border-2 border-border mb-4">
                    <h4 className="text-xs font-black uppercase text-main/50 tracking-widest mb-3">Chi tiết chỉ số AI</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        {renderStatusIcon(record.balance)}
                        <span className="text-sm font-bold text-main/80 flex-1">Thăng bằng</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {renderStatusIcon(record.eyes)}
                        <span className="text-sm font-bold text-main/80 flex-1">Tầm nhìn</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {renderStatusIcon(record.face)}
                        <span className="text-sm font-bold text-main/80 flex-1">Khuôn mặt {record.face?.deviation_percentage ? `(${record.face.deviation_percentage}%)` : ''}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {renderStatusIcon(record.arm)}
                        <span className="text-sm font-bold text-main/80 flex-1">Cánh tay</span>
                      </div>
                      <div className="flex items-center gap-2 col-span-2 border-t-2 border-dashed border-border pt-2 mt-1">
                        {renderStatusIcon(record.speech)}
                        <span className="text-sm font-bold text-main/80 flex-1">Giọng nói</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4 flex justify-between items-center">
                    <span className="text-xs font-bold text-main/50 italic">* Kết quả được phân tích bởi Click Health AI</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default HistoryScreen;
