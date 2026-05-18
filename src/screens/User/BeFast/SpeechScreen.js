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
    <div className="bg-surface border border-border rounded-lg p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-label text-tertiary bg-neutral px-2 py-1 rounded-sm uppercase mb-2 inline-block">Bước 5/5</span>
          <h2 className="text-h1 text-primary text-2xl flex items-center gap-2">
            <Mic size={24} className="text-tertiary" />
            S - Speech (Giọng nói)
          </h2>
        </div>
      </div>
      
      <p className="text-body text-secondary mb-6">
        Người bệnh có bị nói ngọng, nói đớ hoặc không nói được không? Yêu cầu người bệnh đọc to, rõ ràng câu mẫu dưới đây:
      </p>

      <div className="bg-neutral border-2 border-dashed border-border rounded-lg p-6 text-center mb-8">
        <p className="text-xl font-bold text-primary mb-2">"mẹ đi chợ mua cá"</p>
        <p className="text-sm text-secondary">Bấm vào nút micro bên dưới và bắt đầu đọc</p>
      </div>

      <div className="flex flex-col items-center justify-center mb-8">
        <button 
          onClick={toggleListening}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-md ${
            isListening 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-tertiary text-white hover:scale-105'
          }`}
        >
          {isListening ? <Square size={28} fill="currentColor" /> : <Mic size={32} />}
        </button>
        <p className="mt-4 text-body font-medium text-primary">
          {isListening ? 'Đang nghe...' : 'Bấm để nói'}
        </p>
      </div>

      {transcript && (
        <div className="bg-surface border border-border rounded-md p-4 mb-6">
          <p className="text-label text-secondary mb-1">Kết quả nhận diện:</p>
          <p className="text-body text-primary font-medium">"{transcript}"</p>
        </div>
      )}

      {displayError && <p className="text-red-500 text-sm font-medium mb-4 text-center">{displayError}</p>}

      <div className="flex justify-end gap-4">
        <button 
          onClick={processSpeech}
          disabled={loading || !transcript || isListening}
          className="flex items-center gap-2 bg-tertiary text-on-primary px-8 py-3 rounded-md text-body font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              Phân tích & Kết quả
              <ChevronRight size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SpeechScreen;
