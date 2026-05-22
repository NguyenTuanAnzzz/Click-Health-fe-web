import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Eye, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import { saveEyesResult } from '../../../store/slices/befastSlice';

const EyesScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hasIssue, setHasIssue] = useState(null);

  const handleNext = () => {
    if (hasIssue === null) return;
    
    // Fake an AI response format for consistency
    dispatch(saveEyesResult({
      label: hasIssue ? 'eyes_abnormal' : 'normal',
      message: hasIssue ? 'Có dấu hiệu mờ mắt, giảm thị lực.' : 'Tầm nhìn bình thường.'
    }));
    
    navigate('/befast/face');
  };

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[24px] p-6 md:p-8 max-w-2xl mx-auto shadow-sm transition-all duration-300">
      <div className="mb-6 flex items-center justify-between font-inter-tight-small">
        <div>
          <span className="bg-[#244d54]/10 text-[#244d54] border border-[#244d54]/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2.5 inline-block">
            Bước 2/5
          </span>
          <h2 className="text-2xl font-bold font-inter text-black flex items-center gap-2.5">
            <Eye size={22} className="text-[#2ecea0]" />
            E - Eyes (Mắt / Tầm nhìn)
          </h2>
        </div>
      </div>
      
      <p className="text-[#858585] text-[14px] font-semibold mb-8 font-inter-tight-small leading-relaxed">
        Người bệnh có bị mờ mắt, mất thị lực một phần hoặc toàn phần ở một hoặc cả hai mắt một cách đột ngột không?
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-8 font-inter-tight-small">
        <button
          onClick={() => setHasIssue(true)}
          className={`flex-1 flex flex-col items-center justify-center p-8 rounded-[20px] border transition-all duration-300 shadow-2xs group cursor-pointer ${
            hasIssue === true 
              ? 'border-[#d32f2f]/30 bg-[#d32f2f]/5 text-[#d32f2f] shadow-md shadow-[#d32f2f]/5' 
              : 'border-[#e5e7eb] bg-white text-[#858585] hover:bg-[#f0f1f2]/50 hover:border-[#858585]/30'
          }`}
        >
          <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
            hasIssue === true ? 'bg-[#d32f2f]/10 text-[#d32f2f]' : 'bg-[#f0f1f2] text-[#858585] group-hover:bg-[#e5e7eb]'
          }`}>
            <XCircle size={26} strokeWidth={2.5} />
          </div>
          <span className={`text-[15px] font-bold ${hasIssue === true ? 'text-[#d32f2f]' : 'text-black'}`}>
            Có triệu chứng (Mờ mắt)
          </span>
          <span className="text-[11px] text-[#999999] mt-1 font-semibold">Giảm hoặc mất thị lực đột ngột</span>
        </button>

        <button
          onClick={() => setHasIssue(false)}
          className={`flex-1 flex flex-col items-center justify-center p-8 rounded-[20px] border transition-all duration-300 shadow-2xs group cursor-pointer ${
            hasIssue === false 
              ? 'border-[#2ecea0]/30 bg-[#2ecea0]/5 text-[#2ecea0] shadow-md shadow-[#2ecea0]/5' 
              : 'border-[#e5e7eb] bg-white text-[#858585] hover:bg-[#f0f1f2]/50 hover:border-[#858585]/30'
          }`}
        >
          <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
            hasIssue === false ? 'bg-[#2ecea0]/10 text-[#2ecea0]' : 'bg-[#f0f1f2] text-[#858585] group-hover:bg-[#e5e7eb]'
          }`}>
            <CheckCircle size={26} strokeWidth={2.5} />
          </div>
          <span className={`text-[15px] font-bold ${hasIssue === false ? 'text-[#2ecea0]' : 'text-black'}`}>
            Không có triệu chứng
          </span>
          <span className="text-[11px] text-[#999999] mt-1 font-semibold">Tầm nhìn hoàn toàn bình thường</span>
        </button>
      </div>

      <div className="flex justify-end font-inter-tight-small">
        <button 
          onClick={handleNext}
          disabled={hasIssue === null}
          className="btn-activation-filled flex items-center gap-2 text-sm font-semibold tracking-tight shadow-md disabled:opacity-50 disabled:pointer-events-none"
        >
          Tiếp tục
          <ChevronRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default EyesScreen;
