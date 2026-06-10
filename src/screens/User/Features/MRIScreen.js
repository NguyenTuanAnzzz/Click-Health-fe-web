import React, { useState } from 'react';
import { Upload, FileImage, AlertCircle, Activity, ChevronLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AI_API_URL } from '../../../constants/apiConfig';

export default function MRIScreen() {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-[#F5F7FA] pb-24">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm sticky top-0 z-20 flex items-center justify-center relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft size={24} className="text-[#1E293B]" />
        </button>
        <h1 className="text-[18px] font-bold text-[#1E293B] font-inter">Chẩn đoán MRI</h1>
      </div>

      <div className="px-4 py-6 max-w-lg mx-auto">
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-6 text-center">
          <div className="w-16 h-16 bg-[#1F75C1]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Activity size={32} className="text-[#1F75C1]" />
          </div>
          <h2 className="text-xl font-bold text-[#1E293B] mb-2">Đọc phim bằng AI</h2>
          <p className="text-gray-500 text-sm">
            Tải lên ảnh chụp cộng hưởng từ (MRI) hoặc CT cắt lớp sọ não. AI sẽ phân tích và phát hiện nhồi máu hoặc xuất huyết não.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#1F75C1]/30 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors relative overflow-hidden">
            {preview ? (
              <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80" />
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload size={32} className="text-[#1F75C1] mb-3" />
                <p className="mb-2 text-sm text-gray-500 font-semibold">Nhấn để tải ảnh lên</p>
                <p className="text-xs text-gray-400">JPG, PNG (Max 5MB)</p>
              </div>
            )}
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          </label>

          {preview && !result && !loading && (
            <button
              onClick={handleAnalyze}
              className="w-full mt-4 bg-gradient-to-r from-[#1F75C1] to-[#125896] text-white py-4 rounded-xl font-bold text-lg shadow-lg"
            >
              Phân tích ảnh ngay
            </button>
          )}

          {loading && (
            <div className="w-full mt-4 bg-gray-100 text-[#1F75C1] py-4 rounded-xl font-bold text-lg flex justify-center items-center gap-2">
              <div className="w-5 h-5 border-2 border-[#1F75C1] border-t-transparent rounded-full animate-spin" />
              AI Đang đọc phim...
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 flex items-start gap-3">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Result Section */}
        {result && (
          <div className={`rounded-3xl p-6 shadow-sm border ${isDanger ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
            <div className="flex items-center gap-3 mb-4">
              {isDanger ? (
                <AlertCircle size={28} className="text-red-500" />
              ) : (
                <CheckCircle size={28} className="text-green-500" />
              )}
              <h3 className={`text-xl font-bold ${isDanger ? 'text-red-600' : 'text-green-600'}`}>
                Kết quả Chẩn đoán
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl flex justify-between items-center shadow-sm">
                <span className="text-gray-500 font-medium">Bệnh lý:</span>
                <span className={`font-bold ${isDanger ? 'text-red-600' : 'text-green-600'}`}>
                  {result.diagnosis}
                </span>
              </div>
              
              <div className="bg-white p-4 rounded-2xl flex justify-between items-center shadow-sm">
                <span className="text-gray-500 font-medium">Độ tin cậy AI:</span>
                <span className="font-bold text-[#1E293B]">{result.confidence_percent}%</span>
              </div>
            </div>

            {isDanger && (
              <p className="text-red-600 text-sm mt-4 font-medium text-center">
                Vui lòng liên hệ Bác sĩ chuyên khoa thần kinh ngay lập tức để có phác đồ điều trị kịp thời!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
