import React from 'react';
import * as LucideIcons from 'lucide-react';

const Input = (props) => {
  const IconLeft = props.nameIcon ? LucideIcons[props.nameIcon] || LucideIcons.HelpCircle : null;
  const IconRight = props.rightIcon ? LucideIcons[props.rightIcon] || LucideIcons.HelpCircle : null;

  return (
    <div className="w-full mb-4">
      <label className="block mb-2 ml-1 text-[13px] font-bold text-gray-900">
        {props.label}
      </label>

      <div className="relative min-h-[54px] rounded-2xl border border-border bg-inputBackground flex items-center">
        {IconLeft && (
          <div className="absolute left-3 flex items-center justify-center text-primary z-10">
            <IconLeft size={props.sizeIcon || 18} />
          </div>
        )}

        <input
          type={props.secure ? 'password' : props.keyboard === 'email-address' ? 'email' : 'text'}
          placeholder={props.placeholder}
          className={`w-full h-[54px] bg-transparent outline-none text-[15px] font-medium text-gray-900 placeholder-gray-400 ${IconLeft ? 'pl-11' : 'pl-4'} ${IconRight ? 'pr-12' : 'pr-4'}`}
          value={props.value}
          onChange={(e) => props.onChangeText && props.onChangeText(e.target.value)}
        />

        {IconRight && (
          <button
            type="button"
            className="absolute right-3 flex items-center justify-center text-gray-400 hover:text-gray-600 focus:outline-none z-10"
            onClick={props.onPressRightIcon}
          >
            <IconRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
