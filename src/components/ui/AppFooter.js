import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin, ArrowRight, Activity } from 'lucide-react';

const AppFooter = () => {
  return (
    <footer className="bg-[#0B1A2A] text-white pt-20 pb-12 mt-auto border-t border-[#1F2937]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="pr-4 lg:pr-8">
            <div className="flex items-center gap-3 mb-6">
              <img src="/My_logo.png" alt="ClickHealth Logo" className="h-12 w-auto object-contain bg-white rounded-xl p-1.5 shadow-sm" />
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Click<span className="text-[#3B82F6]">Health</span>
              </h2>
            </div>
            <p className="text-[#94A3B8] leading-relaxed mb-6 text-[15px] font-normal">
              Bảo vệ sức khỏe cộng đồng bằng Trí tuệ nhân tạo. Giải pháp tầm soát đột quỵ chính xác, tin cậy và tận tâm.
            </p>
            <div className="flex gap-4">
              {[Globe, Mail, Phone, MapPin].map((Icon, idx) => (
                <a key={idx} href="#" className="text-[#94A3B8] hover:text-white transition-colors">
                  <Icon size={20} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-[14px] font-semibold mb-6 uppercase tracking-wider text-white">
              Dịch vụ
            </h3>
            <ul className="space-y-3.5 text-[15px] font-normal text-[#94A3B8]">
              <li><Link to="/befast" className="hover:text-white transition-colors">Tầm soát BEFAST</Link></li>
              <li><Link to="/risk" className="hover:text-white transition-colors">Đánh giá nguy cơ</Link></li>
              <li><Link to="/hospital" className="hover:text-white transition-colors">Tìm bệnh viện</Link></li>
              <li><Link to="/recovery" className="hover:text-white transition-colors">Phục hồi chức năng</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[14px] font-semibold mb-6 uppercase tracking-wider text-white">
              Hỗ trợ
            </h3>
            <ul className="space-y-3.5 text-[15px] font-normal text-[#94A3B8]">
              <li><Link to="/faq" className="hover:text-white transition-colors">Câu hỏi thường gặp</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Liên hệ chuyên gia</Link></li>
              <li className="pt-2"><Link to="/emergency" className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors font-semibold"><Activity size={16} /> CẤP CỨU 115</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[14px] font-semibold mb-6 uppercase tracking-wider text-white">Bản tin Sức khỏe</h3>
            <p className="text-[#94A3B8] text-[15px] font-normal mb-4">Cập nhật những thông tin y khoa và lời khuyên sức khỏe mới nhất.</p>
            <div className="flex flex-col gap-3">
              <input type="email" placeholder="Địa chỉ email của bạn" className="bg-[#1E293B] border border-[#334155] rounded-lg px-4 py-3 text-white text-[14px] focus:outline-none focus:border-[#3B82F6] transition-colors placeholder:text-[#64748B]" />
              <button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium py-3 rounded-lg transition-colors text-[14px]">Đăng ký nhận tin</button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-[#1E293B] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#64748B] text-[14px] font-normal">© 2026 Click Health. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/terms" className="text-[#64748B] hover:text-[#94A3B8] text-[14px] transition-colors">Điều khoản dịch vụ</Link>
            <Link to="/privacy" className="text-[#64748B] hover:text-[#94A3B8] text-[14px] transition-colors">Chính sách bảo mật</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
