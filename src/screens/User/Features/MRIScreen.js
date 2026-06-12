import React, { useState } from 'react';
import { Upload, FileImage, AlertCircle, Activity, ChevronLeft, CheckCircle, ArrowLeft, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveHistory } from '../../../store/slices/historySlice';
import { AI_API_URL } from '../../../constants/apiConfig';
import UserLayout from '../../../layouts/UserLayout';

export default function MRIScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(`${AI_API_URL}/predict-mri`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Không thể kết nối với AI Backend. Đảm bảo server đang chạy.');
      }

      const data = await response.json();
      if (data.success) {
        setResult(data);
        
        // Lưu vào History Database
        dispatch(saveHistory({
          conclusion: {
            isDanger: data.diagnosis !== 'Não bình thường',
            totalScore: data.diagnosis !== 'Não bình thường' ? 100 : 0,
            analysisMode: "mri_only"
          },
          mri: {
            diagnosis: data.diagnosis,
            confidence_percent: data.confidence_percent,
            isDanger: data.diagnosis !== 'Não bình thường'
          }
        }));
      } else {
        throw new Error('Phân tích thất bại');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isDanger = result && result.diagnosis !== 'Não bình thường';

  return (
    <UserLayout>
      <div className="w-full max-w-[1200px] mx-auto px-6 mt-8 pb-24 font-body">
        
        {/* Breadcrumb Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-6 font-bold text-xs uppercase tracking-wider"
        >
          <ArrowLeft size={14} /> Quay lại trang chủ
        </button>

        {/* Clinical Overhaul Banner */}
        <div className="relative rounded-[32px] bg-primary text-white p-8 md:p-12 mb-12 overflow-hidden shadow-xl shadow-primary/20">
          <div className="absolute inset-0 pattern-grid-lg opacity-25 pointer-events-none" />
          <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-left">
              <div className="inline-block bg-white/15 text-white border border-white/30 px-4 py-1.5 rounded-full font-bold uppercase tracking-wider text-[10px] mb-6">
                Chẩn đoán Hình ảnh AI
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold font-headline text-white tracking-tight mb-4 leading-tight">
                Chẩn đoán <span className="text-secondary-container">MRI Sọ Não</span>
              </h1>
              <p className="text-white/80 text-[15px] font-medium leading-relaxed max-w-xl">
                Tải lên ảnh chụp cộng hưởng từ (MRI) hoặc CT cắt lớp. Trí tuệ nhân tạo sẽ phân tích điểm ảnh để phát hiện sớm dấu hiệu nhồi máu hoặc xuất huyết não.
              </p>
            </div>
            
            {/* Elegant side icon */}
            <div className="hidden lg:flex w-24 h-24 bg-white/10 rounded-[24px] border border-white/15 items-center justify-center shadow-lg backdrop-blur-sm">
              <Activity size={44} className="text-white" />
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Upload Section */}
          <div className="bg-surface rounded-[32px] p-8 border border-outline-variant/60 shadow-sm">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-primary/40 bg-surface-container-lowest rounded-2xl cursor-pointer hover:bg-surface-container-low hover:border-primary/60 transition-all relative overflow-hidden group">
              {preview ? (
                <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80" />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload size={32} className="text-primary" />
                  </div>
                  <p className="mb-2 text-[15px] text-on-surface font-extrabold">Nhấn để tải ảnh lên</p>
                  <p className="text-[13px] text-on-surface-variant font-medium">JPG, PNG, DICOM (Tối đa 5MB)</p>
                </div>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>

            {preview && !result && !loading && (
              <button
                onClick={handleAnalyze}
                className="w-full mt-6 bg-primary text-on-primary py-4.5 rounded-full font-extrabold text-[14px] uppercase tracking-wider hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-primary/20 flex justify-center items-center gap-2"
              >
                <Activity size={18} />
                Phân tích ảnh với AI
              </button>
            )}

            {loading && (
              <div className="w-full mt-6 bg-surface-container border border-outline-variant/50 text-primary py-4.5 rounded-full font-extrabold text-[14px] uppercase tracking-wider flex justify-center items-center gap-3">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                AI đang xử lý hình ảnh...
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="bg-error/10 border border-error/20 text-error p-5 rounded-2xl flex items-start gap-3">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <span className="text-[14px] font-medium leading-relaxed">{error}</span>
            </div>
          )}

          {/* Result Section */}
          {result && (
            <div className={`rounded-[32px] p-8 shadow-sm border ${isDanger ? 'bg-error/10 border-error/20' : 'bg-green-500/10 border-green-500/20'}`}>
              <div className="flex items-center gap-4 mb-6">
                {isDanger ? (
                  <AlertCircle size={32} className="text-error" />
                ) : (
                  <CheckCircle size={32} className="text-green-600" />
                )}
                <h3 className={`text-2xl font-extrabold font-headline tracking-tight ${isDanger ? 'text-error' : 'text-green-600'}`}>
                  Kết quả Chẩn đoán
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-surface p-5 rounded-2xl border border-outline-variant/40 flex justify-between items-center shadow-sm">
                  <span className="text-on-surface-variant font-extrabold text-[13px] uppercase tracking-wider">Bệnh lý:</span>
                  <span className={`text-[16px] font-extrabold ${isDanger ? 'text-error' : 'text-green-600'}`}>
                    {result.diagnosis}
                  </span>
                </div>
                
                <div className="bg-surface p-5 rounded-2xl border border-outline-variant/40 flex justify-between items-center shadow-sm">
                  <span className="text-on-surface-variant font-extrabold text-[13px] uppercase tracking-wider">Độ tin cậy AI:</span>
                  <span className="text-[16px] font-extrabold text-on-surface">{result.confidence_percent}%</span>
                </div>
              </div>

              {isDanger && (
                <div className="mt-6 bg-surface-container-highest p-5 rounded-2xl border border-error/30 text-error text-[14px] font-medium leading-relaxed text-center shadow-sm">
                  <AlertCircle size={20} className="inline-block mr-2 mb-0.5" />
                  Vui lòng liên hệ Bác sĩ chuyên khoa thần kinh ngay lập tức để được tư vấn và có phác đồ điều trị kịp thời!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
}
