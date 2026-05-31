import React, { useState } from 'react';
import { Eye, Check, X } from 'lucide-react';

export default function EyesTestDeviceSelect({ onDeviceSelected, config }) {
  const [selectedDevice, setSelectedDevice] = useState(null);

  const devices = [
    {
      id: 'phone',
      name: 'Điện thoại',
      icon: '📱',
      distance: '50cm',
      steps: '0 bước',
      description: 'Giữ điện thoại ở khoảng cách một cánh tay',
      fontSizes: config.phone?.font_sizes || [60, 40, 25]
    },
    {
      id: 'laptop',
      name: 'Laptop',
      icon: '💻',
      distance: '120cm',
      steps: '~2 bước',
      description: 'Lùi lại khoảng 2 bước chân',
      fontSizes: config.laptop?.font_sizes || [80, 55, 35]
    },
    {
      id: 'monitor',
      name: 'Màn hình lớn / TV',
      icon: '🖥️',
      distance: '180cm',
      steps: '~3 bước',
      description: 'Lùi lại khoảng 3 bước chân',
      fontSizes: config.monitor?.font_sizes || [100, 70, 45]
    }
  ];

  return (
    <div className="bg-gradient-to-br from-white to-[#f8f9fa] rounded-[28px] p-8 max-w-4xl mx-auto shadow-lg border border-[#e5e7eb]/50 font-inter-tight-small">
      {/* Header */}
      <div className="mb-8">
        <span className="bg-[#244d54]/10 text-[#244d54] border border-[#244d54]/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block mb-4">
          Bước 2/5
        </span>
        <h2 className="text-2xl font-bold text-black flex items-center gap-2.5">
          <Eye size={28} className="text-[#2ecea0]" />
          E - Kiểm tra Thị lực
        </h2>
        <p className="text-[#6b7280] text-[15px] font-medium mt-2">
          Chọn thiết bị bạn muốn sử dụng để kiểm tra thị lực
        </p>
      </div>

      {/* Device Selection Grid */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {devices.map((device) => (
          <button
            key={device.id}
            onClick={() => setSelectedDevice(device.id)}
            className={`p-6 rounded-[20px] border-2 transition-all duration-300 text-left ${
              selectedDevice === device.id
                ? 'border-[#2ecea0] bg-[#2ecea0]/5 shadow-md'
                : 'border-[#e5e7eb] bg-white hover:border-[#2ecea0]/30'
            }`}
          >
            <div className="text-4xl mb-3">{device.icon}</div>
            <h3 className="font-bold text-[16px] text-black mb-2">{device.name}</h3>
            <div className="space-y-1.5 text-[12px]">
              <div className="text-[#6b7280]">
                <span className="font-semibold">Khoảng cách:</span> {device.distance}
              </div>
              <div className="text-[#6b7280]">
                <span className="font-semibold">Số bước:</span> {device.steps}
              </div>
              <div className="text-[#9ca3af]">{device.description}</div>
              <div className="text-[#9ca3af] pt-2 border-t border-[#e5e7eb]">
                Cỡ chữ: {device.fontSizes.join(', ')}px
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-300 rounded-[16px] p-4 mb-8">
        <h4 className="font-bold text-[#1e40af] text-[14px] mb-2">Hướng dẫn thực hiện:</h4>
        <ol className="text-[#1e40af] text-[12px] space-y-1 list-decimal list-inside">
          <li>Chọn loại thiết bị bạn sẽ sử dụng</li>
          <li>Nhấn Bắt đầu và di chuyển ra đúng khoảng cách quy định trong vòng 10 giây</li>
          <li>Lần lượt 3 ký tự (chữ cái/chữ số) sẽ xuất hiện trên màn hình</li>
          <li>Quan sát kỹ và chọn câu trả lời chính xác từ các phương án trắc nghiệm</li>
          <li>Nhận kết quả đánh giá thị lực sau khi hoàn thành</li>
        </ol>
      </div>

      {/* Start Button */}
      <div className="flex justify-end gap-3">
        <button
          disabled={!selectedDevice}
          onClick={() => onDeviceSelected(selectedDevice)}
          className="px-10 py-3 rounded-full font-bold text-white bg-gradient-to-r from-[#2ecea0] to-[#26b38a] hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none transition-all duration-300"
        >
          Bắt đầu kiểm tra
        </button>
      </div>
    </div>
  );
}
