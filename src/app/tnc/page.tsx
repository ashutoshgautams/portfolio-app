// app/tnc/page.tsx
"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import FluidInteraction from '../../components/utils/FluidInteraction';
import styles from './page.module.css';

const TermsAndConditionsPage = () => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  
  useEffect(() => {
    const handleScroll = () => {
      sectionRefs.current.forEach((section) => {
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        
        if (isVisible) {
          section.classList.add(styles.visible);
        }
      });
    };
    
    // Initial check
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.tncPage}>
      <FluidInteraction intensity={0.3}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Terms and <span className="gradient-text">Conditions</span>
          </h1>
          <p className={styles.subtitle}>
            Please read these terms and conditions carefully before using this website.
          </p>
        </div>
        
        <div className={styles.contentContainer}>
          <div className={styles.sidebar}>
            <div className={styles.tocContainer}>
              <h2 className={styles.tocTitle}>Table of Contents</h2>
              <ul className={styles.tocList}>
                <li><a href="#introduction" className={styles.tocLink}>Introduction</a></li>
                <li><a href="#intellectual-property" className={styles.tocLink}>Intellectual Property</a></li>
                <li><a href="#user-license" className={styles.tocLink}>User License</a></li>
                <li><a href="#disclaimer" className={styles.tocLink}>Disclaimer</a></li>
                <li><a href="#limitations" className={styles.tocLink}>Limitations</a></li>
                <li><a href="#privacy" className={styles.tocLink}>Privacy</a></li>
                <li><a href="#revisions" className={styles.tocLink}>Revisions and Errata</a></li>
                <li><a href="#modifications" className={styles.tocLink}>Modifications</a></li>
                <li><a href="#contact" className={styles.tocLink}>Contact Information</a></li>
              </ul>
            </div>
          </div>
          
          <div className={styles.mainContent}>
            <section 
              id="introduction" 
              className={styles.section}
              ref={el => { sectionRefs.current[0] = el; }}
            >
              <h2 className={styles.sectionTitle}>1. Introduction</h2>
              <div className={styles.sectionContent}>
                <p>
                  These terms and conditions govern your use of this website; by using this website, you accept these terms and conditions in full. If you disagree with these terms and conditions or any part of these terms and conditions, you must not use this website.
                </p>
                <p>
                  This website uses cookies. By using this website and agreeing to these terms and conditions, you consent to our use of cookies in accordance with the terms of our privacy policy.
                </p>
              </div>
            </section>
            
            <section 
              id="intellectual-property" 
              className={styles.section}
              ref={el => { sectionRefs.current[1] = el; }}
            >
              <h2 className={styles.sectionTitle}>2. Intellectual Property</h2>
              <div className={styles.sectionContent}>
                <p>
                  Unless otherwise stated, I (Ashutosh Gautam) own the intellectual property rights for all material on this website. All intellectual property rights are reserved.
                </p>
                <p>
                  You may view, download, and print pages from the website for your own personal use, subject to the restrictions set out below and elsewhere in these terms and conditions.
                </p>
                <p>You must not:</p>
                <ul className={styles.contentList}>
                  <li>Republish material from this website (including republication on another website)</li>
                  <li>Sell, rent, or sub-license material from the website</li>
                  <li>Reproduce, duplicate, copy, or otherwise exploit material on this website for a commercial purpose</li>
                  <li>Redistribute content from this website, except for content specifically made available for redistribution</li>
                </ul>
              </div>
            </section>
            
            <section 
              id="user-license" 
              className={styles.section}
              ref={el => { sectionRefs.current[2] = el; }}
            >
              <h2 className={styles.sectionTitle}>3. User License</h2>
              <div className={styles.sectionContent}>
                <p>
                  You may use the website for lawful purposes only. You must not use this website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.
                </p>
                <p>
                  You must not use this website to copy, store, host, transmit, send, use, publish, or distribute any material which consists of (or is linked to) any spyware, computer virus, Trojan horse, worm, keystroke logger, rootkit, or other malicious computer software.
                </p>
                <p>
                  You must not conduct any systematic or automated data collection activities (including without limitation scraping, data mining, data extraction, and data harvesting) on or in relation to this website without my express written consent.
                </p>
              </div>
            </section>
            
            <section 
              id="disclaimer" 
              className={styles.section}
              ref={el => { sectionRefs.current[3] = el; }}
            >
              <h2 className={styles.sectionTitle}>4. Disclaimer</h2>
              <div className={styles.sectionContent}>
                <p>
                  To the maximum extent permitted by applicable law, I exclude all representations, warranties, and conditions relating to this website and the use of this website (including, without limitation, any warranties implied by law regarding satisfactory quality, fitness for purpose, and/or the use of reasonable care and skill).
                </p>
                <p>
                  The information on this website is provided free of charge, and you acknowledge that it would be unreasonable to hold me liable for any inaccuracy or incompleteness in the information provided.
                </p>
              </div>
            </section>
            
            <section 
              id="limitations" 
              className={styles.section}
              ref={el => { sectionRefs.current[4] = el; }}
            >
              <h2 className={styles.sectionTitle}>5. Limitations</h2>
              <div className={styles.sectionContent}>
                <p>
                  Nothing in these terms and conditions will: (a) limit or exclude any liability for death or personal injury resulting from negligence; (b) limit or exclude any liability for fraud or fraudulent misrepresentation; (c) limit any liabilities in any way that is not permitted under applicable law; or (d) exclude any liabilities that may not be excluded under applicable law.
                </p>
                <p>
                  The limitations and exclusions of liability set out in this section and elsewhere in these terms and conditions: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the terms and conditions or in relation to the subject matter of the terms and conditions, including liabilities arising in contract, in tort (including negligence), and for breach of statutory duty.
                </p>
              </div>
            </section>
            
            <section 
              id="privacy" 
              className={styles.section}
              ref={el => { sectionRefs.current[5] = el; }}
            >
              <h2 className={styles.sectionTitle}>6. Privacy</h2>
              <div className={styles.sectionContent}>
                <p>
                  For details about how I collect and use your personal information, please see my <Link href="/privacy-policy" className={styles.contentLink}>Privacy Policy</Link>.
                </p>
              </div>
            </section>
            
            <section 
              id="revisions" 
              className={styles.section}
              ref={el => { sectionRefs.current[6] = el; }}
            >
              <h2 className={styles.sectionTitle}>7. Revisions and Errata</h2>
              <div className={styles.sectionContent}>
                <p>
                  The materials appearing on this website could include technical, typographical, or photographic errors. I do not warrant that any of the materials on this website are accurate, complete, or current. I may make changes to the materials contained on the website at any time without notice. I do not, however, make any commitment to update the materials.
                </p>
              </div>
            </section>
            
            <section 
              id="modifications" 
              className={styles.section}
              ref={el => { sectionRefs.current[7] = el; }}
            >
              <h2 className={styles.sectionTitle}>8. Modifications</h2>
              <div className={styles.sectionContent}>
                <p>
                  I may revise these terms and conditions at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these terms and conditions.
                </p>
              </div>
            </section>
            
            <section 
              id="contact" 
              className={styles.section}
              ref={el => { sectionRefs.current[8] = el; }}
            >
              <h2 className={styles.sectionTitle}>9. Contact Information</h2>
              <div className={styles.sectionContent}>
                <p>
                  If you have any questions about these Terms and Conditions, please contact me at:
                </p>
                <div className={styles.contactInfo}>
                  <p>Ashutosh Gautam</p>
                  <p>Email: <a href="mailto:ashutoshgautam10b11@gmail.com" className={styles.contentLink}>ashutoshgautam10b11@gmail.com</a></p>
                </div>
              </div>
            </section>
            
            <div className={styles.lastUpdated}>
              <p>Last updated: April 22, 2025</p>
            </div>
            
            <div className={styles.actionButtons}>
              <Link href="/" className={styles.backButton}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.buttonIcon}>
                  <path d="M19 12H5"></path>
                  <path d="M12 19l-7-7 7-7"></path>
                </svg>
                Back to Home
              </Link>
              <Link href="/contact" className={styles.contactButton}>
                Contact Me
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.buttonIcon}>
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </FluidInteraction>
    </div>
  );
};

export default TermsAndConditionsPage;