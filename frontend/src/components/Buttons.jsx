import React from 'react'
import { motion } from 'framer-motion'; 

const Buttons = ({text, bgColor, hoverColor, textColor, onClick}) => {
  return (
    <motion.button
    className={`font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-md ${bgColor} ${hoverColor} ${textColor}`}
    whileHover={{ scale: 1.05 }}
    onClick={onClick}
    >
      {text}
    </motion.button>
  )
}
export default Buttons;