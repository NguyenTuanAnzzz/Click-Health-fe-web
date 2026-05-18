import React from 'react';
import { Bell, User, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserHeader = () => {
  const { user } = useSelector((state) => state.auth);
  
  const getShortName = (fullName) => {
    if (!fullName) return "Người dùng";
    const parts = fullName.split(" ");
    if (parts.length > 1) {
      return `${parts[0]} ${parts[parts.length - 1]}`;
    }
    return fullName;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border/10 py-3">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between">
        <div className="flex items-center gap-8 md:gap-12">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center shadow-sm transition-transform">
               <Activity size={24} className="text-white" />
            </div>
            <span className="text-2xl font-semibold tracking-tight text-main">
              Click<span className="text-primary">Health</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-semibold text-main hover:text-primary transition-colors relative group">
              Trang chủ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
            <Link to="/features" className="text-sm font-semibold text-secondary hover:text-primary transition-colors relative group">
              Chức năng
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
            <Link to="/knowledge" className="text-sm font-semibold text-secondary hover:text-primary transition-colors relative group">
              Kiến thức
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <button className="relative p-2.5 rounded-md bg-neutral border border-border/30 text-main hover:bg-primary/5 transition-all">
            <Bell size={20} strokeWidth={2} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border border-white" />
          </button>
          
          <Link 
            to="/profile" 
            className="flex items-center gap-3 p-1 rounded-md border border-border/30 bg-white hover:bg-neutral transition-all group pr-4"
          >
            <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center text-primary overflow-hidden border border-primary/20">
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User size={20} strokeWidth={2} />
              )}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-main leading-none">
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
