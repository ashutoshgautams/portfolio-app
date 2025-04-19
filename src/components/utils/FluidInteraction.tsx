 // components/utils/FluidInteraction.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import styles from './FluidInteraction.module.css';

interface FluidInteractionProps {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
}

const FluidInteraction: React.FC<FluidInteractionProps> = ({ 
  children, 
  intensity = 1, 
  className = '' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const prevMousePosition = useRef({ x: 0, y: 0 });
  const isMoving = useRef(false);
  const ripples = useRef<{ x: number; y: number; size: number; opacity: number; }[]>([]);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const particles: HTMLDivElement[] = [];
    const particleCount = 20;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = styles.particle;
      particle.style.setProperty('--x', `${Math.random() * 100}%`);
      particle.style.setProperty('--y', `${Math.random() * 100}%`);
      particle.style.setProperty('--size', `${Math.random() * 10 + 5}px`);
      particle.style.setProperty('--opacity', `${Math.random() * 0.3 + 0.1}`);
      
      container.appendChild(particle);
      particles.push(particle);
    }
    
    particlesRef.current = particles;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      prevMousePosition.current = { ...mousePosition.current };
      mousePosition.current = { x, y };
      
      if (!isMoving.current) {
        isMoving.current = true;
        animate();
      }
      
      // Create a ripple effect occasionally
      if (Math.random() > 0.85) {
        createRipple(x, y);
      }
    };
    
    const handleMouseLeave = () => {
      setTimeout(() => {
        isMoving.current = false;
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
      }, 1000);
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      
      // Clean up particles
      particlesRef.current.forEach(particle => {
        if (particle.parentNode === container) {
          container.removeChild(particle);
        }
      });
    };
  }, []);
  
  const createRipple = (x: number, y: number) => {
    ripples.current.push({
      x,
      y,
      size: 0,
      opacity: 0.5
    });
    
    if (ripples.current.length > 5) {
      ripples.current.shift();
    }
  };
  
  const animate = () => {
    if (!containerRef.current || !isMoving.current) return;
    
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    const velocity = {
      x: (mousePosition.current.x - prevMousePosition.current.x) * intensity,
      y: (mousePosition.current.y - prevMousePosition.current.y) * intensity
    };
    
    // Update particles
    particlesRef.current.forEach((particle, index) => {
      const particleX = parseFloat(particle.style.getPropertyValue('--x'));
      const particleY = parseFloat(particle.style.getPropertyValue('--y'));
      
      // Calculate new position with some easing
      const dx = mousePosition.current.x / width * 100 - particleX;
      const dy = mousePosition.current.y / height * 100 - particleY;
      
      // Apply different movement based on particle index (for variety)
      const factor = (index % 3 + 1) / 3 * intensity;
      const newX = particleX + dx * 0.05 * factor - velocity.x * 0.1;
      const newY = particleY + dy * 0.05 * factor - velocity.y * 0.1;
      
      // Apply boundaries
      const clampedX = Math.max(0, Math.min(100, newX));
      const clampedY = Math.max(0, Math.min(100, newY));
      
      particle.style.setProperty('--x', `${clampedX}%`);
      particle.style.setProperty('--y', `${clampedY}%`);
      
      // Randomly change opacity for subtle shimmering effect
      if (Math.random() > 0.95) {
        const newOpacity = Math.random() * 0.3 + 0.1;
        particle.style.setProperty('--opacity', `${newOpacity}`);
      }
    });
    
    // Update ripples
    ripples.current.forEach((ripple, index) => {
      ripple.size += 10;
      ripple.opacity -= 0.03;
      
      if (ripple.opacity <= 0) {
        ripples.current.splice(index, 1);
      }
    });
    
    animationFrameId.current = requestAnimationFrame(animate);
  };
  
  return (
    <div ref={containerRef} className={`${styles.fluidContainer} ${className}`}>
      {ripples.current.map((ripple, index) => (
        <div 
          key={index}
          className={styles.ripple}
          style={{
            width: `${ripple.size}px`,
            height: `${ripple.size}px`,
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            opacity: ripple.opacity
          }}
        />
      ))}
      {children}
    </div>
  );
};

export default FluidInteraction;