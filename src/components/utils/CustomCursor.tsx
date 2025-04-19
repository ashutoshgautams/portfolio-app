// components/utils/CustomCursor.tsx
'use client';

import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
      
      if (!isVisible) {
        setIsVisible(true);
      }
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    
    // Check if we're on a device with a mouse
    const hasMouseSupport = window.matchMedia('(hover: hover)').matches;
    
    if (hasMouseSupport) {
      window.addEventListener('mousemove', updateCursorPosition);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);
    }
    
    return () => {
      if (hasMouseSupport) {
        window.removeEventListener('mousemove', updateCursorPosition);
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, [isVisible]);

  // Don't render anything on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      <div 
        className="cursor-dot" 
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      <div 
        className="cursor-ring" 
        style={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  );
};

export default CustomCursor;