import React, { useState } from 'react';
import axios from 'axios';

// Component dùng ở trang "Kiểm tra BEFAST" để người dùng tải video lên
const BefastVideoUploader = ({ onCheckAiAndSaveHistory }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleProcess = async () => {
    if (!file) return alert('Vui lòng chọn video cần kiểm tra');

    setIsUploading(true);
    try {
      // 1. UPLOAD VIDEO LÊN MINIO
      const formData = new FormData();
      formData.append('video', file);

      const uploadRes = await axios.post('http://localhost:9999/api/videos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const videoKey = uploadRes.data.videoKey; // Đã giấu video thành công

      // 2. GỬI LÊN AI & LƯU LỊCH SỬ (Giao lại cho Trang chính xử lý)
      // Lúc này ta đã có videoKey, ta gọi hàm callback để trang chính gọi AI và lưu
      if (onCheckAiAndSaveHistory) {
        await onCheckAiAndSaveHistory(file, videoKey);
      }

    } catch (err) {
      console.error('Lỗi xử lý video:', err);
      alert('Có lỗi xảy ra khi tải video lên hệ thống an toàn.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
      <h3 className="text-lg font-bold mb-2 text-blue-800">Kiểm tra đột quỵ qua Video</h3>
      <input 
        type="file" 
        accept="video/*" 
        onChange={(e) => setFile(e.target.files[0])} 
        className="mb-4 block w-full text-sm"
      />
      <button 
        onClick={handleProcess}
        disabled={isUploading || !file}
        className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50 hover:bg-blue-700"
      >
        {isUploading ? 'Đang xử lý bảo mật...' : 'Kiểm tra với AI'}
      </button>
      <p className="text-xs text-gray-500 mt-2">
        *Video của bạn được mã hóa và lưu trữ an toàn trên máy chủ nội bộ.
      </p>
    </div>
  );
};

export default BefastVideoUploader;
