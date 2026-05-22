import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle, Phone, ArrowLeft, Activity, Eye, Smile, UserCircle2, Mic, Save, Loader2, ChevronRight } from 'lucide-react';
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
    { id: 'B', name: 'Thăng bằng (Balance)', icon: Activity, data: bStatus, raw: results.balance },
    { id: 'E', name: 'Thị lực (Eyes)', icon: Eye, data: eStatus, raw: results.eyes },
    { id: 'F', name: 'Cơ mặt (Face)', icon: Smile, data: fStatus, raw: results.face },
    { id: 'A', name: 'Vận động tay (Arm)', icon: UserCircle2, data: aStatus, raw: results.arm },
    { id: 'S', name: 'Giọng nói (Speech)', icon: Mic, data: sStatus, raw: results.speech },
  ];

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[24px] p-6 md:p-8 max-w-4xl mx-auto shadow-sm transition-all duration-300">
      
      {/* Header Summary */}
      <div className="text-center mb-8 font-inter-tight-small">
        <span className="bg-[#244d54]/10 text-[#244d54] border border-[#244d54]/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2.5 inline-block">
          Phân tích hoàn tất
        </span>
        <h2 className="text-2xl font-bold font-inter text-black mb-2">Kết quả phân tích BEFAST</h2>
        <p className="text-[#858585] text-[14px] font-semibold">
          Tổng hợp kết quả chỉ số sinh trắc cử động bằng hệ thống AI và khảo sát lâm sàng
        </p>
      </div>

      {/* Save Status Notification */}
      <div className="mb-8 flex justify-center font-inter-tight-small">
        {saveLoading ? (
          <div className="flex items-center gap-2 bg-[#6dddbd]/10 text-[#244d54] px-4 py-1.5 rounded-full border border-[#6dddbd]/25 animate-pulse text-[11px] font-bold">
            <Loader2 size={13} className="animate-spin text-[#2ecea0]" />
            <span>ĐANG LƯU KẾT QUẢ VÀO HỒ SƠ Y TẾ...</span>
          </div>
        ) : saveFinished ? (
          <div className="flex items-center gap-2 bg-[#2ecea0]/10 text-[#2ecea0] px-4 py-1.5 rounded-full border border-[#2ecea0]/20 text-[11px] font-bold">
            <CheckCircle size={13} />
            <span>ĐÃ LƯU KẾT QUẢ LÂM SÀNG THÀNH CÔNG!</span>
          </div>
        ) : saveError ? (
          <div className="flex items-center gap-2 bg-red-50 text-[#d32f2f] px-4 py-1.5 rounded-full border border-red-100 text-[11px] font-bold">
            <AlertTriangle size={13} />
            <span>LỖI ĐỒNG BỘ DỮ LIỆU. VUI LÒNG KIỂM TRA ĐĂNG NHẬP.</span>
          </div>
        ) : null}
      </div>

      {/* Main conclusion banner */}
      {isDanger ? (
        <div className="bg-red-50 border border-red-200 rounded-[20px] p-6 md:p-8 mb-8 text-center flex flex-col items-center font-inter-tight-small">
          <div className="w-12 h-12 bg-[#d32f2f] rounded-full flex items-center justify-center text-white border-2 border-red-200 mb-4 shadow-lg shadow-red-500/20">
            <AlertTriangle size={22} className="animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-red-800 mb-2 font-inter">CẢNH BÁO ĐỘT QUỴ CAO</h3>
          <p className="text-red-700 font-semibold text-[14px] leading-relaxed max-w-xl mb-6">
            Hệ thống phát hiện **{totalAbnormal} dấu hiệu bất thường** trong cử động cơ mặt hoặc thăng bằng. Cần nhanh chóng đưa người bệnh đến cơ sở y tế can thiệp đột quỵ gần nhất để bảo vệ tế bào não trong "thời gian vàng".
          </p>
          <a 
            href="tel:115"
            className="inline-flex items-center justify-center gap-2.5 bg-[#d32f2f] text-white px-8 py-3.5 rounded-full text-[14px] font-bold hover:bg-red-700 transition-all duration-300 shadow-md shadow-red-500/25"
          >
            <Phone size={16} className="fill-white animate-bounce" />
            Gọi Cấp Cứu 115 Ngay
          </a>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-[20px] p-6 md:p-8 mb-8 text-center flex flex-col items-center font-inter-tight-small">
          <div className="w-12 h-12 bg-[#2ecea0] rounded-full flex items-center justify-center text-white border-2 border-green-200 mb-4 shadow-lg shadow-[#2ecea0]/25">
            <CheckCircle size={22} className="fill-white" />
          </div>
          <h3 className="text-xl font-bold text-green-800 mb-2 font-inter">Chưa phát hiện dấu hiệu bất thường</h3>
          <p className="text-green-700 font-semibold text-[14px] leading-relaxed max-w-xl">
            Các chỉ số tầm soát thông qua biểu cảm cơ mặt, thăng bằng và phản xạ cơ tay nằm trong ngưỡng an toàn. Tuy nhiên, nếu bạn nhận thấy cơ thể có dấu hiệu mệt mỏi, hãy nghỉ ngơi và liên hệ bác sĩ để nhận tư vấn trực tiếp.
          </p>
        </div>
      )}

      {/* Details checklist */}
      <h3 className="text-[10px] font-extrabold uppercase text-[#244d54] tracking-widest mb-4 pl-1 font-inter-tight-small">
        Chi tiết các chỉ số phân tích
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {resultCards.map((item, idx) => {
          const Icon = item.icon;
          const isAbnormal = item.data.status === 'abnormal';
          const isNormal = item.data.status === 'normal';
          
          return (
            <div 
              key={idx} 
              className="flex items-start gap-4 p-5 border border-[#e5e7eb] rounded-xl bg-[#f5f5f5] hover:bg-[#ececec] transition-colors duration-300"
            >
              <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 border shadow-2xs ${
                isAbnormal ? 'bg-red-50 border-red-100 text-[#d32f2f]' :
                isNormal ? 'bg-green-50 border-green-100 text-[#2ecea0]' :
                'bg-white border-[#e5e7eb] text-[#999999]'
              }`}>
                <Icon size={18} />
              </div>
              
              <div className="flex-1 font-inter-tight-small">
                <div className="flex justify-between items-center mb-1.5">
                  <h4 className="text-[14px] font-bold text-black font-inter tracking-tight">
                    {item.name}
                  </h4>
                  <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                    isAbnormal ? 'bg-red-500 text-white border-red-500' :
                    isNormal ? 'bg-[#2ecea0]/15 text-[#2ecea0] border-[#2ecea0]/25' :
                    'bg-white text-[#999999] border-[#e5e7eb]'
                  }`}>
                    {item.data.text}
                  </span>
                </div>
                
                {item.raw && item.raw.message && (
                  <p className="text-[12px] text-[#858585] font-semibold leading-relaxed mt-1">{item.raw.message}</p>
                )}
                
                {item.id === 'F' && item.raw && item.raw.deviation_percentage !== undefined && (
                  <div className="mt-3.5 bg-white p-3 rounded-lg border border-[#e5e7eb] shadow-2xs">
                    <div className="flex justify-between text-[11px] mb-1 font-semibold">
                      <span className="text-[#858585]">Tỷ lệ lệch cơ mặt:</span>
                      <span className={`font-bold ${isAbnormal ? 'text-[#d32f2f]' : 'text-[#2ecea0]'}`}>
                        {item.raw.deviation_percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-[#f0f1f2] h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${isAbnormal ? 'bg-[#d32f2f]' : 'bg-[#2ecea0]'}`}
                        style={{ width: `${Math.min(item.raw.deviation_percentage * 5, 100)}%` }}
                      />
                    </div>
                    <p className="text-[9px] text-[#858585] mt-1.5 font-bold italic">
                      * Ngưỡng báo động lâm sàng: &gt;3.5%
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex justify-center border-t border-[#e5e7eb] pt-6 gap-4 font-inter-tight-small">
        <button 
          onClick={handleFinish}
          className="flex items-center gap-2 bg-white border border-[#e5e7eb] text-[#244d54] px-8 py-3 rounded-full text-[13px] font-bold hover:bg-[#f0f1f2] transition-colors duration-300 shadow-sm"
        >
          <ArrowLeft size={14} />
          Trở về Trang chủ
        </button>
        {saveFinished && (
           <button 
            onClick={() => navigate('/history')}
            className="flex items-center gap-2 bg-[#2ecea0] text-white px-8 py-3 rounded-full text-[13px] font-bold hover:bg-[#26b38a] hover:scale-[1.01] transition-all duration-300 shadow-md shadow-[#2ecea0]/15"
          >
            Xem lịch sử chi tiết
            <ChevronRight size={14} strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ResultScreen;
