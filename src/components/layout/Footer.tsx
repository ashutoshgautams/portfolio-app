// components/layout/Footer.tsx
"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import FluidInteraction from '../utils/FluidInteraction';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const waveRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!footerRef.current || !waveRef.current) return;
    
    const footer = footerRef.current;
    const wave = waveRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = footer.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) / rect.width;
      const mouseY = (e.clientY - rect.top) / rect.height;
      
      // Update wave path
      const wavePaths = wave.querySelectorAll('path');
      wavePaths.forEach((path, index) => {
        // Use mouse position to create dynamic waves
        const factor = index + 1;
        const amplitude = 20 * (1 - mouseY) * factor;
        const period = 1000 - mouseX * 500;
        
        let d = `M 0,100 `;
        for (let i = 0; i <= 1000; i += 20) {
          const x = i;
          const y = 100 + Math.sin(i / period * Math.PI * 2) * amplitude;
          d += `L ${x},${y} `;
        }
        d += `L 1000,100 L 1000,200 L 0,200 Z`;
        
        path.setAttribute('d', d);
      });
    };
    
    footer.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      footer.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={styles.waveContainer}>
        <svg ref={waveRef} className={styles.wave} viewBox="0 0 1000 200" preserveAspectRatio="none">
          <path className={styles.wavePath1} d="M 0,100 L 1000,100 L 1000,200 L 0,200 Z"></path>
          <path className={styles.wavePath2} d="M 0,100 L 1000,100 L 1000,200 L 0,200 Z"></path>
          <path className={styles.wavePath3} d="M 0,100 L 1000,100 L 1000,200 L 0,200 Z"></path>
        </svg>
      </div>
      
      <div className={styles.container}>
        <FluidInteraction intensity={0.5} className={styles.fluidBackground}>
          <div className={styles.mainContent}>
            <div className={styles.brand}>
              <Link href="/" className={styles.logoLink}>
                <span className={styles.logo}>
                  <span className={styles.logoHighlight}>A</span>shutosh Gautam
                </span>
              </Link>
              <p className={styles.tagline}>
                Building digital experiences that make a difference.
              </p>
              <div className={styles.socialLinks}>
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                  <svg className={styles.socialIcon} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                  <svg className={styles.socialIcon} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter">
                  <svg className={styles.socialIcon} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className={styles.linksSection}>
              <div className={styles.linkColumn}>
                <h3 className={styles.columnTitle}>Navigation</h3>
                <div className={styles.linkList}>
                  <Link href="/" className={styles.footerLink}>Home</Link>
                  <Link href="/projects" className={styles.footerLink}>Projects</Link>
                  <Link href="/blog" className={styles.footerLink}>Blog</Link>
                  <Link href="/resume" className={styles.footerLink}>My Journey</Link>
                  <Link href="/contact" className={styles.footerLink}>Contact</Link>
                </div>
              </div>
              
              <div className={styles.linkColumn}>
                <h3 className={styles.columnTitle}>Contact</h3>
                <div className={styles.contactList}>
                  <a href="mailto:ashutoshgautam10b11@gmail.com" className={styles.contactLink}>
                    ashutoshgautam10b11@gmail.com
                  </a>
                  <span className={styles.contactInfo}>Remote, India</span>
                  <Link href="/contact" className={styles.contactButton}>
                    Get In Touch
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.bottomBar}>
            <div className={styles.copyright}>
              © {currentYear} Ashutosh Gautam. All rights reserved.
            </div>
            <div className={styles.builtWith}>
              Crafted with <span className={styles.heart}>❤</span> using Next.js & TypeScript
            </div>
          </div>
        </FluidInteraction>
      </div>
    </footer>
  );
};

export default Footer;