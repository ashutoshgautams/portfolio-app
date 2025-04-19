// components/layout/Header.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeSwitcher from '../ThemeSwitcher';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
      
      // Update header height variable for layout spacing
      if (headerRef.current) {
        const headerHeight = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
      }
    };
    
    // Initial height set
    if (headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);
  
  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    // Prevent body scroll when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = '';
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // Reset body overflow when component unmounts
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActive = (path: string) => pathname === path;

  return (
    <header 
      ref={headerRef}
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
    >
      <div className={styles.backdrop}></div>
      <div className={styles.container}>
        <div className={styles.logoWrapper}>
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logo}>
              <span className={styles.logoText}>A</span>
              <span className={styles.lineDecoration}></span>
            </div>
          </Link>
        </div>
        
        <button 
          className={styles.menuButton}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          <div className={styles.menuButtonInner}>
            <span className={styles.menuLine}></span>
            <span className={styles.menuLine}></span>
          </div>
        </button>
        
        <nav 
          ref={menuRef}
          className={`${styles.nav} ${isMobileMenuOpen ? styles.open : ''}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className={styles.navBackdrop}></div>
          <ul className={styles.navList}>
            {[
              { path: '/', label: 'Home' },
              { path: '/projects', label: 'Work' },
              { path: '/blog', label: 'Writing' },
              { path: '/resume', label: 'Journey' },
              { path: '/contact', label: 'Contact' }
            ].map((item) => (
              <li key={item.path} className={styles.navItem}>
                <Link 
                  href={item.path}
                  className={`${styles.navLink} ${isActive(item.path) ? styles.active : ''}`}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    document.body.style.overflow = '';
                  }}
                >
                  <span className={styles.navLinkText}>{item.label}</span>
                  {isActive(item.path) && <span className={styles.activeIndicator}></span>}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className={styles.navActions}>
            <ThemeSwitcher />
            <Link 
              href="/contact" 
              className={styles.ctaButton}
              onClick={() => {
                setIsMobileMenuOpen(false);
                document.body.style.overflow = '';
              }}
            >
              <span className={styles.ctaText}>Let&apos;s Create</span>
              <span className={styles.ctaIcon}>→</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;