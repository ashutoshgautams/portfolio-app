// components/home/FeaturedProjects.tsx
'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './FeaturedProjects.module.css';

// Updated data with direct external links
const FEATURED_PROJECTS = [
  {
    id: '1',
    title: 'CHITCHATLY.COM',
    description: 'A real-time anonymous chat platform with no profiles or history. Implemented secure WebSocket-based chat with profanity filters and user retention-focused features.',
    image: '/projects/chitchatly.jpg',
    tags: ['WebSockets', 'Next.js', 'TypeScript'],
    url: 'https://chitchatly.com'
  },
  {
    id: '2',
    title: 'PATHYATRI.COM',
    description: 'Travel booking platform for Bihar enabling route discovery, ticketing, and real-time seat selection. Built with modern stack including admin and driver dashboards.',
    image: '/projects/pathyatri.jpg',
    tags: ['React', 'Node.js', 'MongoDB'],
    url: 'https://pathyatri.com'
  },
  {
    id: '3',
    title: 'SnapWP Block Library',
    description: 'Comprehensive block library for a decoupled WordPress frontend enhancing content creation experience and performance by 40% with TypeScript and Next.js.',
    image: '/projects/snapwp.jpg',
    tags: ['WordPress', 'Next.js', 'TypeScript'],
    url: 'https://snapwp.io'
  }
];

const FeaturedProjects: React.FC = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Parallax effect on cards
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      
      const { clientX, clientY } = e;
      
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        
        const distanceX = clientX - cardCenterX;
        const distanceY = clientY - cardCenterY;
        
        // Calculate distance from mouse to card center
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        const maxDistance = 400; // Maximum distance for effect
        
        if (distance < maxDistance) {
          // Calculate intensity based on distance (closer = stronger effect)
          const intensity = (1 - distance / maxDistance) * 12; // Max 12px movement
          
          // Calculate rotation and movement based on mouse position
          const rotateX = distanceY / 30 * -1;
          const rotateY = distanceX / 30;
          
          // Apply transform
          card.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale(${1 + intensity * 0.01})
          `;
          
          if (distance < 150) {
            setActiveCard(index);
          }
        } else {
          // Reset transform when mouse is far away
          card.style.transform = `
            perspective(1000px) 
            rotateX(0deg) 
            rotateY(0deg) 
            scale(1)
          `;
          
          if (activeCard === index) {
            setActiveCard(null);
          }
        }
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [activeCard]);
  
  return (
    <section ref={sectionRef} className={styles.featuredProjects}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className={styles.sectionSubtitle}>
          A selection of my recent work and personal projects
        </p>
      </div>

      <div className={styles.projectsGrid}>
        {FEATURED_PROJECTS.map((project, index) => (
          <div 
            key={project.id} 
            className={`${styles.projectCard} ${activeCard === index ? styles.active : ''}`}
            ref={el => cardsRef.current[index] = el}
          >
            <div className={styles.projectImage}>
              <Image 
                src={project.image} 
                alt={project.title}
                width={500}
                height={300}
                className={styles.image}
              />
              
              <div className={styles.shimmerOverlay}></div>
            </div>
            
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>{project.description}</p>
              <div className={styles.projectTags}>
                {project.tags.map((tag, idx) => (
                  <span key={idx} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <a href={project.url} target="_blank" rel="noopener noreferrer" className={styles.viewProjectButton}>
                <span>Visit Project</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.buttonIcon}>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.allProjectsLink}>
        <a href="/projects" className={styles.viewAllButton}>
          View All Projects
          <svg xmlns="http://www.w3.org/2000/svg" className={styles.arrowIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default FeaturedProjects;