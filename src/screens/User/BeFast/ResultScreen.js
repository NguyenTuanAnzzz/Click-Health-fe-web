import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle,
  Phone,
  ArrowLeft,
  Activity,
  Eye,
  Smile,
  UserCircle2,
  Mic,
  Loader2,
  ChevronRight,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { resetBefast } from '../../../store/slices/befastSlice';
import { saveHistory } from '../../../store/slices/historySlice';
import { getBefastAbnormalStatus } from '../../../features/befastRealtime';
import { toHistoryTestPayload } from '../../../features/befastRealtime/utils/historyPayload';

const ResultScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { results } = useSelector((state) => state.befast);
  const { saveLoading, saveError } = useSelector((state) => state.history);
  const [saveFinished, setSaveFinished] = useState(false);
  const hasSaved = useRef(false);

  const bStatus = getBefastAbnormalStatus(results.balance);
  const eStatus = getBefastAbnormalStatus(results.eyes, true);
  const fStatus = getBefastAbnormalStatus(results.face);
  const aStatus = getBefastAbnormalStatus(results.arm);
  const sStatus = getBefastAbnormalStatus(results.speech);

  const totalAbnormal = [bStatus, eStatus, fStatus, aStatus, sStatus].filter(
    (s) => s.status === 'abnormal'
  ).length;
  const isDanger = totalAbnormal > 0;

  useEffect(() => {
    if (hasSaved.current || !results.balance) return;

    const saveProcess = async () => {
      hasSaved.current = true;

      const historyData = {
        balance: toHistoryTestPayload(results.balance),
        eyes: toHistoryTestPayload(results.eyes),
        face: toHistoryTestPayload(results.face),
        arm: toHistoryTestPayload(results.arm),
        speech: toHistoryTestPayload(results.speech),
        conclusion: {
          isDanger,
          totalScore: totalAbnormal,
          analysisMode: 'hybrid',
        }
      };

      const res = await dispatch(saveHistory(historyData));
      if (res.meta.requestStatus === 'fulfilled') {
        setSaveFinished(true);
      } else if (res.payload?.includes?.('Session expired') || res.payload?.includes?.('Authentication failed')) {
        setTimeout(() => navigate('/login'), 2000);
      } else {
        hasSaved.current = false;
      }
    };

    saveProcess();
  }, [dispatch, results.balance, bStatus, eStatus, fStatus, aStatus, sStatus, isDanger, totalAbnormal, navigate]);

  const resultCards = [
    { id: 'B', name: 'Thăng bằng (Balance)', icon: Activity, data: bStatus, raw: results.balance },
    { id: 'E', name: 'Thị lực (Eyes)', icon: Eye, data: eStatus, raw: results.eyes },
    { id: 'F', name: 'Cơ mặt (Face)', icon: Smile, data: fStatus, raw: results.face },
    { id: 'A', name: 'Vận động tay (Arm)', icon: UserCircle2, data: aStatus, raw: results.arm },
    { id: 'S', name: 'Giọng nói (Speech)', icon: Mic, data: sStatus, raw: results.speech },
  ];

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[24px] p-6 md:p-8 max-w-4xl mx-auto shadow-sm">
      <div className="text-center mb-8 font-inter-tight-small">
        <span className="bg-[#1F75C1]/10 text-[#1F75C1] px-3 py-1 rounded-full text-[10px] font-bold uppercase mb-2 inline-block">
          Phân tích hoàn tất
        </span>
        <h2 className="text-2xl font-bold font-inter text-black mb-2">Kết quả BEFAST (Realtime AI)</h2>
        <p className="text-[#858585] text-[14px] font-semibold">
          Phân tích video realtime — không dùng ảnh tĩnh đơn lẻ
        </p>
      </div>

      <div className="mb-8 flex justify-center font-inter-tight-small">
        {saveLoading ? (
          <div className="flex items-center gap-2 bg-[#BEDBF4]/10 text-[#1F75C1] px-4 py-1.5 rounded-full text-[11px] font-bold">
            <Loader2 size={13} className="animate-spin" /> ĐANG LƯU HỒ SƠ...
          </div>
        ) : saveFinished ? (
          <div className="flex items-center gap-2 bg-[#7AB5E9]/10 text-[#7AB5E9] px-4 py-1.5 rounded-full text-[11px] font-bold">
            <CheckCircle size={13} /> ĐÃ LƯU THÀNH CÔNG
          </div>
        ) : saveError ? (
          <div className="w-full">
            <div className="flex items-center justify-center gap-2 bg-red-50 text-[#d32f2f] px-4 py-1.5 rounded-full text-[11px] font-bold mb-4 w-fit mx-auto">
              <AlertTriangle size={13} />
              {saveError?.includes?.('Session expired') ? (
                <span>PHIÊN HẾT HẠN — CHUYỂN ĐẾN ĐĂNG NHẬP...</span>
              ) : saveError?.includes?.('hết lượt thử') ? (
                <span>HẾT LƯỢT THỬ MIỄN PHÍ</span>
              ) : (
                <span>LỖI LƯU — KIỂM TRA ĐĂNG NHẬP</span>
              )}
            </div>
            
            {saveError?.includes?.('hết lượt thử') && (
              <div className="bg-gradient-to-r from-red-50 to-red-100/50 border border-red-300 rounded-[16px] p-4 max-w-2xl mx-auto">
                <p className="text-red-700 font-bold text-[13px] mb-2">Bạn đã hết lượt thử miễn phí BeFast</p>
                <p className="text-red-600 text-[12px] mb-4">
                  Để lưu kết quả và tiếp tục sử dụng tầm soát BEFAST, vui lòng nâng cấp gói VIP.
                </p>
                <button
                  onClick={() => navigate('/profile')}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold text-[12px] hover:bg-red-700 transition-all"
                >
                  Xem gói nâng cấp
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>

      {isDanger ? (
        <div className="bg-red-50 border border-red-200 rounded-[20px] p-6 mb-8 text-center">
          <AlertTriangle className="mx-auto text-[#d32f2f] mb-3" size={28} />
          <h3 className="text-xl font-bold text-red-800 mb-2">Cảnh báo — {totalAbnormal} dấu hiệu bất thường</h3>
          <a href="tel:115" className="inline-flex items-center gap-2 bg-[#d32f2f] text-white px-8 py-3 rounded-full font-bold mt-4">
            <Phone size={16} /> Gọi 115
          </a>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-[20px] p-6 mb-8 text-center">
          <CheckCircle className="mx-auto text-[#7AB5E9] mb-3" size={28} />
          <h3 className="text-xl font-bold text-green-800">Chưa phát hiện dấu hiệu bất thường</h3>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {resultCards.map((item) => (
          <ResultCard key={item.id} item={item} />
        ))}
      </div>

      <div className="flex justify-center gap-4 pt-6 border-t border-[#e5e7eb]">
        <button
          type="button"
          onClick={() => {
            dispatch(resetBefast());
            navigate('/');
          }}
          className="flex items-center gap-2 border border-[#e5e7eb] px-8 py-3 rounded-full font-bold text-[#1F75C1]"
        >
          <ArrowLeft size={14} /> Trang chủ
        </button>
        {saveFinished && (
          <button
            type="button"
            onClick={() => navigate('/history')}
            className="flex items-center gap-2 bg-[#7AB5E9] text-white px-8 py-3 rounded-full font-bold"
          >
            Lịch sử <ChevronRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

function ResultCard({ item }) {
  const Icon = item.icon;
  const isAbnormal = item.data.status === 'abnormal';
  const isNormal = item.data.status === 'normal';
  const raw = item.raw;

  return (
    <div className="flex gap-4 p-5 border border-[#e5e7eb] rounded-xl bg-[#f5f5f5]">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
          isAbnormal ? 'bg-red-50 text-[#d32f2f]' : isNormal ? 'bg-green-50 text-[#7AB5E9]' : 'bg-white text-[#999]'
        }`}
      >
        <Icon size={18} />
      </div>
      <div className="flex-1 font-inter-tight-small">
        <div className="flex justify-between mb-1">
          <h4 className="font-bold text-black">{item.name}</h4>
          <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full border">{item.data.text}</span>
        </div>
        {raw?.message && <p className="text-[12px] text-[#858585] font-semibold">{raw.message}</p>}
        {raw?.realtime && item.id === 'B' && (
          <Metrics lines={[
            ['Điểm thăng bằng', `${raw.metrics?.stabilityScore ?? raw.stabilityScore ?? '-'}%`],
            ['Lắc người', `${raw.metrics?.swayPct ?? raw.swayPct ?? '-'}%`],
          ]} />
        )}
        {raw?.realtime && item.id === 'F' && (
          <Metrics lines={[
            ['Lệch tổng hợp', `${raw.metrics?.deviation_percentage ?? raw.deviation_percentage ?? '-'}%`],
            ['Khóe miệng', `${raw.metrics?.mouth_corner_deviation ?? raw.mouth_corner_deviation ?? '-'}%`],
            ['Tâm miệng', `${raw.metrics?.mouth_center_offset ?? raw.mouth_center_offset ?? '-'}%`],
            ['Điểm tổng', `${raw.metrics?.overallBalance ?? raw.overallBalance ?? '-'}%`],
          ]} />
        )}
        {raw?.realtime && item.id === 'A' && (
          <Metrics lines={[
            ['Tay trái', `${raw.metrics?.stabilityLeft ?? raw.stabilityLeft ?? '-'}%`],
            ['Tay phải', `${raw.metrics?.stabilityRight ?? raw.stabilityRight ?? '-'}%`],
            ['Giơ đủ cao', `${raw.metrics?.raisePct ?? raw.raisePct ?? '-'}%`],
            ['Tay hạ dần', `${raw.metrics?.armDriftPct ?? raw.armDriftPct ?? '-'}%`],
          ]} />
        )}
        {raw?.realtime && item.id === 'S' && (
          <Metrics lines={[
            ['Khớp câu mẫu', `${raw.metrics?.matchPct ?? raw.matchPct ?? '-'}%`],
            ['Độ rõ', `${raw.metrics?.clarityScore ?? raw.clarityScore ?? '-'}%`],
          ]} />
        )}
      </div>
    </div>
  );
}

function Metrics({ lines }) {
  return (
    <div className="mt-2 bg-white p-2 rounded-lg border border-[#e5e7eb] space-y-1">
      {lines.map(([k, v]) => (
        <div key={k} className="flex justify-between text-[11px] font-semibold">
          <span className="text-[#858585]">{k}</span>
          <span className="font-bold">{v}</span>
        </div>
      ))}
    </div>
  );
}

export default ResultScreen;
