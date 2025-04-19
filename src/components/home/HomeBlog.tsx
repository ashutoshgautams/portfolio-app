// components/home/HomeBlog.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '../../data/blog-posts';
import styles from './HomeBlog.module.css';

const HomeBlog = () => {
  // Use only the first two blog posts
  const posts = blogPosts.slice(0, 2);
  
  return (
    <section className={styles.blogSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          Latest <span className="gradient-text">Articles</span>
        </h2>
        <p className={styles.sectionSubtitle}>
          Insights and perspectives on web development and design
        </p>
      </div>
      
      <div className={styles.postsContainer}>
        {posts.map(post => (
          <article key={post.id} className={styles.postCard}>
            <Link href={`/blog/${post.slug}`} className={styles.postImageLink}>
              <div className={styles.postImageContainer}>
                <Image 
                  src={post.coverImage} 
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.postImage}
                />
                <div className={styles.postImageOverlay}></div>
              </div>
            </Link>
            
            <div className={styles.postContent}>
              <div className={styles.postMeta}>
                <span className={styles.postTag}>{post.tags[0]}</span>
                <span className={styles.postDate}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <h3 className={styles.postTitle}>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              
              <p className={styles.postExcerpt}>{post.excerpt}</p>
              
              <Link href={`/blog/${post.slug}`} className={styles.readMoreLink}>
                Continue Reading
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
      
      <div className={styles.viewAllContainer}>
        <Link href="/blog" className={styles.viewAllButton}>
          View All Articles
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default HomeBlog;