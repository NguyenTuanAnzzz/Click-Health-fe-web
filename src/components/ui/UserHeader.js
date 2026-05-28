import React from 'react';
import { User, Activity } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserHeader = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  
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
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-[#244d54] rounded-[10px] flex items-center justify-center shadow-sm transition-all duration-300 group-hover:bg-[#2ecea0] group-hover:scale-105">
               <Activity size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold font-inter-heading tracking-tight text-black">
              Click<span className="text-[#2ecea0]">Health</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 font-inter-tight-small">
            <Link 
              to="/" 
              className={`text-[12px] font-extrabold uppercase tracking-wider transition-colors duration-300 relative py-1 group
                ${isActive('/') ? 'text-black' : 'text-[#858585] hover:text-black'}`}
            >
              Trang chủ
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#2ecea0] transition-all duration-300
                ${isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'}`} 
              />
            </Link>
            <Link 
              to="/befast" 
              className={`text-[12px] font-extrabold uppercase tracking-wider transition-colors duration-300 relative py-1 group
                ${isActive('/befast') ? 'text-black' : 'text-[#858585] hover:text-black'}`}
            >
              BeFast AI
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#2ecea0] transition-all duration-300
                ${isActive('/befast') ? 'w-full' : 'w-0 group-hover:w-full'}`} 
              />
            </Link>
            <Link 
              to="/stroke-risk-score" 
              className={`text-[12px] font-extrabold uppercase tracking-wider transition-colors duration-300 relative py-1 group
                ${isActive('/stroke-risk-score') ? 'text-black' : 'text-[#858585] hover:text-black'}`}
            >
              Tầm soát BMI
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#2ecea0] transition-all duration-300
                ${isActive('/stroke-risk-score') ? 'w-full' : 'w-0 group-hover:w-full'}`} 
              />
            </Link>
            <Link 
              to="/recovery-exercise" 
              className={`text-[12px] font-extrabold uppercase tracking-wider transition-colors duration-300 relative py-1 group
                ${isActive('/recovery-exercise') ? 'text-black' : 'text-[#858585] hover:text-black'}`}
            >
              Bài tập Phục hồi
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#2ecea0] transition-all duration-300
                ${isActive('/recovery-exercise') ? 'w-full' : 'w-0 group-hover:w-full'}`} 
              />
            </Link>
            <Link 
              to="/knowledge" 
              className={`text-[12px] font-extrabold uppercase tracking-wider transition-colors duration-300 relative py-1 group
                ${isActive('/knowledge') ? 'text-black' : 'text-[#858585] hover:text-black'}`}
            >
              Kiến thức đột quỵ
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#2ecea0] transition-all duration-300
                ${isActive('/knowledge') ? 'w-full' : 'w-0 group-hover:w-full'}`} 
              />
            </Link>
            <Link 
              to="/history" 
              className={`text-[12px] font-extrabold uppercase tracking-wider transition-colors duration-300 relative py-1 group
                ${isActive('/history') ? 'text-black' : 'text-[#858585] hover:text-black'}`}
            >
              Lịch sử
              <span className={`absolute bottom-0 left-0 h-0.5 bg-[#2ecea0] transition-all duration-300
                ${isActive('/history') ? 'w-full' : 'w-0 group-hover:w-full'}`} 
              />
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            to="/profile" 
            className="flex items-center gap-2.5 p-1 rounded-full border border-[#e5e7eb] bg-white hover:bg-[#f0f1f2] hover:border-[#244d54]/20 transition-all duration-300 group pr-4 shadow-sm"
          >
            <div className="w-8 h-8 rounded-full bg-[#244d54]/10 flex items-center justify-center text-[#244d54] overflow-hidden border border-[#e5e7eb] transition-all duration-300 group-hover:bg-[#2ecea0]/10 group-hover:text-[#2ecea0]">
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User size={16} strokeWidth={2.2} />
              )}
            </div>
            <div className="hidden sm:block font-inter-tight-small text-left">
              <p className="text-[13px] font-bold text-[#151515] leading-none transition-colors duration-300 group-hover:text-[#244d54]">
                {getShortName(user?.fullName || user?.email)}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
