// src/components/home/Skills.tsx
import React from 'react';
import styles from './Skills.module.css';

const Skills: React.FC = () => {
  const skillGroups = [
    {
      title: 'Frontend',
      skills: ['React', 'TypeScript', 'Next.js', 'CSS Modules', 'HTML5', 'JavaScript']
    },
    {
      title: 'Backend',
      skills: ['Node.js', 'Express', 'MongoDB', 'REST API', 'GraphQL']
    },
    {
      title: 'Tools & Others',
      skills: ['Git', 'GitHub', 'VS Code', 'Figma', 'AWS', 'Docker']
    }
  ];

  return (
    <section className={styles.skills}>
      <h2 className={styles.sectionTitle}>My Skills</h2>
      <div className={styles.skillGroups}>
        {skillGroups.map((group, index) => (
          <div key={index} className={styles.skillGroup}>
            <h3 className={styles.groupTitle}>{group.title}</h3>
            <div className={styles.skillList}>
              {group.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className={styles.skill}>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
