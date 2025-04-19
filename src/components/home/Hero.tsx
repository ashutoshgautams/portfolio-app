// components/home/MinimalistHero.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';

const MinimalistHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Fade in on load
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // Subtle parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      
      if (scrollY < window.innerHeight) {
        const parallaxOffset = scrollY * 0.4;
        heroRef.current.style.transform = `translateY(${parallaxOffset}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={`${styles.hero} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.backgroundElements}>
        <div className={styles.gridOverlay}></div>
        <div className={styles.blurredCircle}></div>
      </div>
      
      <div className={styles.container} ref={heroRef}>
        <div className={styles.content}>
          <div className={styles.intro}>
            <span className={styles.greeting}>Hello, I&apos;m</span>
            <h1 className={styles.name}>
              <span className={styles.firstName}>Ashutosh</span>
              <span className={styles.lastName}>Gautam</span>
            </h1>
            <h2 className={styles.title}>Full-Stack Developer & UI Designer</h2>
          </div>
          
          <p className={styles.bio}>
            I craft responsive websites and web applications that provide intuitive, 
            pixel-perfect user experiences with modern technologies like 
            TypeScript, Next.js, and more.
          </p>
          
          <div className={styles.actions}>
            <Link href="/projects" className={styles.primaryButton}>
              <span className={styles.buttonText}>View My Work</span>
              <span className={styles.buttonIcon}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.33331 8H12.6666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 3.33334L12.6667 8.00001L8 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
            <Link href="/contact" className={styles.secondaryButton}>
              Get In Touch
            </Link>
            <a 
              href="/ashutosh-gautam-resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.outlineButton}
            >
              View Resume
            </a>
          </div>
          
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>3+</span>
              <span className={styles.statLabel}>Years Experience</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statValue}>5+</span>
              <span className={styles.statLabel}>Products</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statValue}>10+</span>
              <span className={styles.statLabel}>Solutions Delivered</span>
            </div>
          </div>
        </div>
        
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <Image
              src="/profile.jpg"
              alt="Ashutosh Gautam"
              width={400}
              height={500}
              priority
              className={styles.profileImage}
            />
            <div className={styles.imageBorder}></div>
          </div>
        </div>
      </div>
      
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine}></div>
        <span>Scroll</span>
      </div>
    </section>
  );
};

export default MinimalistHero;