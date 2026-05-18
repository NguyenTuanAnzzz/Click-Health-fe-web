import React from 'react';
import * as LucideIcons from 'lucide-react';

const Button = (props) => {
  const IconRight = props.nameIcon ? LucideIcons[props.nameIcon] || LucideIcons.ArrowRight : null;

  return (
    <button
      onClick={props.handle}
      disabled={props.loading}
      className={`w-full min-h-[48px] rounded-md flex items-center justify-center px-5 py-3 shadow-sm 
      bg-primary text-white hover:bg-primary-dark transition-colors
      ${props.loading ? 'opacity-65 cursor-not-allowed' : ''} ${props.className || ''}`}
    >
      {props.loading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      ) : (
        <>
          <span className="mr-2 text-[0.95rem] font-semibold">{props.title}</span>
          {IconRight && <IconRight size={props.sizeIcon || 18} />}
        </>
      )}
    </button>
  );
};

export default Button;
