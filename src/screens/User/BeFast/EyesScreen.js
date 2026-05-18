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
    <div className="bg-surface border border-border rounded-lg p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-label text-tertiary bg-neutral px-2 py-1 rounded-sm uppercase mb-2 inline-block">Bước 2/5</span>
          <h2 className="text-h1 text-primary text-2xl flex items-center gap-2">
            <Eye size={24} className="text-tertiary" />
            E - Eyes (Mắt / Tầm nhìn)
          </h2>
        </div>
      </div>
      
      <p className="text-body text-secondary mb-8">
        Người bệnh có bị mờ mắt, mất thị lực một phần hoặc toàn phần ở một hoặc cả hai mắt một cách đột ngột không?
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <button
          onClick={() => setHasIssue(true)}
          className={`flex-1 flex flex-col items-center justify-center p-6 border-2 rounded-lg transition-colors ${
            hasIssue === true 
              ? 'border-red-500 bg-red-50' 
              : 'border-border bg-surface hover:bg-neutral'
          }`}
        >
          <XCircle size={32} className={`mb-3 ${hasIssue === true ? 'text-red-500' : 'text-secondary'}`} />
          <span className={`text-body font-medium ${hasIssue === true ? 'text-red-600' : 'text-primary'}`}>
            Có triệu chứng (Mờ mắt)
          </span>
        </button>

        <button
          onClick={() => setHasIssue(false)}
          className={`flex-1 flex flex-col items-center justify-center p-6 border-2 rounded-lg transition-colors ${
            hasIssue === false 
              ? 'border-green-500 bg-green-50' 
              : 'border-border bg-surface hover:bg-neutral'
          }`}
        >
          <CheckCircle size={32} className={`mb-3 ${hasIssue === false ? 'text-green-500' : 'text-secondary'}`} />
          <span className={`text-body font-medium ${hasIssue === false ? 'text-green-600' : 'text-primary'}`}>
            Không có triệu chứng (Bình thường)
          </span>
        </button>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleNext}
          disabled={hasIssue === null}
          className="flex items-center gap-2 bg-tertiary text-on-primary px-8 py-3 rounded-md text-body font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50"
        >
          Tiếp tục
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default EyesScreen;
