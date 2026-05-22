import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Mic, Square, ChevronRight } from 'lucide-react';
import { verifySpeech } from '../../../store/slices/befastSlice';

const SpeechScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: apiError } = useSelector((state) => state.befast);
  
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [localError, setLocalError] = useState(null);
  const [recognition, setRecognition] = useState(null);
  const isStartedRef = React.useRef(false);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.lang = 'vi-VN';
      rec.continuous = false;
      rec.interimResults = true;

      rec.onstart = () => {
        isStartedRef.current = true;
        setIsListening(true);
      };

      rec.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      rec.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
        isStartedRef.current = false;
        
        if (event.error === 'no-speech') {
          return; // Ignore no-speech as it's common
        }

        if (event.error === 'network') {
          setLocalError("Lỗi kết nối mạng khi nhận diện giọng nói. Vui lòng kiểm tra kết nối internet và thử lại.");
        } else if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setLocalError("Quyền truy cập Micro bị từ chối. Vui lòng cấp quyền trong cài đặt trình duyệt.");
        } else {
          setLocalError(`Lỗi nhận diện: ${event.error}. Vui lòng thử lại.`);
        }
      };

      rec.onend = () => {
        setIsListening(false);
        isStartedRef.current = false;
      };

      setRecognition(rec);
    } else {
      setLocalError("Trình duyệt của bạn không hỗ trợ nhận diện giọng nói. Vui lòng dùng Chrome hoặc Safari.");
    }
  }, []);

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening || isStartedRef.current) {
      try {
        recognition.stop();
      } catch (e) {
        console.error("Error stopping recognition:", e);
      }
      setIsListening(false);
      isStartedRef.current = false;
    } else {
      setTranscript('');
      setLocalError(null);
      try {
        recognition.start();
        // setIsListening(true) is handled in onstart
      } catch (e) {
        console.error("Error starting recognition:", e);
        if (e.name === 'InvalidStateError') {
          // Already started, sync state
          isStartedRef.current = true;
          setIsListening(true);
        } else {
          setLocalError("Không thể khởi động micro. Vui lòng thử lại.");
        }
      }
    }
  };

  const processSpeech = async () => {
    if (!transcript) {
      setLocalError("Bạn chưa đọc câu mẫu. Vui lòng thử lại.");
      return;
    }
    
    setLocalError(null);
    
    const resultAction = await dispatch(verifySpeech(transcript));
    if (verifySpeech.fulfilled.match(resultAction)) {
      navigate('/befast/result');
    }
  };

  const displayError = localError || apiError;

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[24px] p-6 md:p-8 max-w-2xl mx-auto shadow-sm transition-all duration-300">
      <div className="mb-6 flex items-center justify-between font-inter-tight-small">
        <div>
          <span className="bg-[#244d54]/10 text-[#244d54] border border-[#244d54]/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2.5 inline-block">
            Bước 5/5
          </span>
          <h2 className="text-2xl font-bold font-inter text-black flex items-center gap-2.5">
            <Mic size={22} className="text-[#2ecea0]" />
            S - Speech (Giọng nói)
          </h2>
        </div>
      </div>
      
      <p className="text-[#858585] text-[14px] font-semibold mb-6 font-inter-tight-small leading-relaxed">
        Người bệnh có bị nói ngọng, nói đớ hoặc không nói được không? Yêu cầu người bệnh đọc to, rõ ràng câu mẫu dưới đây:
      </p>

      <div className="bg-[#f0f1f2] border border-[#244d54]/10 rounded-[20px] p-6 text-center mb-8 font-inter-tight-small">
        <p className="text-2xl font-bold text-black mb-2 font-inter tracking-tight">"mẹ đi chợ mua cá"</p>
        <p className="text-xs font-semibold text-[#858585]">Bấm vào nút micro bên dưới và bắt đầu đọc</p>
      </div>

      <div className="flex flex-col items-center justify-center mb-8 font-inter-tight-small">
        <button 
          onClick={toggleListening}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
            isListening 
              ? 'bg-[#d32f2f] text-white animate-pulse shadow-[#d32f2f]/20' 
              : 'bg-[#2ecea0] text-white hover:scale-[1.03] shadow-[#2ecea0]/20 hover:bg-[#26b38a]'
          }`}
        >
          {isListening ? <Square size={26} className="fill-white" /> : <Mic size={28} />}
        </button>
        <p className="mt-4 text-sm font-bold text-black">
          {isListening ? 'Đang nghe...' : 'Bấm để nói'}
        </p>
      </div>

      {transcript && (
        <div className="bg-[#2ecea0]/5 border border-[#2ecea0]/20 rounded-[16px] p-5 mb-6 font-inter-tight-small">
          <p className="text-[11px] font-bold text-[#2ecea0] uppercase tracking-wider mb-1.5">Kết quả nhận diện:</p>
          <p className="text-[15px] font-bold text-black">"{transcript}"</p>
        </div>
      )}

      {displayError && (
        <p className="text-[#d32f2f] text-xs font-bold mb-6 text-center bg-red-50 py-3 rounded-xl border border-red-100 font-inter-tight-small">
          {displayError}
        </p>
      )}

      <div className="flex justify-end font-inter-tight-small">
        <button 
          onClick={processSpeech}
          disabled={loading || !transcript || isListening}
          className="btn-activation-filled flex items-center gap-2 text-sm font-semibold tracking-tight shadow-md disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              Phân tích & Kết quả
              <ChevronRight size={18} strokeWidth={2.5} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SpeechScreen;
