import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import { analyzeSpeech } from '../engines/speechAnalyzer';
import { analyzeSpeechOnServer } from '../api/befastAiApi';
import { SPEECH_TEST } from '../testConfigs';
import TestResultsShell from './TestResultsShell';
import ScoreBar from './ScoreBar';

export default function RealtimeSpeechTest({ onComplete }) {
  const config = SPEECH_TEST;
  const [phase, setPhase] = useState('intro');
  const [countdown, setCountdown] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const recognitionRef = useRef(null);
  const listenStartRef = useRef(null);
  const transcriptRef = useRef('');
  const phaseRef = useRef(phase);
  const finishingRef = useRef(false);
  const autoStopTimerRef = useRef(null);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const finishListen = useCallback(async () => {
    if (finishingRef.current) return;
    finishingRef.current = true;

    if (autoStopTimerRef.current) {
      clearTimeout(autoStopTimerRef.current);
      autoStopTimerRef.current = null;
    }

    const durationMs = Date.now() - (listenStartRef.current || Date.now());
    const text = transcriptRef.current.trim();

    if (!text) {
      finishingRef.current = false;
      setError('Không nghe rõ. Hãy đọc to câu mẫu và thử lại.');
      setPhase('intro');
      return;
    }

    phaseRef.current = 'analyzing';
    setPhase('analyzing');

    const local = analyzeSpeech({ transcript: text, durationMs });
    let analysis = local;
    try {
      const server = await analyzeSpeechOnServer(text, durationMs);
      if (server?.success) analysis = { ...server, analysisSource: 'server' };
    } catch {
      analysis = { ...local, analysisSource: 'local' };
    }
    setResult(analysis);
    setPhase('results');
    finishingRef.current = false;
  }, []);

  const finishListenRef = useRef(finishListen);
  useEffect(() => {
    finishListenRef.current = finishListen;
  }, [finishListen]);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setError('Dùng Chrome hoặc Edge để nhận diện giọng nói.');
      return undefined;
    }

    const rec = new SR();
    rec.lang = 'vi-VN';
    rec.continuous = false;
    rec.interimResults = true;

    rec.onstart = () => {
      setIsListening(true);
      listenStartRef.current = Date.now();
    };

    rec.onresult = (e) => {
      let text = '';
      for (let i = e.resultIndex; i < e.results.length; i += 1) {
        text += e.results[i][0].transcript;
      }
      setTranscript(text);
      transcriptRef.current = text;
    };

    rec.onerror = (ev) => {
      if (ev.error === 'no-speech' && phaseRef.current === 'listening') {
        finishListenRef.current();
        return;
      }
      if (ev.error !== 'aborted' && ev.error !== 'no-speech') {
        setError(`Lỗi: ${ev.error}`);
      }
      setIsListening(false);
    };

    rec.onend = () => {
      setIsListening(false);
      if (phaseRef.current === 'listening') {
        finishListenRef.current();
      }
    };

    recognitionRef.current = rec;
    return undefined;
  }, []);

  useEffect(() => {
    if (phase !== 'countdown' || countdown == null) return undefined;
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(t);
    }
    setPhase('listening');
    setCountdown(null);
    return undefined;
  }, [phase, countdown]);

  useEffect(() => {
    if (phase !== 'listening') return undefined;

    setTranscript('');
    transcriptRef.current = '';
    setError(null);
    finishingRef.current = false;

    const rec = recognitionRef.current;
    if (!rec) {
      setError('Trình duyệt không hỗ trợ nhận diện giọng nói.');
      setPhase('intro');
      return undefined;
    }

    autoStopTimerRef.current = setTimeout(() => {
      try {
        rec.stop();
      } catch {
        finishListenRef.current();
      }
    }, config.listenSec * 1000);

    try {
      rec.start();
    } catch {
      setError('Không thể bật micro. Thử lại sau vài giây.');
      setPhase('intro');
    }

    return () => {
      if (autoStopTimerRef.current) {
        clearTimeout(autoStopTimerRef.current);
        autoStopTimerRef.current = null;
      }
      if (phaseRef.current === 'listening') {
        try {
          rec.stop();
        } catch {
          /* noop */
        }
      }
    };
  }, [phase, config.listenSec]);

  const stopEarly = () => {
    try {
      recognitionRef.current?.stop();
    } catch {
      finishListenRef.current();
    }
  };

  if (phase === 'results' && result) {
    return (
      <div className="bg-white border border-[#e5e7eb] rounded-[24px] p-6 md:p-8 max-w-2xl mx-auto shadow-sm">
        <Header />
        <TestResultsShell
          result={result}
          onRetry={() => {
            finishingRef.current = false;
            setResult(null);
            setTranscript('');
            transcriptRef.current = '';
            setPhase('intro');
          }}
          onContinue={() => onComplete(result)}
          continueLabel="Xem kết quả tổng"
        >
          <ScoreBar label="Khớp câu mẫu" value={result.matchPct} />
          <ScoreBar label="Độ rõ giọng" value={result.clarityScore} />
          <p className="text-[12px] text-[#858585] mt-2">Đã nghe: &quot;{result.recognized_text}&quot;</p>
        </TestResultsShell>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[24px] p-6 md:p-8 max-w-2xl mx-auto shadow-sm font-inter-tight-small">
      <Header />
      <p className="text-[#858585] text-[14px] font-semibold mb-6">
        Đọc to, rõ câu mẫu sau khi đếm ngược. Hệ thống phân tích độ khớp và độ rõ.
      </p>

      <div className="bg-[#f0f1f2] border border-[#1F75C1]/10 rounded-[20px] p-6 text-center mb-8">
        <p className="text-2xl font-bold">&quot;{config.targetPhrase}&quot;</p>
      </div>

      {phase === 'countdown' && countdown > 0 && (
        <p className="text-center text-6xl font-bold text-[#7AB5E9] mb-6">{countdown}</p>
      )}

      {phase === 'listening' && isListening && (
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-[#d32f2f] flex items-center justify-center animate-pulse">
            <Mic size={28} className="text-white" />
          </div>
          <p className="mt-4 font-bold">Đang nghe...</p>
        </div>
      )}

      {phase === 'analyzing' && (
        <div className="flex flex-col items-center py-8 mb-4">
          <Loader2 className="animate-spin text-[#7AB5E9] mb-3" size={36} />
          <p className="font-bold text-sm text-[#858585]">Đang phân tích giọng nói...</p>
        </div>
      )}

      {transcript && phase !== 'results' && (
        <p className="text-center font-bold mb-4">&quot;{transcript}&quot;</p>
      )}

      {error && (
        <p className="text-[#d32f2f] text-xs font-bold text-center bg-red-50 py-3 rounded-xl mb-4">{error}</p>
      )}

      {phase === 'intro' && (
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={() => {
              setCountdown(config.countdownSec);
              setPhase('countdown');
            }}
            className="w-20 h-20 rounded-full bg-[#7AB5E9] text-white flex items-center justify-center shadow-md"
          >
            <Mic size={28} />
          </button>
          <p className="mt-4 text-sm font-bold">
            Bắt đầu ({config.countdownSec}s → ghi {config.listenSec}s)
          </p>
        </div>
      )}

      {phase === 'listening' && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={stopEarly}
            className="flex items-center gap-2 text-[#d32f2f] font-bold"
          >
            <Square size={16} /> Dừng sớm
          </button>
        </div>
      )}
    </div>
  );
}

function Header() {
  return (
    <div className="mb-6">
      <span className="bg-[#1F75C1]/10 text-[#1F75C1] px-3 py-1 rounded-full text-[10px] font-bold uppercase mb-2 inline-block">
        {SPEECH_TEST.step}
      </span>
      <h2 className="text-2xl font-bold font-inter flex items-center gap-2">
        <Mic size={22} className="text-[#7AB5E9]" /> {SPEECH_TEST.title}
        <span className="text-[11px] text-[#7AB5E9]">REALTIME</span>
      </h2>
    </div>
  );
}