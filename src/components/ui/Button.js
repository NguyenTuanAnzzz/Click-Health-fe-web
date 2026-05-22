import React from 'react';
import * as LucideIcons from 'lucide-react';

const Button = (props) => {
  const IconRight = props.nameIcon ? LucideIcons[props.nameIcon] || LucideIcons.ArrowRight : null;

  // Determine button styles based on 2.AG variants
  let btnClass = "btn-activation-filled";
  if (props.variant === 'ghost' || props.outline || props.variant === 'ghost-dark') {
    btnClass = "btn-ghost-outline-dark";
  } else if (props.variant === 'pill' || props.variant === 'pill-dark') {
    btnClass = "btn-pill-outline-dark";
  }

  return (
    <button
      onClick={props.handle}
      disabled={props.loading}
      className={`flex items-center justify-center text-center select-none cursor-pointer transition-all duration-300 font-inter-tight-small
        ${btnClass} 
        ${props.loading ? 'opacity-65 cursor-not-allowed' : ''} 
        ${props.className || 'w-full'}`}
    >
      {props.loading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <span className="font-semibold leading-none">{props.title}</span>
          {IconRight && <IconRight size={props.sizeIcon || 16} className="flex-shrink-0" />}
        </div>
      )}
    </button>
  );
};

export default Button;
