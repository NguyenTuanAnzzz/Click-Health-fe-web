import React from 'react';

const GenderOption = (props) => {
  const isSelected = props.selectedValue === props.value;

  return (
    <button
      type="button"
      className={`flex-1 h-11 rounded-md overflow-hidden transition-all duration-200 ${
        isSelected
          ? 'shadow-sm bg-primary text-white border-transparent'
          : 'border border-border bg-neutral text-secondary hover:bg-white'
      }`}
      onClick={() => props.onSelect(props.value)}
    >
      <span className={`text-[14px] ${isSelected ? 'font-semibold' : 'font-medium'}`}>
        {props.label}
      </span>
    </button>
  );
};

export default GenderOption;
