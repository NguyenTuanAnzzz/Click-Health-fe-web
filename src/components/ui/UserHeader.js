import React, { useState } from 'react';
import { User, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserHeader = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const getShortName = (fullName) => {
    if (!fullName) return "Người dùng";
    const parts = fullName.split(" ");
    if (parts.length > 1) {
      return `${parts[0]} ${parts[parts.length - 1]}`;
    }
    return fullName;
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#e5e7eb] py-4 transition-all duration-300">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-10">
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 -ml-2 text-gray-600 hover:text-[#1F75C1] hover:bg-[#f0f1f2] rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group">
            <img src="/My_logo.png" alt="ClickHealth Logo" className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
            <span className="text-xl font-bold font-inter-heading tracking-tight text-black">
              Click<span className="text-[#7AB5E9]">Health</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 font-inter-tight-small">
            <Link 
              to="/" 
              className={`text-[12px] font-extrabold uppercase tracking-wider transition-colors duration-300 relative py-1 group
                ${isActive('/') ? 'text-black' : 'text-[#858585] hover:text-black'}`}
            >
              Trang chủ
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#7AB5E9] transition-all duration-300
                ${isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'}`} 
              />
            </Link>
            <Link 
              to="/befast" 
              className={`text-[12px] font-extrabold uppercase tracking-wider transition-colors duration-300 relative py-1 group
                ${isActive('/befast') ? 'text-black' : 'text-[#858585] hover:text-black'}`}
            >
              BeFast AI
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#7AB5E9] transition-all duration-300
                ${isActive('/befast') ? 'w-full' : 'w-0 group-hover:w-full'}`} 
              />
            </Link>
            <Link 
              to="/stroke-risk-score" 
              className={`text-[12px] font-extrabold uppercase tracking-wider transition-colors duration-300 relative py-1 group
                ${isActive('/stroke-risk-score') ? 'text-black' : 'text-[#858585] hover:text-black'}`}
            >
              Tầm soát BMI
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#7AB5E9] transition-all duration-300
                ${isActive('/stroke-risk-score') ? 'w-full' : 'w-0 group-hover:w-full'}`} 
              />
            </Link>
            <Link 
              to="/recovery-exercise" 
              className={`text-[12px] font-extrabold uppercase tracking-wider transition-colors duration-300 relative py-1 group
                ${isActive('/recovery-exercise') ? 'text-black' : 'text-[#858585] hover:text-black'}`}
            >
              Bài tập Phục hồi
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#7AB5E9] transition-all duration-300
                ${isActive('/recovery-exercise') ? 'w-full' : 'w-0 group-hover:w-full'}`} 
              />
            </Link>
            <Link 
              to="/knowledge" 
              className={`text-[12px] font-extrabold uppercase tracking-wider transition-colors duration-300 relative py-1 group
                ${isActive('/knowledge') ? 'text-black' : 'text-[#858585] hover:text-black'}`}
            >
              Kiến thức đột quỵ
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#7AB5E9] transition-all duration-300
                ${isActive('/knowledge') ? 'w-full' : 'w-0 group-hover:w-full'}`} 
              />
            </Link>
            <Link 
              to="/history" 
              className={`text-[12px] font-extrabold uppercase tracking-wider transition-colors duration-300 relative py-1 group
                ${isActive('/history') ? 'text-black' : 'text-[#858585] hover:text-black'}`}
            >
              Lịch sử
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#7AB5E9] transition-all duration-300
                ${isActive('/history') ? 'w-full' : 'w-0 group-hover:w-full'}`} 
              />
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            to="/profile" 
            className="flex items-center gap-2.5 p-1 rounded-full border border-[#e5e7eb] bg-white hover:bg-[#f0f1f2] hover:border-[#1F75C1]/20 transition-all duration-300 group pr-4 shadow-sm"
          >
            <div className="w-8 h-8 rounded-full bg-[#1F75C1]/10 flex items-center justify-center text-[#1F75C1] overflow-hidden border border-[#e5e7eb] transition-all duration-300 group-hover:bg-[#7AB5E9]/10 group-hover:text-[#7AB5E9]">
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User size={16} strokeWidth={2.2} />
              )}
            </div>
            <div className="hidden sm:block font-inter-tight-small text-left">
              <p className="text-[13px] font-bold text-[#151515] leading-none transition-colors duration-300 group-hover:text-[#1F75C1]">
                {getShortName(user?.fullName || user?.email)}
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-[#e5e7eb] shadow-lg transition-all duration-300 origin-top ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
        <nav className="flex flex-col py-2 font-inter-tight-small">
          <Link 
            to="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`px-6 py-3 text-[14px] font-bold uppercase tracking-wider transition-colors duration-300
              ${isActive('/') ? 'bg-[#f0f1f2] text-[#1F75C1] border-l-4 border-[#1F75C1]' : 'text-[#858585] hover:bg-[#f8fafc] hover:text-black border-l-4 border-transparent'}`}
          >
            Trang chủ
          </Link>
          <Link 
            to="/befast" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`px-6 py-3 text-[14px] font-bold uppercase tracking-wider transition-colors duration-300
              ${isActive('/befast') ? 'bg-[#f0f1f2] text-[#1F75C1] border-l-4 border-[#1F75C1]' : 'text-[#858585] hover:bg-[#f8fafc] hover:text-black border-l-4 border-transparent'}`}
          >
            BeFast AI
          </Link>
          <Link 
            to="/stroke-risk-score" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`px-6 py-3 text-[14px] font-bold uppercase tracking-wider transition-colors duration-300
              ${isActive('/stroke-risk-score') ? 'bg-[#f0f1f2] text-[#1F75C1] border-l-4 border-[#1F75C1]' : 'text-[#858585] hover:bg-[#f8fafc] hover:text-black border-l-4 border-transparent'}`}
          >
            Tầm soát BMI
          </Link>
          <Link 
            to="/recovery-exercise" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`px-6 py-3 text-[14px] font-bold uppercase tracking-wider transition-colors duration-300
              ${isActive('/recovery-exercise') ? 'bg-[#f0f1f2] text-[#1F75C1] border-l-4 border-[#1F75C1]' : 'text-[#858585] hover:bg-[#f8fafc] hover:text-black border-l-4 border-transparent'}`}
          >
            Bài tập Phục hồi
          </Link>
          <Link 
            to="/knowledge" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`px-6 py-3 text-[14px] font-bold uppercase tracking-wider transition-colors duration-300
              ${isActive('/knowledge') ? 'bg-[#f0f1f2] text-[#1F75C1] border-l-4 border-[#1F75C1]' : 'text-[#858585] hover:bg-[#f8fafc] hover:text-black border-l-4 border-transparent'}`}
          >
            Kiến thức đột quỵ
          </Link>
          <Link 
            to="/history" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`px-6 py-3 text-[14px] font-bold uppercase tracking-wider transition-colors duration-300
              ${isActive('/history') ? 'bg-[#f0f1f2] text-[#1F75C1] border-l-4 border-[#1F75C1]' : 'text-[#858585] hover:bg-[#f8fafc] hover:text-black border-l-4 border-transparent'}`}
          >
            Lịch sử
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default UserHeader;
