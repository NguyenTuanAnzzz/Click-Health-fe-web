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
      className={`group w-full h-[160px] rounded-lg border flex flex-col justify-between text-left p-6 transition-all shadow-sm hover:shadow-md
        ${isDanger 
          ? 'bg-danger/5 border-danger/30 hover:bg-danger/10 text-main' 
          : 'bg-white border-border/30 hover:border-primary/50 text-main'}
      `}
    >
      <div className={`w-12 h-12 rounded-md flex items-center justify-center transition-all shadow-sm border
        ${isDanger 
          ? 'bg-danger text-white border-danger' 
          : 'bg-primary/10 text-primary border-primary/20 group-hover:bg-primary group-hover:text-white'}
      `}>
        <IconComponent size={24} strokeWidth={2} />
      </div>

      <div>
        <span className="text-lg font-semibold block mb-1 tracking-tight leading-tight text-main">
          {props.title}
        </span>
        <div className="w-8 h-0.5 bg-primary/30 rounded-full group-hover:w-1/2 transition-all" />
      </div>
    </button>
  );
}
