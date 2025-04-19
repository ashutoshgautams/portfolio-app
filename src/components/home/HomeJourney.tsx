// components/home/HomeJourney.tsx
import React from 'react';
import Link from 'next/link';
import styles from './HomeJourney.module.css';

const HomeJourney = () => {
  const journeyItems = [
    {
      year: "2020",
      title: "Bachelor of Technology",
      subtitle: "KIIT University",
      description: "Computer Science, Mathematics & AI with 9.55/10 CGPA"
    },
    {
      year: "2022",
      title: "Google Summer of Code",
      subtitle: "Open Source Contribution",
      description: "Resolved issues and improved Musicblocks v3 for Sugar Lab"
    },
    {
      year: "2023",
      title: "Project: CHITCHATLY.COM",
      subtitle: "Real-time Chat Platform",
      description: "Built anonymous chat with WebSockets & Next.js"
    },
    {
      year: "2024",
      title: "Software Engineer",
      subtitle: "RTCamp",
      description: "Full-stack development with WordPress, Next.js and more"
    }
  ];

  return (
    <section className={styles.journeySection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          My <span className="gradient-text">Journey</span>
        </h2>
        <p className={styles.sectionSubtitle}>
          Key milestones in my professional path
        </p>
      </div>
      
      <div className={styles.timelineContainer}>
        <div className={styles.timelineTrack}>
          {journeyItems.map((item, index) => (
            <div
              key={index}
              className={styles.timelineNode}
            >
              <span className={styles.nodeYear}>{item.year}</span>
            </div>
          ))}
          <div className={styles.progressLine}></div>
        </div>
        
        <div className={styles.journeyCards}>
          {journeyItems.map((item, index) => (
            <div
              key={index}
              className={styles.journeyCard}
            >
              <div className={styles.cardYear}>{item.year}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <div className={styles.cardSubtitle}>{item.subtitle}</div>
              <p className={styles.cardDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.viewMore}>
        <Link href="/resume" className={styles.viewMoreButton}>
          <span>View Full Journey</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default HomeJourney;