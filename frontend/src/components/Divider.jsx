import React from 'react';

const Divider = ({ top = true, bottom = true, colorMiddle = '#e4c9a7', colorDots = '#d7ccc8' }) => {
  return (
    <div className="relative py-12 bg-gradient-to-r from-[#f8f4f0] via-white to-[#f8f4f0]">
      {/* Top Line */}
      {top && (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-1/4 h-px"
          style={{ background: `linear-gradient(to right, transparent, ${colorMiddle}, transparent)` }}
        />
      )}
      
      {/* Dots */}
      <div className="flex justify-center items-center">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colorMiddle }}></div>
        <div className="w-3 h-3 rounded-full mx-1" style={{ backgroundColor: colorDots }}></div>
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colorMiddle }}></div>
      </div>
      
      {/* Bottom Line */}
      {bottom && (
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-1/4 h-px"
          style={{ background: `linear-gradient(to right, transparent, ${colorMiddle}, transparent)` }}
        />
      )}
    </div>
  );
};

export default Divider;
