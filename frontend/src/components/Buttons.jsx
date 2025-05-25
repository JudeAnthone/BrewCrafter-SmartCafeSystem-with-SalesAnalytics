import React from 'react'
import { motion } from 'framer-motion'; 

const Buttons = ({ text, bgColor, hoverColor, textColor, onClick, extraClasses = "" }) => {
  return (
    <button
      className={`${bgColor} ${hoverColor} ${textColor} font-semibold py-3 px-8 rounded-full transition duration-300 ${extraClasses}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
export default Buttons;