import React from 'react';
import { AlertCircle } from 'lucide-react';

const Error = (props) => {
  return (
    <div className="w-full flex items-start bg-red-50 rounded-2xl p-3.5 mt-3 mb-1 border border-red-200">
      <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
        <AlertCircle size={18} className="text-red-500" />
      </div>

      <div className="ml-2.5 flex-1">
        <h3 className="text-red-600 text-[14px] font-extrabold mb-1">{props.title}</h3>
        {!!props.desc && (
          <p className="text-red-800 text-[13px] font-medium leading-relaxed">{props.desc}</p>
        )}
      </div>
    </div>
  );
};

export default Error;
