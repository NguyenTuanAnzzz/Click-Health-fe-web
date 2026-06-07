import React from 'react';
import * as LucideIcons from 'lucide-react';

const Input = (props) => {
  const IconLeft = props.nameIcon ? LucideIcons[props.nameIcon] || LucideIcons.HelpCircle : null;
  const IconRight = props.rightIcon ? LucideIcons[props.rightIcon] || LucideIcons.HelpCircle : null;

  const isUnderlined = props.variant === 'underlined';
  
  return (
    <div className="w-full mb-4">
      {props.label && (
        <label className="block mb-2 ml-1 text-[13px] font-semibold text-[#151515] font-inter-tight-small">
          {props.label}
        </label>
      )}

      <div className={`relative flex items-center transition-all duration-300 w-full
        ${isUnderlined 
          ? 'border-b border-[#1F75C1] rounded-[5px] bg-transparent focus-within:border-[#7AB5E9]' 
          : 'bg-white border border-border/60 rounded-[9999px] shadow-sm focus-within:border-[#7AB5E9] focus-within:ring-2 focus-within:ring-[#7AB5E9]/15'}`}
      >
        {IconLeft && (
          <div className="absolute left-4 flex items-center justify-center text-[#1F75C1] z-10 pointer-events-none">
            <IconLeft size={props.sizeIcon || 18} />
          </div>
        )}

        <input
          type={props.secure ? 'password' : props.keyboard === 'email-address' ? 'email' : 'text'}
          placeholder={props.placeholder}
          className={`w-full min-h-[50px] bg-transparent outline-none text-[14px] font-medium text-black placeholder-[#999999] transition-all duration-300
            ${IconLeft ? 'pl-11' : 'pl-5'} 
            ${IconRight ? 'pr-12' : 'pr-5'}`}
          value={props.value}
          onChange={(e) => props.onChangeText && props.onChangeText(e.target.value)}
        />

        {IconRight && (
          <button
            type="button"
            className="absolute right-4 flex items-center justify-center text-[#999999] hover:text-[#151515] focus:outline-none z-10 transition-colors"
            onClick={props.onPressRightIcon}
          >
            <IconRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
