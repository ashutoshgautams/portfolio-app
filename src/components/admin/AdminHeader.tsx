// components/admin/AdminHeader.tsx
'use client';

import React from 'react';
import styles from './AdminHeader.module.css';

const AdminHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.pageInfo}>
          <h1 className={styles.pageTitle}>Dashboard</h1>
        </div>
        
        <div className={styles.headerActions}>
          <div className={styles.searchContainer}>
            <input 
              type="text" 
              placeholder="Search..." 
              className={styles.searchInput} 
            />
            <button className={styles.searchButton}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
          
          <div className={styles.userProfile}>
            <div className={styles.profileImage}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className={styles.profileInfo}>
              <span className={styles.userName}>Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;