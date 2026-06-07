import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

export default function ItemMainFunction(props) {
  const navigate = useNavigate();
  const IconComponent = props.nameIcon ? LucideIcons[props.nameIcon] || LucideIcons.HelpCircle : LucideIcons.HelpCircle;

  const handlePress = () => {
    if (props.telNumber) {
      window.location.href = `tel:${props.telNumber}`;
      return;
    }
    if (props.link) {
      navigate(props.link);
    }
  };

  const isDanger = props.danger;

  return (
    <button
      onClick={handlePress}
      type="button"
      className={`group w-full h-[180px] rounded-[20px] border flex flex-col justify-between text-left p-6 transition-all duration-300 shadow-sm hover:shadow-md
        ${isDanger 
          ? 'bg-red-50/50 border-red-200/50 hover:bg-red-50 hover:border-red-300 text-black' 
          : 'bg-[#f0f1f2] border-transparent hover:border-[#1F75C1]/20 hover:bg-[#e9eaec] text-black'}
      `}
    >
      <div className={`w-12 h-12 rounded-[12px] flex items-center justify-center transition-all duration-300 shadow-sm border
        ${isDanger 
          ? 'bg-[#d32f2f] text-white border-[#d32f2f]' 
          : 'bg-[#1F75C1] text-white border-[#1F75C1] group-hover:bg-[#7AB5E9] group-hover:border-[#7AB5E9] group-hover:scale-105'}
      `}>
        <IconComponent size={22} strokeWidth={2} />
      </div>

      <div>
        <span className="text-[16px] font-semibold font-inter-tight-small block mb-1 tracking-tight leading-snug text-black group-hover:text-[#1F75C1] transition-colors">
          {props.title}
        </span>
        <div className={`w-8 h-0.5 rounded-full transition-all duration-300 group-hover:w-1/2
          ${isDanger ? 'bg-red-500' : 'bg-[#7AB5E9]'}`} 
        />
      </div>
    </button>
  );
}
