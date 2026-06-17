import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, Activity, Scale, ShieldAlert, 
  Brain, Sparkles, RefreshCw, Heart, Info, Navigation, Play
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import UserLayout from "../../../layouts/UserLayout";
import { AI_API_URL } from "../../../constants/apiConfig";
import { fetchMyBmiHistory, saveBmiHistory } from "../../../store/slices/historySlice";
import { getInfo } from "../../../store/slices/authSlice";
import { hasActiveSubscription } from "../../../constants/subscription";

const StrokeRiskScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.auth);
  const { bmiData } = useSelector((state) => state.history);

  // Form states
  const [age, setAge] = useState(45);
  const [gender, setGender] = useState("Nam");
  const [height, setHeight] = useState(170); // cm
  const [weight, setWeight] = useState(65);  // kg
  const [hypertension, setHypertension] = useState(false);
  const [heartDisease, setHeartDisease] = useState(false);
  const [glucoseLevel, setGlucoseLevel] = useState(105); // mg/dL
  const [smokingStatus, setSmokingStatus] = useState("Chưa từng hút");
  
  // Custom switch for Self vs Other
  const [isForSelf, setIsForSelf] = useState(true);

  // Auto-fill from user profile and recent BMI history
  useEffect(() => {
    if (isForSelf && user) {
      if (user.age) setAge(user.age);
      if (user.gender) {
        setGender(user.gender === "MALE" ? "Nam" : user.gender === "FEMALE" ? "Nữ" : "Khác");
      }
      if (user.medicalHistory) {
        setHypertension(user.medicalHistory.hypertension || false);
        setHeartDisease(user.medicalHistory.heartDisease || false);
        setSmokingStatus(user.medicalHistory.smoking ? "Thường xuyên hút" : "Chưa từng hút");
      }
      
      // Fill height, weight, glucose from latest personal measurement
      if (bmiData && bmiData.length > 0) {
        const recentSelfData = bmiData.find(item => item.isForSelf !== false);
        if (recentSelfData) {
          if (recentSelfData.height) setHeight(recentSelfData.height);
          if (recentSelfData.weight) setWeight(recentSelfData.weight);
          if (recentSelfData.glucoseLevel) setGlucoseLevel(recentSelfData.glucoseLevel);
        }
      }
    } else if (!isForSelf) {
      // Reset form to defaults when turned off
      setAge(45);
      setGender("Nam");
      setHeight(170);
      setWeight(65);
      setHypertension(false);
      setHeartDisease(false);
      setGlucoseLevel(105);
      setSmokingStatus("Chưa từng hút");
    }
  }, [isForSelf, user, bmiData]);

  // API response and UI states
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Load history on mount
  useEffect(() => {
    dispatch(fetchMyBmiHistory());
    dispatch(getInfo());
  }, [dispatch]);

  // Real-time BMI calculation
  const heightM = height / 100;
  const bmi = heightM > 0 ? (weight / (heightM * heightM)).toFixed(1) : 0;

  // Real-time BMI category
  let bmiCategory = "Chưa xác định";
  let bmiColor = "text-gray-500 bg-gray-50 border-gray-200";
  if (bmi > 0) {
    if (bmi < 18.5) {
      bmiCategory = "Thiếu cân";
      bmiColor = "text-[#1F75C1] bg-[#1F75C1]/10 border-[#1F75C1]/20";
    } else if (bmi < 23.0) {
      bmiCategory = "Bình thường";
      bmiColor = "text-[#7AB5E9] bg-[#7AB5E9]/10 border-[#7AB5E9]/20";
    } else if (bmi < 25.0) {
      bmiCategory = "Thừa cân";
      bmiColor = "text-amber-600 bg-amber-50 border-amber-200";
    } else {
      bmiCategory = "Béo phì";
      bmiColor = "text-red-600 bg-red-50 border-red-200";
    }
  }

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Check VIP subscription
    const now = new Date();
    const hasActiveSub = hasActiveSubscription(user, now);
    
    // Check trial attempts
    const bmiAttempts = user?.freeAttemptsBmiLeft !== undefined ? user.freeAttemptsBmiLeft : 3;
    
    if (!hasActiveSub && bmiAttempts <= 0) {
      setError("Bạn đã hết lượt thử BMI/Đột quỵ miễn phí. Vui lòng nâng cấp gói VIP để tiếp tục sử dụng.");
      setLoading(false);
      return;
    }

    const payload = {
      age: Number(age),
      gender: gender,
      height: Number(height),
      weight: Number(weight),
      hypertension: hypertension,
      heart_disease: heartDisease,
      glucose_level: Number(glucoseLevel),
      smoking_status: smokingStatus
    };

    try {
      // Call python backend FastAPI server
      const response = await axios.post(`${AI_API_URL}/predict-stroke`, payload);
      const data = response.data;
      
      setResult(data);

      // Save to MongoDB History via Redux Thunk
      const historyPayload = {
        age: Number(age),
        isForSelf: isForSelf,
        height: Number(height),
        weight: Number(weight),
        bmi: Number(data.bmi),
        bmiCategory: data.bmi_category,
        hypertension: hypertension,
        heartDisease: heartDisease,
        glucoseLevel: Number(glucoseLevel),
        smokingStatus: smokingStatus,
        riskPercentage: Number(data.risk_percentage),
        riskCategory: data.risk_category,
        recommendation: data.recommendation
      };

      const resultAction = await dispatch(saveBmiHistory(historyPayload));
      if (saveBmiHistory.fulfilled.match(resultAction)) {
        // Refresh user info (which updates the trial counts)
        dispatch(getInfo());
      }
    } catch (err) {
      console.error(err);
      setError("Không thể kết nối tới máy chủ AI. Vui lòng đảm bảo dịch vụ Python backend đang chạy.");
    } finally {
      setLoading(false);
    }
  };

  // Visual meter configurations
  const getRiskColor = (cat) => {
    if (cat === "Thấp") return { text: "text-[#7AB5E9]", bg: "bg-[#7AB5E9]/10", border: "border-[#7AB5E9]/20", stroke: "#7AB5E9" };
    if (cat === "Trung bình") return { text: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200", stroke: "#f59e0b" };
    return { text: "text-red-500", bg: "bg-red-50", border: "border-red-200", stroke: "#ef4444" };
  };

  const currentRiskTheme = result ? getRiskColor(result.risk_category) : getRiskColor("Thấp");

  // VIP Subscription Status Helper
  const hasActiveSub = hasActiveSubscription(user);
  const bmiAttemptsLeft = user?.freeAttemptsBmiLeft !== undefined ? user.freeAttemptsBmiLeft : 3;

  return (
    <UserLayout noPaddingTop={false}>
      <div className="w-full max-w-[1200px] mx-auto px-6 mt-8 pb-24 bg-[#ffffff]">
        
        {/* Breadcrumb Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#858585] hover:text-black transition-colors mb-6 font-bold text-xs uppercase tracking-wider font-inter-tight-small"
        >
          <ArrowLeft size={14} /> Quay lại trang chủ
        </button>

        {/* Clinical Overhaul Banner */}
        <div className="relative rounded-[24px] bg-[#1F75C1] text-white p-8 md:p-12 mb-12 overflow-hidden shadow-lg">
          <div className="absolute inset-0 pattern-grid-lg opacity-25 pointer-events-none" />
          <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-[#7AB5E9]/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-left font-inter-tight-small">
              <div className="inline-block bg-[#7AB5E9]/15 text-[#7AB5E9] border border-[#7AB5E9]/30 px-4 py-1.5 rounded-full font-bold uppercase tracking-wider text-[10px] mb-6">
                Chẩn đoán lâm sàng & BMI
              </div>
              <h1 className="text-3xl md:text-5xl font-bold font-inter text-white tracking-tight mb-4 leading-tight">
                Tầm soát <span className="text-[#7AB5E9]">Nguy cơ Đột quỵ</span>
              </h1>
              <p className="text-white/70 text-[14px] font-medium leading-relaxed max-w-xl">
                Cung cấp chỉ số cân nặng BMI, kết hợp các nguy cơ tiền sử bệnh nền huyết áp, tim mạch và thói quen sinh hoạt để phân tích nguy cơ tai biến mạch máu não tức thì.
              </p>
            </div>
            
            {/* Elegant side icon */}
            <div className="hidden lg:flex w-24 h-24 bg-white/10 rounded-[24px] border border-white/15 items-center justify-center shadow-lg">
              <Brain size={44} className="text-[#BEDBF4]" />
            </div>
          </div>
        </div>

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Input Form Card */}
          <div className="lg:col-span-7 bg-[#f0f1f2] border border-[#e5e7eb]/80 rounded-[24px] p-6 md:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-xl font-bold text-[#1F75C1] font-inter tracking-tight flex items-center gap-2">
                <Activity size={18} className="text-[#7AB5E9]" />
                Nhập các chỉ số sức khỏe của bạn
              </h2>
              {user && (
                <div className={`px-3.5 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wider text-center shrink-0 ${
                  hasActiveSub
                    ? "bg-[#7AB5E9]/15 border-[#7AB5E9]/30 text-[#7AB5E9]"
                    : "bg-[#1F75C1]/10 border-[#1F75C1]/20 text-[#1F75C1]"
                }`}>
                  {hasActiveSub
                    ? "Gói VIP - Vô hạn lượt"
                    : `Lượt thử: ${bmiAttemptsLeft}/3`}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 font-inter-tight-small text-left">
              
              {/* Toggle Self vs Other */}
              <div className="bg-white p-4 rounded-xl border border-[#e5e7eb] flex items-center justify-between shadow-2xs">
                <div>
                  <h3 className="font-bold text-[#1F75C1] text-sm">Sử dụng hồ sơ của tôi</h3>
                  <p className="text-[#858585] text-[10px] mt-0.5">Tự động điền tuổi, giới tính và tiền sử bệnh lý</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={isForSelf}
                    onChange={(e) => setIsForSelf(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7AB5E9]"></div>
                </label>
              </div>

              {/* Row 1: Age & Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#1F75C1] uppercase tracking-wider mb-2">Độ tuổi</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-white border border-[#e5e7eb] rounded-xl px-4 py-3 text-black font-bold focus:outline-none focus:border-[#7AB5E9] transition-colors shadow-2xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1F75C1] uppercase tracking-wider mb-2">Giới tính</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Nam", "Nữ", "Khác"].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setGender(item)}
                        className={`py-3 rounded-xl font-bold text-xs transition-all duration-200 border ${
                          gender === item
                            ? "bg-[#7AB5E9] border-[#7AB5E9] text-white shadow-sm"
                            : "bg-white border-[#e5e7eb] text-black hover:bg-[#e9eaec]"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 2: Height & Weight with real-time BMI indicator */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#1F75C1] uppercase tracking-wider mb-2">Chiều cao (cm)</label>
                  <input
                    type="number"
                    min="50"
                    max="250"
                    required
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full bg-white border border-[#e5e7eb] rounded-xl px-4 py-3 text-black font-bold focus:outline-none focus:border-[#7AB5E9] transition-colors shadow-2xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1F75C1] uppercase tracking-wider mb-2">Cân nặng (kg)</label>
                  <input
                    type="number"
                    min="10"
                    max="250"
                    required
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full bg-white border border-[#e5e7eb] rounded-xl px-4 py-3 text-black font-bold focus:outline-none focus:border-[#7AB5E9] transition-colors shadow-2xs"
                  />
                </div>
              </div>

              {/* Real-time BMI Display Box */}
              <div className="bg-white rounded-xl p-4 border border-[#e5e7eb] flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#7AB5E9]/10 text-[#7AB5E9] rounded-lg flex items-center justify-center">
                    <Scale size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#858585] uppercase tracking-wider">Chỉ số BMI ước tính</p>
                    <p className="text-lg font-bold text-black">{bmi} kg/m²</p>
                  </div>
                </div>
                <div className={`px-4 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-wider ${bmiColor}`}>
                  {bmiCategory}
                </div>
              </div>

              {/* Row 3: Hypertension & Heart Disease */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#1F75C1] uppercase tracking-wider mb-2 flex items-center gap-1">
                    Cao huyết áp
                    <span className="text-[#858585] cursor-help" title="Huyết áp lớn hơn 140/90 mmHg">
                      <Info size={11} />
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Có", value: true },
                      { label: "Không", value: false }
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setHypertension(opt.value)}
                        className={`py-3 rounded-xl font-bold text-xs transition-all duration-200 border ${
                          hypertension === opt.value
                            ? "bg-[#7AB5E9] border-[#7AB5E9] text-white shadow-sm"
                            : "bg-white border-[#e5e7eb] text-black hover:bg-[#e9eaec]"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1F75C1] uppercase tracking-wider mb-2 flex items-center gap-1">
                    Bệnh lý tim mạch
                    <span className="text-[#858585] cursor-help" title="Tiền sử rung nhĩ, bệnh mạch vành, suy tim...">
                      <Info size={11} />
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Có", value: true },
                      { label: "Không", value: false }
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setHeartDisease(opt.value)}
                        className={`py-3 rounded-xl font-bold text-xs transition-all duration-200 border ${
                          heartDisease === opt.value
                            ? "bg-[#7AB5E9] border-[#7AB5E9] text-white shadow-sm"
                            : "bg-white border-[#e5e7eb] text-black hover:bg-[#e9eaec]"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 4: Glucose Level & Smoking Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#1F75C1] uppercase tracking-wider mb-2 flex items-center gap-1">
                    Đường huyết (mg/dL)
                    <span className="text-[#858585] cursor-help" title="Chỉ số đường huyết trung bình lúc đói">
                      <Info size={11} />
                    </span>
                  </label>
                  <input
                    type="number"
                    min="40"
                    max="500"
                    required
                    value={glucoseLevel}
                    onChange={(e) => setGlucoseLevel(e.target.value)}
                    className="w-full bg-white border border-[#e5e7eb] rounded-xl px-4 py-3 text-black font-bold focus:outline-none focus:border-[#7AB5E9] transition-colors shadow-2xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1F75C1] uppercase tracking-wider mb-2">Thói quen hút thuốc</label>
                  <select
                    value={smokingStatus}
                    onChange={(e) => setSmokingStatus(e.target.value)}
                    className="w-full bg-white border border-[#e5e7eb] rounded-xl px-4 py-3 text-black font-bold focus:outline-none focus:border-[#7AB5E9] transition-colors shadow-2xs"
                  >
                    <option value="Chưa từng hút">Chưa từng hút thuốc</option>
                    <option value="Đã từng hút">Đã từng hút (Đã bỏ)</option>
                    <option value="Thường xuyên hút">Có hút (Thường xuyên)</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#7AB5E9] text-white py-4 rounded-full font-bold hover:bg-[#5CA5E4] hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-md shadow-[#7AB5E9]/15 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    ĐANG PHÂN TÍCH CHỈ SỐ Y KHOA...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} className="fill-white" />
                    TÍNH TOÁN NGUY CƠ ĐỘT QUỴ QUA AI
                  </>
                )}
              </button>

            </form>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-[#d32f2f] px-4 py-3 rounded-xl font-semibold text-xs leading-relaxed">
                {error}
              </div>
            )}
          </div>

          {/* RIGHT: Results Display & History */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Results card */}
            <div className="bg-white border border-[#e5e7eb] rounded-[24px] p-6 md:p-8 shadow-sm flex flex-col items-center min-h-[380px] justify-between relative overflow-hidden">
              
              {!result ? (
                // Blank State
                <div className="flex-1 flex flex-col items-center justify-center text-center py-10 font-inter-tight-small">
                  <div className="w-14 h-14 bg-[#1F75C1]/5 text-[#1F75C1]/30 rounded-full flex items-center justify-center mb-4">
                    <Brain size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-black font-inter tracking-tight mb-2">Chờ phân tích kết quả</h3>
                  <p className="text-[#858585] text-xs font-semibold max-w-xs leading-relaxed">
                    Vui lòng hoàn tất biểu mẫu y tế ở bên trái và bấm nút "Tính toán" để nhận kết quả phân tích rủi ro chi tiết.
                  </p>
                </div>
              ) : (
                // Result State
                <div className="w-full flex-1 flex flex-col items-center justify-between font-inter-tight-small">
                  
                  {/* Category Pill */}
                  <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border mb-4 ${currentRiskTheme.bg} ${currentRiskTheme.text} ${currentRiskTheme.border}`}>
                    Mức độ nguy cơ: {result.risk_category}
                  </span>

                  {/* Circular Arc SVG Gauge */}
                  <div className="relative w-44 h-44 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* Grey Track */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray="251.2"
                        strokeDashoffset="62.8" /* 3/4 circle */
                        strokeLinecap="round"
                        className="opacity-40"
                      />
                      {/* Active Progress Bar */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke={currentRiskTheme.stroke}
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray="251.2"
                        strokeDashoffset={251.2 - (251.2 * 0.75 * result.risk_percentage) / 100}
                        strokeLinecap="round"
                        style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
                      />
                    </svg>
                    
                    {/* Inner Content */}
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-3xl md:text-4xl font-extrabold text-black font-inter tracking-tight">
                        {result.risk_percentage}%
                      </span>
                      <span className="text-[10px] font-bold text-[#858585] uppercase tracking-widest mt-1">Chỉ số</span>
                    </div>
                  </div>

                  {/* Diagnosis detail list */}
                  <div className="w-full bg-[#f8f9fa] border border-[#e5e7eb] rounded-2xl p-4 my-6 text-left space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-[#858585]">Chỉ số cơ thể (BMI):</span>
                      <span className="text-black font-bold">{result.bmi} ({result.bmi_category})</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold border-t border-[#e5e7eb]/60 pt-2">
                      <span className="text-[#858585]">Tiền sử bệnh nền:</span>
                      <span className="text-black font-bold">
                        {[
                          hypertension ? "Huyết áp" : null,
                          heartDisease ? "Tim mạch" : null
                        ].filter(Boolean).join(", ") || "Không có"}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold border-t border-[#e5e7eb]/60 pt-2">
                      <span className="text-[#858585]">Mức đường huyết:</span>
                      <span className="text-black font-bold">{glucoseLevel} mg/dL</span>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className={`rounded-xl p-4 border text-xs font-semibold leading-relaxed text-left w-full ${currentRiskTheme.bg} ${currentRiskTheme.text} ${currentRiskTheme.border}`}>
                    <p className="font-bold flex items-center gap-1.5 mb-1.5 uppercase text-[10px] tracking-wider">
                      <ShieldAlert size={14} /> Khuyến nghị Y tế:
                    </p>
                    {result.recommendation}
                  </div>

                  {/* Action link triggers */}
                  <div className="w-full grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-[#e5e7eb]">
                    <button 
                      onClick={() => navigate("/befast")}
                      className="bg-[#1F75C1] text-white py-2.5 rounded-full font-bold text-[11px] flex items-center justify-center gap-1.5 hover:bg-[#1d3d43] transition-colors cursor-pointer"
                    >
                      <Play size={10} className="fill-white" /> Check BEFAST
                    </button>
                    <button 
                      onClick={() => navigate("/nearby-hospital")}
                      className="bg-white border border-[#e5e7eb] text-black py-2.5 rounded-full font-bold text-[11px] flex items-center justify-center gap-1.5 hover:bg-[#f5f5f5] transition-colors cursor-pointer"
                    >
                      <Navigation size={10} /> Tìm bệnh viện
                    </button>
                  </div>

                </div>
              )}
            </div>

            {/* MongoDB History log panel */}
            <div className="bg-[#f0f1f2] border border-[#e5e7eb]/80 rounded-[24px] p-6 shadow-sm font-inter-tight-small">
              <h3 className="text-xs font-extrabold uppercase text-[#1F75C1] tracking-widest mb-4 flex items-center gap-1.5">
                <Heart size={13} className="text-[#d32f2f] fill-[#d32f2f]" /> Lịch sử đo gần đây
              </h3>

              {bmiData.length === 0 ? (
                <div className="text-center py-6 text-[#858585] text-xs font-semibold">
                  Chưa ghi nhận kết quả đo nào.
                </div>
              ) : (
                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                  {bmiData.slice(0, 5).map((item) => (
                    <div 
                      key={item._id || item.id} 
                      className="bg-white rounded-xl p-3.5 border border-[#e5e7eb] flex items-center justify-between hover:border-[#7AB5E9]/30 transition-colors shadow-2xs text-left"
                    >
                      <div>
                        <p className="text-[10px] font-bold text-[#858585]">
                          {new Date(item.createdAt).toLocaleDateString("vi-VN")} {new Date(item.createdAt).toLocaleTimeString("vi-VN", {hour: "2-digit", minute: "2-digit"})}
                        </p>
                        <p className="text-xs font-extrabold text-black mt-1">
                          Nguy cơ: <span className={
                            item.riskCategory === "Thấp" ? "text-[#7AB5E9]" : 
                            item.riskCategory === "Trung bình" ? "text-amber-500" : "text-red-500"
                          }>{item.riskPercentage}% ({item.riskCategory})</span>
                        </p>
                        <p className="text-[10px] text-[#858585] mt-0.5">BMI: {item.bmi} ({item.bmiCategory})</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </UserLayout>
  );
};

export default StrokeRiskScreen;
