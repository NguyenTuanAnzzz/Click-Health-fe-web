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
  let bmiColor = "text-on-surface-variant bg-surface-container border-outline-variant/50";
  if (bmi > 0) {
    if (bmi < 18.5) {
      bmiCategory = "Thiếu cân";
      bmiColor = "text-primary bg-primary/10 border-primary/20";
    } else if (bmi < 23.0) {
      bmiCategory = "Bình thường";
      bmiColor = "text-primary bg-primary/10 border-primary/20";
    } else if (bmi < 25.0) {
      bmiCategory = "Thừa cân";
      bmiColor = "text-amber-600 bg-amber-50 border-amber-200";
    } else {
      bmiCategory = "Béo phì";
      bmiColor = "text-error bg-error/10 border-error/20";
    }
  }

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Check VIP subscription
    const now = new Date();
    const hasActiveSubscription = user?.subscriptionStatus !== 'NONE' && user?.subscriptionExpiry && new Date(user.subscriptionExpiry) > now;
    
    // Check trial attempts
    const bmiAttempts = user?.freeAttemptsBmiLeft !== undefined ? user.freeAttemptsBmiLeft : 3;
    
    if (!hasActiveSubscription && bmiAttempts <= 0) {
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
    if (cat === "Thấp") return { text: "text-primary", bg: "bg-primary/10", border: "border-primary/20", stroke: "#1F75C1" };
    if (cat === "Trung bình") return { text: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", stroke: "#f59e0b" };
    return { text: "text-error", bg: "bg-error/10", border: "border-error/20", stroke: "#ef4444" };
  };

  const currentRiskTheme = result ? getRiskColor(result.risk_category) : getRiskColor("Thấp");

  // VIP Subscription Status Helper
  const hasActiveSub = user?.subscriptionStatus !== 'NONE' && user?.subscriptionExpiry && new Date(user.subscriptionExpiry) > new Date();
  const bmiAttemptsLeft = user?.freeAttemptsBmiLeft !== undefined ? user.freeAttemptsBmiLeft : 3;

  return (
    <UserLayout noPaddingTop={false}>
      <div className="w-full max-w-[1200px] mx-auto px-6 mt-8 pb-24 bg-surface font-body">
        
        {/* Breadcrumb Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-6 font-bold text-sm uppercase tracking-wider"
        >
          <ArrowLeft size={14} /> Quay lại trang chủ
        </button>

        {/* Clinical Overhaul Banner */}
        <div className="relative rounded-[32px] bg-primary text-white p-8 md:p-12 mb-12 overflow-hidden shadow-xl shadow-primary/20">
          <div className="absolute inset-0 pattern-grid-lg opacity-25 pointer-events-none" />
          <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-left">
              <div className="inline-block bg-white/15 text-white border border-white/30 px-4 py-1.5 rounded-full font-bold uppercase tracking-wider text-[15px] mb-6">
                Chẩn đoán lâm sàng & BMI
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-white tracking-tight mb-4 leading-tight">
                Tầm soát <span className="text-secondary-container">Nguy cơ Đột quỵ</span>
              </h1>
              <p className="text-white/80 text-[15px] font-medium leading-relaxed max-w-xl">
                Cung cấp chỉ số cân nặng BMI, kết hợp các nguy cơ tiền sử bệnh nền huyết áp, tim mạch và thói quen sinh hoạt để phân tích nguy cơ tai biến mạch máu não tức thì.
              </p>
            </div>
            
            {/* Elegant side icon */}
            <div className="hidden lg:flex w-24 h-24 bg-white/10 rounded-[24px] border border-white/15 items-center justify-center shadow-lg backdrop-blur-sm">
              <Brain size={44} className="text-white" />
            </div>
          </div>
        </div>

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Input Form Card */}
          <div className="lg:col-span-7 bg-surface border border-outline-variant/60 rounded-[32px] p-6 md:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <h2 className="text-2xl font-extrabold text-on-surface font-headline tracking-tight flex items-center gap-2">
                <Activity size={22} className="text-primary" />
                Nhập chỉ số sức khỏe
              </h2>
              {user && (
                <div className={`px-4 py-1.5 rounded-full text-[16px] font-extrabold border uppercase tracking-wider text-center shrink-0 ${
                  hasActiveSub
                    ? "bg-primary/10 border-primary/20 text-primary"
                    : "bg-surface-container-high border-outline-variant text-on-surface-variant"
                }`}>
                  {hasActiveSub
                    ? "Gói VIP - Vô hạn lượt"
                    : `Lượt thử: ${bmiAttemptsLeft}/3`}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              
              {/* Toggle Self vs Other */}
              <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/50 flex items-center justify-between shadow-sm hover:border-primary/30 transition-colors">
                <div>
                  <h3 className="font-extrabold text-on-surface text-[18px]">Sử dụng hồ sơ của tôi</h3>
                  <p className="text-on-surface-variant text-[15px] font-medium mt-1">Tự động điền tuổi, giới tính và tiền sử bệnh lý</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={isForSelf}
                    onChange={(e) => setIsForSelf(e.target.checked)}
                  />
                  <div className="w-12 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-outline-variant after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Row 1: Age & Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[16px] font-extrabold text-on-surface-variant uppercase tracking-wider mb-2">Độ tuổi</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-4 text-on-surface font-extrabold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-[16px] font-extrabold text-on-surface-variant uppercase tracking-wider mb-2">Giới tính</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Nam", "Nữ", "Khác"].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setGender(item)}
                        className={`py-4 rounded-xl font-extrabold text-[16px] transition-all duration-200 border ${
                          gender === item
                            ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                            : "bg-surface border-outline-variant/60 text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
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
                  <label className="block text-[16px] font-extrabold text-on-surface-variant uppercase tracking-wider mb-2">Chiều cao (cm)</label>
                  <input
                    type="number"
                    min="50"
                    max="250"
                    required
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-4 text-on-surface font-extrabold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-[16px] font-extrabold text-on-surface-variant uppercase tracking-wider mb-2">Cân nặng (kg)</label>
                  <input
                    type="number"
                    min="10"
                    max="250"
                    required
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-4 text-on-surface font-extrabold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors shadow-sm"
                  />
                </div>
              </div>

              {/* Real-time BMI Display Box */}
              <div className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/50 flex flex-col sm:flex-row items-center justify-between shadow-sm gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-[14px] flex items-center justify-center">
                    <Scale size={20} />
                  </div>
                  <div>
                    <p className="text-[15px] font-extrabold text-on-surface-variant uppercase tracking-widest mb-0.5">Chỉ số BMI ước tính</p>
                    <p className="text-xl font-extrabold font-headline text-on-surface">{bmi} <span className="text-[18px] font-medium text-on-surface-variant">kg/m²</span></p>
                  </div>
                </div>
                <div className={`px-5 py-2 rounded-full border text-[15px] font-extrabold uppercase tracking-wider shadow-sm ${bmiColor}`}>
                  {bmiCategory}
                </div>
              </div>

              {/* Row 3: Hypertension & Heart Disease */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[16px] font-extrabold text-on-surface-variant uppercase tracking-wider mb-2 flex items-center gap-1">
                    Cao huyết áp
                    <span className="text-on-surface-variant cursor-help hover:text-primary transition-colors" title="Huyết áp lớn hơn 140/90 mmHg">
                      <Info size={13} />
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
                        className={`py-4 rounded-xl font-extrabold text-[16px] transition-all duration-200 border ${
                          hypertension === opt.value
                            ? "bg-error border-error text-white shadow-md shadow-error/20"
                            : "bg-surface border-outline-variant/60 text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[16px] font-extrabold text-on-surface-variant uppercase tracking-wider mb-2 flex items-center gap-1">
                    Bệnh lý tim mạch
                    <span className="text-on-surface-variant cursor-help hover:text-primary transition-colors" title="Tiền sử rung nhĩ, bệnh mạch vành, suy tim...">
                      <Info size={13} />
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
                        className={`py-4 rounded-xl font-extrabold text-[16px] transition-all duration-200 border ${
                          heartDisease === opt.value
                            ? "bg-error border-error text-white shadow-md shadow-error/20"
                            : "bg-surface border-outline-variant/60 text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
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
                  <label className="block text-[16px] font-extrabold text-on-surface-variant uppercase tracking-wider mb-2 flex items-center gap-1">
                    Đường huyết (mg/dL)
                    <span className="text-on-surface-variant cursor-help hover:text-primary transition-colors" title="Chỉ số đường huyết trung bình lúc đói">
                      <Info size={13} />
                    </span>
                  </label>
                  <input
                    type="number"
                    min="40"
                    max="500"
                    required
                    value={glucoseLevel}
                    onChange={(e) => setGlucoseLevel(e.target.value)}
                    className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-4 text-on-surface font-extrabold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-[16px] font-extrabold text-on-surface-variant uppercase tracking-wider mb-2">Thói quen hút thuốc</label>
                  <select
                    value={smokingStatus}
                    onChange={(e) => setSmokingStatus(e.target.value)}
                    className="w-full bg-surface border border-outline-variant/60 rounded-xl px-4 py-4 text-on-surface font-extrabold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors shadow-sm"
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
                className="w-full bg-primary text-on-primary py-5 rounded-full font-extrabold hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 text-[18px] shadow-lg shadow-primary/20 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    ĐANG PHÂN TÍCH CHỈ SỐ Y KHOA...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} className="fill-white" />
                    TÍNH TOÁN NGUY CƠ ĐỘT QUỴ QUA AI
                  </>
                )}
              </button>

            </form>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-[#d32f2f] px-4 py-4 rounded-xl font-semibold text-sm leading-relaxed">
                {error}
              </div>
            )}
          </div>

          {/* RIGHT: Results Display & History */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Results card */}
            <div className="bg-surface border border-outline-variant/60 rounded-[32px] p-8 shadow-sm flex flex-col items-center min-h-[420px] justify-between relative overflow-hidden">
              
              {!result ? (
                // Blank State
                <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
                  <div className="w-16 h-16 bg-surface-container text-primary rounded-2xl flex items-center justify-center mb-6">
                    <Brain size={32} />
                  </div>
                  <h3 className="text-xl font-extrabold text-on-surface font-headline tracking-tight mb-3">Chờ phân tích kết quả</h3>
                  <p className="text-on-surface-variant text-[18px] font-medium max-w-xs leading-relaxed">
                    Vui lòng hoàn tất biểu mẫu y tế ở bên trái và bấm nút "Tính toán" để nhận kết quả phân tích rủi ro chi tiết.
                  </p>
                </div>
              ) : (
                // Result State
                <div className="w-full flex-1 flex flex-col items-center justify-between">
                  
                  {/* Category Pill */}
                  <span className={`px-5 py-1.5 rounded-full text-[16px] font-extrabold uppercase tracking-wider border mb-6 ${currentRiskTheme.bg} ${currentRiskTheme.text} ${currentRiskTheme.border}`}>
                    Mức độ nguy cơ: {result.risk_category}
                  </span>

                  {/* Circular Arc SVG Gauge */}
                  <div className="relative w-48 h-48 flex items-center justify-center">
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
                      <span className="text-4xl font-extrabold text-on-surface font-headline tracking-tight">
                        {result.risk_percentage}%
                      </span>
                      <span className="text-[16px] font-extrabold text-on-surface-variant uppercase tracking-widest mt-1">Chỉ số</span>
                    </div>
                  </div>

                  {/* Diagnosis detail list */}
                  <div className="w-full bg-surface-container-low border border-outline-variant/50 rounded-2xl p-5 my-8 text-left space-y-3 shadow-sm">
                    <div className="flex justify-between text-[16px] font-medium">
                      <span className="text-on-surface-variant">Chỉ số cơ thể (BMI):</span>
                      <span className="text-on-surface font-extrabold">{result.bmi} ({result.bmi_category})</span>
                    </div>
                    <div className="flex justify-between text-[16px] font-medium border-t border-outline-variant/40 pt-3">
                      <span className="text-on-surface-variant">Tiền sử bệnh nền:</span>
                      <span className="text-on-surface font-extrabold">
                        {[
                          hypertension ? "Huyết áp" : null,
                          heartDisease ? "Tim mạch" : null
                        ].filter(Boolean).join(", ") || "Không có"}
                      </span>
                    </div>
                    <div className="flex justify-between text-[16px] font-medium border-t border-outline-variant/40 pt-3">
                      <span className="text-on-surface-variant">Mức đường huyết:</span>
                      <span className="text-on-surface font-extrabold">{glucoseLevel} mg/dL</span>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className={`rounded-2xl p-5 border text-[16px] font-medium leading-relaxed text-left w-full shadow-sm ${currentRiskTheme.bg} ${currentRiskTheme.text} ${currentRiskTheme.border}`}>
                    <p className="font-extrabold flex items-center gap-2 mb-2 uppercase text-[16px] tracking-widest">
                      <ShieldAlert size={16} /> Khuyến nghị Y tế:
                    </p>
                    {result.recommendation}
                  </div>

                  {/* Action link triggers */}
                  <div className="w-full grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-outline-variant/40">
                    <button 
                      onClick={() => navigate("/befast")}
                      className="bg-primary text-on-primary py-5 rounded-full font-extrabold text-[15px] uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary/90 hover:scale-105 transition-all shadow-md shadow-primary/20"
                    >
                      <Play size={14} className="fill-white" /> Check BEFAST
                    </button>
                    <button 
                      onClick={() => navigate("/hospital")}
                      className="bg-surface border border-outline-variant/60 text-on-surface py-5 rounded-full font-extrabold text-[15px] uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-surface-container-low hover:scale-105 transition-all shadow-sm"
                    >
                      <Navigation size={14} /> Tìm bệnh viện
                    </button>
                  </div>

                </div>
              )}
            </div>

            {/* MongoDB History log panel */}
            <div className="bg-surface-container-low border border-outline-variant/60 rounded-[32px] p-8 shadow-sm">
              <h3 className="text-[16px] font-extrabold uppercase text-primary tracking-widest mb-6 flex items-center gap-2 border-b border-outline-variant/40 pb-4">
                <Heart size={16} className="text-error fill-error" /> Lịch sử đo gần đây
              </h3>

              {bmiData.length === 0 ? (
                <div className="text-center py-8 text-on-surface-variant text-[18px] font-medium">
                  Chưa ghi nhận kết quả đo nào.
                </div>
              ) : (
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {bmiData.slice(0, 5).map((item) => (
                    <div 
                      key={item._id || item.id} 
                      className="bg-surface rounded-2xl p-4.5 border border-outline-variant/50 flex flex-col hover:border-primary/30 transition-colors shadow-sm text-left group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-on-surface font-extrabold text-[18px]">
                          Nguy cơ: <span className={
                            item.riskCategory === "Thấp" ? "text-primary" : 
                            item.riskCategory === "Trung bình" ? "text-amber-500" : "text-error"
                          }>{item.riskPercentage}% ({item.riskCategory})</span>
                        </p>
                        <p className="text-[15px] font-extrabold text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                      <p className="text-[15px] font-medium text-on-surface-variant flex items-center gap-1.5">
                        <Scale size={12} /> BMI: {item.bmi} ({item.bmiCategory})
                      </p>
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
