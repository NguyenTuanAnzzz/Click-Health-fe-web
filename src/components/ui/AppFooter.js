import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

const AppFooter = () => {
  return (
    <footer className="bg-surface-container-lowest w-full py-16 border-t border-outline-variant/30 relative z-20 mt-auto font-body">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-10 max-w-[1200px] mx-auto">
        <div className="space-y-6 md:col-span-1">
          <div className="flex items-center gap-2">
            <Activity size={24} className="text-primary" strokeWidth={3} />
            <div className="text-2xl font-extrabold tracking-tight font-headline text-on-surface">
              Click<span className="text-primary">Health</span>
            </div>
          </div>
          <p className="text-[14px] font-medium text-on-surface-variant leading-relaxed">
            © 2026 Click Health.<br/>Công nghệ bảo vệ nhịp đập gia đình bạn.
          </p>
        </div>
        <div>
          <h4 className="font-extrabold text-[15px] mb-6 text-on-surface uppercase tracking-wider">Sản phẩm</h4>
          <ul className="space-y-4">
            <li><Link to="/befast" className="text-[14px] font-medium text-on-surface-variant hover:text-primary transition-colors">Tầm soát BEFAST</Link></li>
            <li><Link to="/mri" className="text-[14px] font-medium text-on-surface-variant hover:text-primary transition-colors">Phân tích MRI</Link></li>
            <li><Link to="/stroke-risk-score" className="text-[14px] font-medium text-on-surface-variant hover:text-primary transition-colors">Đánh giá rủi ro BMI</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-extrabold text-[15px] mb-6 text-on-surface uppercase tracking-wider">Hỗ trợ</h4>
          <ul className="space-y-4">
            <li><Link to="/knowledge" className="text-[14px] font-medium text-on-surface-variant hover:text-primary transition-colors">Thư viện y khoa</Link></li>
            <li><Link to="/faq" className="text-[14px] font-medium text-on-surface-variant hover:text-primary transition-colors">Hướng dẫn sử dụng</Link></li>
            <li><Link to="/privacy" className="text-[14px] font-medium text-on-surface-variant hover:text-primary transition-colors">Bảo mật thông tin</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-extrabold text-[15px] mb-6 text-on-surface uppercase tracking-wider">Liên hệ</h4>
          <ul className="space-y-4">
            <li><a href="tel:0375705654" className="text-[14px] font-medium text-on-surface-variant hover:text-primary transition-colors">Hotline: 0375705654</a></li>
            <li><a href="mailto:hi@click-health.app" className="text-[14px] font-medium text-on-surface-variant hover:text-primary transition-colors">Email: hi@click-health.app</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-outline-variant/30 text-center px-6">
        <p className="text-[12px] font-medium text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
          Tuyên bố miễn trừ trách nhiệm: Click Health là công cụ hỗ trợ tầm soát sớm dựa trên AI, <strong className="text-on-surface">không thay thế chẩn đoán y tế chuyên môn</strong>. Luôn gọi ngay 115 hoặc đến cơ sở y tế gần nhất trong trường hợp khẩn cấp.
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;
