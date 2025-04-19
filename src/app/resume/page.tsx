// components/resume/InteractiveJourney.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

type JourneyItem = {
  id: string;
  type: 'education' | 'work' | 'project' | 'skill' | 'achievement' | 'future';
  title: string;
  subtitle: string;
  date: string;
  description: string;
  details?: string[];
  icon?: React.ReactNode;
  link?: {
    url: string;
    text: string;
  };
};

const InteractiveJourney: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Record<string, HTMLDivElement | null>>({});
  
  const journeyData: JourneyItem[] = [
    {
      id: 'education',
      type: 'education',
      title: 'Academic Excellence',
      subtitle: 'Bachelor of Technology (CS, Mathematics & AI)',
      date: '2020 - 2024',
      description: 'KALINGA INSTITUTE OF INDUSTRIAL TECHNOLOGY BBSR, IND',
      details: [
        'Cumulative CGPA: 9.55/10',
        'A foundation for innovation and technical excellence, blending theoretical knowledge with practical application.'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
        </svg>
      )
    },
    {
      id: 'work-rtcamp',
      type: 'work',
      title: 'Professional Growth',
      subtitle: 'Software Engineer (Full stack)',
      date: 'Jan 2024 - Present',
      description: 'RTCAMP - Remote, USA & IND',
      details: [
        'Spearheaded development of a comprehensive block library for a decoupled WordPress frontend (SnapWP)',
        'Designed and implemented an intuitive onboarding wizard using React',
        'Developed robust PHP form APIs to handle complex data submission'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      )
    },
    {
      id: 'work-gsoc',
      type: 'work',
      title: 'Open Source Contribution',
      subtitle: 'Software Developer (Maintenance Team)',
      date: 'May 2022 - Sep 2022',
      description: 'GOOGLE SUMMER OF CODE - Remote, USA',
      details: [
        'Resolved 12+ loading requirements, errors, and regressions in Musicblocks v3',
        'Achieved 167% improvement in core web vitals through rigorous testing',
        'Enhanced code characterization and documentation for increased maintainability'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      )
    },
    {
      id: 'project-chitchatly',
      type: 'project',
      title: 'Innovation & Impact',
      subtitle: 'CHITCHATLY.COM — Anonymous Chat Platform',
      date: 'Feb 2025',
      description: 'Real-time anonymous chat platform with no profiles or history',
      details: [
        'Implemented secure WebSocket-based chat with profanity filters',
        'Built and deployed MVP in under 3 weeks, grew to 100+ DAUs within first month',
        'Led UI/UX design, and early-stage growth strategy with user retention-focused features'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
      ),
      link: {
        url: 'https://chitchatly.com',
        text: 'Visit Project'
      }
    },
    {
      id: 'skills',
      type: 'skill',
      title: 'Technical Expertise',
      subtitle: 'Advanced & Proficient Skills',
      date: 'Current',
      description: 'My technical journey has equipped me with a versatile skill set',
      details: [
        'Advanced: TypeScript, JavaScript, Next.js, PHP, Node.js, HTML/CSS, MongoDB, SQL',
        'Proficient: QA, WebSockets, Figma, Git, GitHub, REST APIs, CI/CD',
        'Constantly exploring new technologies and best practices'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        </svg>
      )
    },
    {
      id: 'achievements',
      type: 'achievement',
      title: 'Recognition & Achievements',
      subtitle: 'Awards & Honors',
      date: 'Accolades',
      description: 'Outstanding achievements across competitions and research',
      details: [
        'Azure Developer League - Winner',
        'Google HashCode 2022 - AIR 72 & Global Rank 526',
        'WorldQuant Alpha Awards - "Good", "Excellent", & "Spectacular"',
        'Published Research - Comparative Study of Sorting Algorithms in IRJET Journal'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7"></circle>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
        </svg>
      )
    },
    {
      id: 'future',
      type: 'future',
      title: 'The Road Ahead',
      subtitle: 'Looking Forward',
      date: 'Future',
      description: 'Exploring new frontiers in full-stack development, system architecture, and user experience design',
      details: [
        'Creating solutions that deliver meaningful value to users and businesses',
        'Open to connecting with like-minded professionals',
        'Exploring new opportunities for collaboration and innovation'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
      link: {
        url: '/contact',
        text: 'Connect With Me'
      }
    }
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7, // When 70% of the item is visible
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-id');
          if (id) setActiveNode(id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Observe all nodes
    Object.values(nodesRef.current).forEach(node => {
      if (node) observer.observe(node);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Initialize with first item active
  useEffect(() => {
    if (journeyData.length > 0 && !activeNode) {
      setActiveNode(journeyData[0].id);
    }
  }, [activeNode, journeyData]);

  const scrollToNode = (id: string) => {
    const node = nodesRef.current[id];
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setActiveNode(id);
    }
  };

  return (
    <div className={styles.journeyContainer}>
      <div className={styles.journeyNavigation}>
        <div className={styles.timelineTrack}>
          {journeyData.map((item) => (
            <button
              key={item.id}
              className={`${styles.timelineNode} ${styles[item.type]} ${activeNode === item.id ? styles.active : ''}`}
              onClick={() => scrollToNode(item.id)}
              aria-label={`Navigate to ${item.title}`}
            >
              <span className={styles.nodeContent}>
                <span className={styles.nodeIcon}>{item.icon}</span>
                <span className={styles.nodeDate}>{item.date}</span>
              </span>
              <span className={styles.nodeLine}></span>
            </button>
          ))}
        </div>
      </div>
      
      <div className={styles.journeyContent} ref={timelineRef}>
        {journeyData.map((item) => (
          <div
            key={item.id}
            ref={el => nodesRef.current[item.id] = el}
            data-id={item.id}
            className={`${styles.journeyItem} ${styles[item.type]} ${activeNode === item.id ? styles.active : ''}`}
          >
            <div className={styles.journeyCard}>
              <div className={styles.cardHeader}>
                <span className={`${styles.cardBadge} ${styles[item.type]}`}>
                  <span className={styles.badgeIcon}>{item.icon}</span>
                  <span className={styles.badgeText}>{item.date}</span>
                </span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <h4 className={styles.cardSubtitle}>{item.subtitle}</h4>
                <p className={styles.cardDescription}>{item.description}</p>
              </div>
              
              <div className={styles.cardContent}>
                {item.details && (
                  <ul className={styles.detailsList}>
                    {item.details.map((detail, idx) => (
                      <li key={idx} className={styles.detailItem}>{detail}</li>
                    ))}
                  </ul>
                )}
                
                {item.link && (
                  item.link.url.startsWith('http') ? (
                    <a 
                      href={item.link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.cardLink}
                    >
                      {item.link.text}
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  ) : (
                    <Link href={item.link.url} className={styles.cardLink}>
                      {item.link.text}
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveJourney;