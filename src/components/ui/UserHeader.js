import React, { useState } from 'react';
import { User, Menu, X, Activity } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const UserHeader = () => {
  const { user, token } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 py-4 transition-all duration-300 font-body">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-10">
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 -ml-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-highest rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link to="/" className="flex items-center gap-3 overflow-hidden group">
            <motion.div
              initial={{ x: -50, y: -100, opacity: 0, rotate: -45 }}
              animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 1, type: 'spring', bounce: 0.6, delay: 0.2 }}
            >
              <img src="/My_logo.png" alt="ClickHealth Logo" className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110" />
            </motion.div>
            
            <div className="flex items-center">
              {Array.from("Click ").map((letter, i) => (
                <motion.span
                  key={`c-${i}`}
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    type: "spring", 
                    bounce: 0.7,
                    delay: 0.4 + (i * 0.1) 
                  }}
                  className="text-xl font-extrabold font-headline tracking-tight text-on-surface whitespace-pre"
                >
                  {letter}
                </motion.span>
              ))}
              {Array.from("Health").map((letter, i) => (
                <motion.span
                  key={`h-${i}`}
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    type: "spring", 
                    bounce: 0.7,
                    delay: 1.0 + (i * 0.1) 
                  }}
                  className="text-xl font-extrabold font-headline tracking-tight text-primary whitespace-pre"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-[13px] font-extrabold uppercase tracking-wider transition-colors duration-300 relative py-1 group
                ${isActive('/') ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}
            >
              Trang chủ
              <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300
                ${isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'}`} 
              />
            </Link>
            
            {token ? (
              <>
                <Link 
                  to="/befast" 
                  className={`text-[13px] font-extrabold uppercase tracking-wider transition-colors duration-300 relative py-1 group
                    ${isActive('/befast') ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}
                >
                  BeFast AI
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300
                    ${isActive('/befast') ? 'w-full' : 'w-0 group-hover:w-full'}`} 
                  />
                </Link>
                <Link 
                  to="/stroke-risk-score" 
                  className={`text-[13px] font-extrabold uppercase tracking-wider transition-colors duration-300 relative py-1 group
                    ${isActive('/stroke-risk-score') ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}
                >
                  Tầm soát BMI
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300
                    ${isActive('/stroke-risk-score') ? 'w-full' : 'w-0 group-hover:w-full'}`} 
                  />
                </Link>
                <Link 
                  to="/recovery-exercise" 
                  className={`text-[13px] font-extrabold uppercase tracking-wider transition-colors duration-300 relative py-1 group
                    ${isActive('/recovery-exercise') ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}
                >
                  Bài tập Phục hồi
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300
                    ${isActive('/recovery-exercise') ? 'w-full' : 'w-0 group-hover:w-full'}`} 
                  />
                </Link>
                <Link 
                  to="/knowledge" 
                  className={`text-[13px] font-extrabold uppercase tracking-wider transition-colors duration-300 relative py-1 group
                    ${isActive('/knowledge') ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}
                >
                  Kiến thức
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300
                    ${isActive('/knowledge') ? 'w-full' : 'w-0 group-hover:w-full'}`} 
                  />
                </Link>
                <Link 
                  to="/history" 
                  className={`text-[13px] font-extrabold uppercase tracking-wider transition-colors duration-300 relative py-1 group
                    ${isActive('/history') ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}
                >
                  Lịch sử
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300
                    ${isActive('/history') ? 'w-full' : 'w-0 group-hover:w-full'}`} 
                  />
                </Link>
              </>
            ) : (
              <>
                <Link to="/knowledge" className="text-[13px] font-extrabold uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors duration-300 relative py-1 group">
                  Kiến thức
                  <span className="absolute bottom-0 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300" />
                </Link>
                <Link to="/" className="text-[13px] font-extrabold uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors duration-300 relative py-1 group">
                  Bảng giá
                  <span className="absolute bottom-0 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300" />
                </Link>
                <Link to="/" className="text-[13px] font-extrabold uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors duration-300 relative py-1 group">
                  Hỗ trợ
                  <span className="absolute bottom-0 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300" />
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {token ? (
            <Link 
              to="/profile" 
              className="flex items-center gap-2.5 p-1 rounded-full border border-outline-variant bg-surface hover:bg-surface-container-low hover:border-primary/30 transition-all duration-300 group pr-4 shadow-sm"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden border border-outline-variant transition-all duration-300 group-hover:bg-primary group-hover:text-on-primary">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User size={16} strokeWidth={2.2} />
                )}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[13px] font-bold text-on-surface leading-none transition-colors duration-300 group-hover:text-primary">
                  {getShortName(user?.fullName || user?.email)}
                </p>
              </div>
            </Link>
          ) : (
            <>
              <button 
                onClick={() => navigate('/login')}
                className="text-on-surface-variant font-bold text-[14px] hover:text-primary transition-colors hidden sm:block"
              >
                Đăng nhập
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold text-[14px] shadow-lg shadow-primary/20 hover:scale-105 hover:shadow-primary/30 transition-all duration-300 active:scale-95"
              >
                Tham gia
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-surface border-b border-outline-variant shadow-lg transition-all duration-300 origin-top ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
        <nav className="flex flex-col py-2">
          <Link 
            to="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`px-6 py-3 text-[14px] font-bold uppercase tracking-wider transition-colors duration-300
              ${isActive('/') ? 'bg-primary/5 text-primary border-l-4 border-primary' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface border-l-4 border-transparent'}`}
          >
            Trang chủ
          </Link>
          
          {token ? (
            <>
              <Link to="/befast" onClick={() => setIsMobileMenuOpen(false)} className={`px-6 py-3 text-[14px] font-bold uppercase tracking-wider transition-colors duration-300 ${isActive('/befast') ? 'bg-primary/5 text-primary border-l-4 border-primary' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface border-l-4 border-transparent'}`}>BeFast AI</Link>
              <Link to="/stroke-risk-score" onClick={() => setIsMobileMenuOpen(false)} className={`px-6 py-3 text-[14px] font-bold uppercase tracking-wider transition-colors duration-300 ${isActive('/stroke-risk-score') ? 'bg-primary/5 text-primary border-l-4 border-primary' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface border-l-4 border-transparent'}`}>Tầm soát BMI</Link>
              <Link to="/recovery-exercise" onClick={() => setIsMobileMenuOpen(false)} className={`px-6 py-3 text-[14px] font-bold uppercase tracking-wider transition-colors duration-300 ${isActive('/recovery-exercise') ? 'bg-primary/5 text-primary border-l-4 border-primary' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface border-l-4 border-transparent'}`}>Bài tập Phục hồi</Link>
              <Link to="/knowledge" onClick={() => setIsMobileMenuOpen(false)} className={`px-6 py-3 text-[14px] font-bold uppercase tracking-wider transition-colors duration-300 ${isActive('/knowledge') ? 'bg-primary/5 text-primary border-l-4 border-primary' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface border-l-4 border-transparent'}`}>Kiến thức đột quỵ</Link>
              <Link to="/history" onClick={() => setIsMobileMenuOpen(false)} className={`px-6 py-3 text-[14px] font-bold uppercase tracking-wider transition-colors duration-300 ${isActive('/history') ? 'bg-primary/5 text-primary border-l-4 border-primary' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface border-l-4 border-transparent'}`}>Lịch sử</Link>
            </>
          ) : (
            <>
              <Link to="/knowledge" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-3 text-[14px] font-bold uppercase tracking-wider transition-colors duration-300 text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface border-l-4 border-transparent">Kiến thức</Link>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-3 text-[14px] font-bold uppercase tracking-wider transition-colors duration-300 text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface border-l-4 border-transparent">Bảng giá</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default UserHeader;
