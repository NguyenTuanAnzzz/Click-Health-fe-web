import React from 'react';

const AuthLayout = ({ children, tagline = "Hệ thống cảnh báo đột quỵ thông minh" }) => {
  return (
    <div className="min-h-screen relative flex items-center justify-center font-body bg-surface-container-low overflow-hidden p-4">
      {/* Spectacular Light Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-primary/30 to-secondary-container/20 blur-[100px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute top-[20%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-bl from-secondary-container/20 to-primary/10 blur-[120px] animate-[pulse_10s_ease-in-out_infinite_alternate]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[80vw] rounded-full bg-primary/10 blur-[150px]" />
        <div className="absolute inset-0 bg-surface/50 backdrop-blur-[2px]" />
      </div>

      {/* Central Frosted Glass Container */}
      <div className="relative z-10 w-full max-w-[480px] animate-[fadeIn_0.5s_ease-out]">
        
        {/* Logo outside the card for premium feel */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-24 h-24 bg-surface-container-lowest/80 backdrop-blur-xl rounded-[28px] shadow-[0_10px_30px_rgba(0,82,163,0.15)] border border-white flex items-center justify-center p-4 mb-5 transform transition-transform hover:scale-110 duration-500">
            <img src="/My_logo.png" alt="ClickHealth Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-2 drop-shadow-sm">
            Click<span className="text-primary">Health</span>
          </h1>
          <p className="text-[13px] font-bold text-primary uppercase tracking-[0.25em] opacity-80">{tagline}</p>
        </div>

        {/* The Glass Card */}
        <div className="w-full bg-surface-container-lowest/80 backdrop-blur-3xl rounded-[32px] p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,82,163,0.1)] border border-white/80 relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80" />
          
          <div className="relative z-10">
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-[12px] font-bold text-primary/50 uppercase tracking-[0.2em]">
          © 2026 Click Health. Pharma Clean Standard.
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
