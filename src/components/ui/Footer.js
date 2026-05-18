import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (props) => {
  return (
    <div className={`flex flex-row justify-center items-center mt-auto pt-6 pb-1 ${props.className || ''}`}>
      <span className="text-[13px] font-medium text-gray-500">{props.titleLeft}</span>
      <Link to={props.goToLink} className="ml-1.5 text-[13px] font-extrabold text-primary hover:underline">
        {props.titleRight}
      </Link>
    </div>
  );
};

export default Footer;
