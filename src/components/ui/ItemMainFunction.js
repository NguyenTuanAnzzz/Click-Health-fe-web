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
      className={`group w-full h-[240px] rounded-[32px] flex flex-col justify-between text-left p-7 transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden
        ${isDanger 
          ? 'bg-gradient-to-br from-error/5 to-error/10 border border-error/20 hover:border-error/40' 
          : 'bg-white border border-outline-variant/40 hover:border-primary/40'}
      `}
    >
      {/* Decorative large blurred icon/image in background */}
      {props.imgSrc ? (
        <img 
          src={props.imgSrc} 
          alt="" 
          className="absolute -bottom-10 -right-10 w-48 h-48 opacity-[0.03] group-hover:opacity-10 group-hover:scale-110 transition-all duration-700 pointer-events-none object-contain"
        />
      ) : (
        <IconComponent 
          size={180} 
          strokeWidth={1} 
          className={`absolute -bottom-10 -right-10 opacity-[0.03] group-hover:scale-110 transition-transform duration-700 pointer-events-none
            ${isDanger ? 'text-error' : 'text-primary'}`} 
        />
      )}

      {/* Top Icon / Image */}
      {props.imgSrc ? (
        <div className="relative z-10 w-24 h-24 mb-2 flex items-center justify-center transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-110">
          <img src={props.imgSrc} alt="" className="w-full h-full object-contain drop-shadow-xl" />
        </div>
      ) : (
        <div className={`w-16 h-16 mb-4 rounded-[20px] flex items-center justify-center transition-all duration-500 shadow-md relative z-10
          ${isDanger 
            ? 'bg-error/10 text-error shadow-error/10 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-error/20' 
            : 'bg-primary/5 text-primary border border-primary/10 shadow-primary/5 group-hover:bg-primary/10 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-primary/20'}
        `}>
          <IconComponent size={32} strokeWidth={2.5} />
        </div>
      )}

      {/* Bottom Text */}
      <div className="relative z-10 mt-auto">
        <span className="text-[18px] font-extrabold font-headline block mb-3 tracking-tight leading-snug text-[#1E293B] group-hover:text-primary transition-colors">
          {props.title}
        </span>
        <div className="flex items-center gap-2">
          <span className={`text-[12px] font-black uppercase tracking-widest ${isDanger ? 'text-error' : 'text-primary/70 group-hover:text-primary transition-colors'}`}>Khám phá</span>
          <LucideIcons.ArrowRight size={14} className={`transform group-hover:translate-x-2 transition-transform duration-300 ${isDanger ? 'text-error' : 'text-primary/70 group-hover:text-primary'}`} strokeWidth={3} />
        </div>
      </div>
    </button>
  );
}
