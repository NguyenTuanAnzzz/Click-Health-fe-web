import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, Outlet } from 'react-router-dom';

const BefastLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans overflow-x-hidden">
      {/* Header */}
      <header className="bg-surface border-b border-border py-4 px-4 md:px-8">
        <div className="max-w-[1200px] mx-auto flex items-center">
          <button 
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-md bg-neutral flex items-center justify-center text-primary hover:border-tertiary border border-transparent transition-colors mr-4"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-h1 text-primary text-xl">Tầm soát Đột quỵ (BEFAST)</h1>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 max-w-[1200px] w-full mx-auto p-4 md:p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default BefastLayout;
