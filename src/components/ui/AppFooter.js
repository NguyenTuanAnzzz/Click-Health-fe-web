import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin, ShieldCheck, ArrowRight, Activity } from 'lucide-react';

const AppFooter = () => {
  return (
    <footer className="bg-main text-white pt-20 pb-12 mt-auto relative overflow-hidden">
      {/* Background decoration - subtle gradient */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform translate-x-1/4 -z-0" />
      
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="pr-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center shadow-md">
                <ShieldCheck size={24} className="text-white" />
              </div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Click<span className="text-primary-light">Health</span>
              </h2>
            </div>
            <p className="text-white/60 leading-relaxed mb-8 text-lg font-normal">
              Bảo vệ sức khỏe cộng đồng bằng Trí tuệ nhân tạo. Giải pháp tầm soát đột quỵ chính xác, tin cậy và tận tâm.
            </p>
            <div className="flex gap-3">
              {[Globe, Mail, Phone, MapPin].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-md bg-white/5 flex items-center justify-center hover:bg-primary transition-all border border-white/10 shadow-sm">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          <div className="lg:pl-12">
            <h3 className="text-sm font-semibold mb-8 uppercase tracking-widest text-primary-light flex items-center gap-2">
              Dịch vụ
            </h3>
            <ul className="space-y-4 font-medium text-white/80">
              <li><Link to="/befast" className="hover:text-primary-light transition-colors flex items-center gap-2 group"><ArrowRight size={16} className="text-primary-light group-hover:translate-x-1 transition-transform" /> Tầm soát BEFAST</Link></li>
              <li><Link to="/risk" className="hover:text-primary-light transition-colors flex items-center gap-2 group"><ArrowRight size={16} className="text-primary-light group-hover:translate-x-1 transition-transform" /> Đánh giá nguy cơ</Link></li>
              <li><Link to="/hospital" className="hover:text-primary-light transition-colors flex items-center gap-2 group"><ArrowRight size={16} className="text-primary-light group-hover:translate-x-1 transition-transform" /> Tìm bệnh viện</Link></li>
              <li><Link to="/recovery" className="hover:text-primary-light transition-colors flex items-center gap-2 group"><ArrowRight size={16} className="text-primary-light group-hover:translate-x-1 transition-transform" /> Phục hồi chức năng</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-8 uppercase tracking-widest text-primary-light flex items-center gap-2">
              Hỗ trợ
            </h3>
            <ul className="space-y-4 font-medium text-white/80">
              <li><Link to="/faq" className="hover:text-primary-light transition-colors">Câu hỏi thường gặp</Link></li>
              <li><Link to="/contact" className="hover:text-primary-light transition-colors">Liên hệ chuyên gia</Link></li>
              <li><Link to="/emergency" className="text-white flex items-center gap-3 bg-danger/20 p-3 rounded-md border border-danger/30 font-semibold"><Activity size={18} className="text-danger" /> CẤP CỨU 115</Link></li>
            </ul>
          </div>
          
          <div className="bg-white/5 rounded-lg p-8 border border-white/10">
            <h3 className="text-xl font-semibold mb-4">Bản tin Sức khỏe</h3>
            <p className="text-white/50 text-sm font-medium mb-6">Cập nhật những thông tin y khoa và lời khuyên sức khỏe mới nhất.</p>
            <div className="flex flex-col gap-3">
              <input type="email" placeholder="Email của bạn..." className="bg-white/10 border border-white/10 rounded-md px-4 py-3 text-white font-medium focus:outline-none focus:border-primary-light transition-colors" />
              <button className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-md transition-all shadow-md active:scale-95 uppercase tracking-wider text-sm">Đăng ký ngay</button>
            </div>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
            <p className="text-white/30 text-[11px] font-semibold uppercase tracking-widest">© 2026 CLICK HEALTH. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6">
              <Link to="/terms" className="text-white/30 text-[11px] font-semibold hover:text-white transition-colors uppercase tracking-wider">Điều khoản</Link>
              <Link to="/privacy" className="text-white/30 text-[11px] font-semibold hover:text-white transition-colors uppercase tracking-wider">Bảo mật</Link>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-md border border-white/10 text-white/50">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.1em]">Hệ thống: Sẵn sàng</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
