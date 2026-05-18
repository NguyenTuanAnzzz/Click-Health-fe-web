import React from 'react';
import { ShieldCheck } from 'lucide-react';

const AuthLayout = ({ children, tagline }) => {
  return (
    <div className="min-h-screen bg-neutral relative flex flex-col justify-center items-center overflow-hidden p-6">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white -skew-x-12 transform translate-x-1/4 -z-0" />

      <div className="z-10 w-full max-w-md flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 rounded-md bg-primary flex items-center justify-center mb-6 shadow-md">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-semibold text-main tracking-tight mb-2">
            Click<span className="text-primary">Health</span>
          </h1>
          <p className="text-sm font-medium text-secondary uppercase tracking-widest">{tagline}</p>
        </div>

        {/* Content Box */}
        <div className="w-full bg-white rounded-lg p-8 md:p-10 border border-border/20 shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            {children}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs font-semibold text-secondary uppercase tracking-widest">© 2026 Click Health. Pharma Clean Standard.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
