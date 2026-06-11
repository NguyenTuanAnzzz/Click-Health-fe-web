import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Component này chuyên dùng để phát video an toàn trong trang "Lịch Sử"
const SecureVideoPlayer = ({ videoKey }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!videoKey) return;

    // Xin Backend cấp 1 cái link tạm thời (5 phút)
    const fetchSecureUrl = async () => {
      try {
        const res = await axios.get(`http://localhost:9999/api/videos/play/${videoKey}`);
        setVideoUrl(res.data.secureUrl);
      } catch (err) {
        console.error('Lỗi khi lấy video:', err);
        setError('Không thể tải video bảo mật');
      }
    };

    fetchSecureUrl();
  }, [videoKey]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!videoUrl) return <div className="text-gray-500 text-sm">Đang kết nối đám mây an toàn...</div>;

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 mt-2">
      <video 
        src={videoUrl} 
        controls 
        className="w-full object-cover"
        controlsList="nodownload" // Gợi ý trình duyệt ẩn nút Download
        onContextMenu={(e) => e.preventDefault()} // Chống bấm chuột phải tải video
      />
    </div>
  );
};

export default SecureVideoPlayer;
