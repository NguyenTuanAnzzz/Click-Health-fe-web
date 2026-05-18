import React, { useMemo, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle, Phone, ArrowLeft, Activity, Eye, Smile, UserCircle2, Mic, Save, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { resetBefast } from '../../../store/slices/befastSlice';
import { saveHistory } from '../../../store/slices/historySlice';

const ResultScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { results } = useSelector((state) => state.befast);
  const { saveLoading, saveError } = useSelector((state) => state.history);
  const [saveFinished, setSaveFinished] = useState(false);
  const hasSaved = useRef(false);

  // Safe checks if results object is missing some keys
  const getStatus = (data, isEyes = false) => {
    if (!data) return { status: 'unknown', text: 'Chưa kiểm tra' };
    
    if (isEyes) {
      return data.label === 'normal' 
        ? { status: 'normal', text: 'Bình thường' }
        : { status: 'abnormal', text: 'Có dấu hiệu bất thường' };
    }

    if (data.label === 'normal') return { status: 'normal', text: 'Bình thường' };
    return { status: 'abnormal', text: 'Phát hiện bất thường' };
  };

  const bStatus = getStatus(results.balance);
  const eStatus = getStatus(results.eyes, true);
  const fStatus = getStatus(results.face);
  const aStatus = getStatus(results.arm);
  const sStatus = getStatus(results.speech);

  const totalAbnormal = [bStatus, eStatus, fStatus, aStatus, sStatus].filter(s => s.status === 'abnormal').length;
  const isDanger = totalAbnormal > 0;

  // Auto-save result to history
  useEffect(() => {
    // Only attempt to save if we have results and haven't saved in this session
    if (hasSaved.current || !results.balance) return;

    hasSaved.current = true; // Mark as saved immediately

    const historyData = {
      balance: { is_abnormal: bStatus.status === 'abnormal', message: results.balance?.message },
      eyes: { is_abnormal: eStatus.status === 'abnormal', message: results.eyes?.message },
      face: { 
        is_abnormal: fStatus.status === 'abnormal', 
        deviation_percentage: results.face?.deviation_percentage,
        message: results.face?.message 
      },
      arm: { is_abnormal: aStatus.status === 'abnormal', message: results.arm?.message },
      speech: { is_abnormal: sStatus.status === 'abnormal', message: results.speech?.message },
      conclusion: {
        isDanger: isDanger,
        totalScore: totalAbnormal
      }
    };

    dispatch(saveHistory(historyData)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        setSaveFinished(true);
      } else {
        hasSaved.current = false; // Allow retry if it failed
      }
    });
  }, [dispatch]); // Only dispatch on mount

  const handleFinish = () => {
    dispatch(resetBefast());
    navigate('/');
  };

  const resultCards = [
    { id: 'B', name: 'Thăng bằng', icon: Activity, data: bStatus, raw: results.balance },
    { id: 'E', name: 'Tầm nhìn', icon: Eye, data: eStatus, raw: results.eyes },
    { id: 'F', name: 'Khuôn mặt', icon: Smile, data: fStatus, raw: results.face },
    { id: 'A', name: 'Cánh tay', icon: UserCircle2, data: aStatus, raw: results.arm },
    { id: 'S', name: 'Giọng nói', icon: Mic, data: sStatus, raw: results.speech },
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-sm">
      <div className="text-center mb-8">
        <h2 className="text-h1 text-primary text-2xl mb-2">Kết quả phân tích BEFAST</h2>
        <p className="text-body text-secondary">
          Tổng hợp kết quả từ hệ thống AI và khảo sát
        </p>
      </div>

      {/* Save Status Notification */}
      <div className="mb-6 flex justify-center">
        {saveLoading ? (
          <div className="flex items-center gap-2 bg-info/10 text-info px-4 py-2 rounded-full border border-info/20 animate-pulse">
            <Loader2 size={16} className="animate-spin" />
            <span className="text-xs font-bold uppercase tracking-wider">Đang lưu kết quả vào lịch sử...</span>
          </div>
        ) : saveFinished ? (
          <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full border border-green-500/20">
            <Save size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Đã lưu vào lịch sử thành công!</span>
          </div>
        ) : saveError ? (
          <div className="flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-full border border-red-500/20">
            <AlertTriangle size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Lỗi lưu kết quả. Vui lòng kiểm tra đăng nhập.</span>
          </div>
        ) : null}
      </div>

      {isDanger ? (
        <div className="bg-red-50 border-2 border-red-500 rounded-lg p-6 mb-8 text-center">
          <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-red-700 mb-2">CẢNH BÁO ĐỘT QUỴ CAO</h3>
          <p className="text-red-600 font-medium mb-6">
            Phát hiện {totalAbnormal} dấu hiệu bất thường. Cần đưa người bệnh đến bệnh viện cấp cứu ngay lập tức để tận dụng "thời gian vàng".
          </p>
          <a 
            href="tel:115"
            className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 rounded-md text-lg font-bold hover:bg-red-700 transition-colors shadow-lg"
          >
            <Phone size={24} fill="currentColor" />
            Gọi Cấp Cứu 115 NGAY
          </a>
        </div>
      ) : (
        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 mb-8 text-center">
          <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-green-700 mb-2">Không phát hiện dấu hiệu nguy hiểm</h3>
          <p className="text-green-600 font-medium">
            Hệ thống không phát hiện các dấu hiệu đột quỵ rõ ràng từ hình ảnh và âm thanh cung cấp. Tuy nhiên, nếu bạn vẫn cảm thấy không khỏe, hãy đến gặp bác sĩ.
          </p>
        </div>
      )}

      <h3 className="text-label text-secondary uppercase mb-4 pl-1">Chi tiết kiểm tra</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {resultCards.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-start gap-4 p-4 border border-border rounded-lg bg-neutral">
              <div className={`w-12 h-12 rounded-md flex items-center justify-center shrink-0 ${
                item.data.status === 'abnormal' ? 'bg-red-100 text-red-500' :
                item.data.status === 'normal' ? 'bg-green-100 text-green-500' :
                'bg-gray-200 text-gray-500'
              }`}>
                <Icon size={24} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-body font-bold text-primary">{item.id} - {item.name}</h4>
                  <span className={`text-[12px] font-bold px-2 py-0.5 rounded-sm ${
                    item.data.status === 'abnormal' ? 'bg-red-500 text-white' :
                    item.data.status === 'normal' ? 'bg-green-500 text-white' :
                    'bg-gray-300 text-gray-700'
                  }`}>
                    {item.data.text}
                  </span>
                </div>
                {item.raw && item.raw.message && (
                  <p className="text-sm text-secondary mt-1">{item.raw.message}</p>
                )}
                {item.id === 'F' && item.raw && item.raw.deviation_percentage !== undefined && (
                  <div className="mt-2 bg-white/50 p-2 rounded border border-border">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-secondary font-medium">Độ lệch khuôn mặt:</span>
                      <span className={`font-bold ${item.raw.is_abnormal ? 'text-red-500' : 'text-green-500'}`}>
                        {item.raw.deviation_percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${item.raw.is_abnormal ? 'bg-red-500' : 'bg-green-500'}`}
                        style={{ width: `${Math.min(item.raw.deviation_percentage * 5, 100)}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-secondary mt-1 italic">
                      * Ngưỡng cảnh báo: {">"}3.5%
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center border-t border-border pt-6 gap-4">
        <button 
          onClick={handleFinish}
          className="flex items-center gap-2 bg-surface border border-border text-primary px-8 py-3 rounded-md text-body font-medium hover:bg-neutral transition-colors"
        >
          <ArrowLeft size={20} />
          Trở về Trang chủ
        </button>
        {saveFinished && (
           <button 
           onClick={() => navigate('/history')}
           className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-md text-body font-bold hover:bg-primary-light transition-colors shadow-md"
         >
           Xem lịch sử chi tiết
         </button>
        )}
      </div>
    </div>
  );
};

export default ResultScreen;
