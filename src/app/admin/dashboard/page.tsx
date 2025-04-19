// app/admin/dashboard/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import styles from './dashboard.module.css';

interface DashboardStats {
  totalPosts: number;
  totalProjects: number;
  totalMedia: number;
  totalViews: number;
}

interface RecentPost {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    totalProjects: 0,
    totalMedia: 0,
    totalViews: 0,
  });
  
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // In a real application, fetch from API
        // For now, use mock data
        
        // Mock stats
        setStats({
          totalPosts: 12,
          totalProjects: 8,
          totalMedia: 45,
          totalViews: 3250,
        });
        
        // Mock recent posts
        setRecentPosts([
          {
            _id: '1',
            title: 'Getting Started with Next.js',
            slug: 'getting-started-with-nextjs',
            publishedAt: '2023-09-15T10:30:00.000Z',
          },
          {
            _id: '2',
            title: 'CSS Modules vs Styled Components',
            slug: 'css-modules-vs-styled-components',
            publishedAt: '2023-09-10T14:45:00.000Z',
          },
          {
            _id: '3',
            title: 'Building a Portfolio with React',
            slug: 'building-portfolio-with-react',
            publishedAt: '2023-09-05T09:20:00.000Z',
          },
        ]);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statTitle}>Total Posts</h3>
            <p className={styles.statValue}>{stats.totalPosts}</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statTitle}>Total Projects</h3>
            <p className={styles.statValue}>{stats.totalProjects}</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statTitle}>Media Files</h3>
            <p className={styles.statValue}>{stats.totalMedia}</p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statTitle}>Total Views</h3>
            <p className={styles.statValue}>{stats.totalViews}</p>
          </div>
        </div>
      </div>
      
      <div className={styles.dashboardRow}>
        <div className={styles.recentPosts}>
          <h2 className={styles.sectionTitle}>Recent Posts</h2>
          {loading ? (
            <p className={styles.loadingText}>Loading...</p>
          ) : (
            <div className={styles.postsList}>
              {recentPosts.map((post) => (
                <div key={post._id} className={styles.postItem}>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <div className={styles.postMeta}>
                    <span className={styles.postDate}>
                      {formatDate(post.publishedAt)}
                    </span>
                    <a href={`/admin/blog/edit/${post._id}`} className={styles.editLink}>
                      Edit
                    </a>
                    <a href={`/blog/${post.slug}`} target="_blank" className={styles.viewLink}>
                      View
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
          <a href="/admin/blog/posts" className={styles.viewAllLink}>
            View All Posts
          </a>
        </div>
        
        <div className={styles.quickActions}>
          <h2 className={styles.sectionTitle}>Quick Actions</h2>
          <div className={styles.actionsList}>
            <a href="/admin/blog/new" className={styles.actionButton}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              New Blog Post
            </a>
            <a href="/admin/media/upload" className={styles.actionButton}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              Upload Media
            </a>
            <a href="/admin/projects/new" className={styles.actionButton}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
              New Project
            </a>
            <a href="/admin/settings" className={styles.actionButton}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              Settings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
