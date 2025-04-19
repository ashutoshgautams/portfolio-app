// app/blog/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '../../data/blog-posts';
import styles from './page.module.css';

export default function BlogPage() {
  // Get featured post (first post)
  const featuredPost = blogPosts[0];
  // Get remaining post
  const secondPost = blogPosts[1];

  return (
    <div className={styles.blogPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          My <span className="gradient-text">Blog</span>
        </h1>
        <p className={styles.subtitle}>
          Insights and perspectives on web development, design, and modern technologies
        </p>
      </div>

      {/* Featured Post */}
      <div className={styles.featuredPost}>
        <Link href={`/blog/${featuredPost.slug}`} className={styles.featuredPostLink}>
          <div className={styles.featuredPostImage}>
            <Image 
              src={featuredPost.coverImage} 
              alt={featuredPost.title}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
              className={styles.coverImage}
            />
          </div>
          <div className={styles.featuredPostOverlay}></div>
          <div className={styles.featuredPostContent}>
            <div className={styles.featuredPostMeta}>
              <span className={styles.featuredPostTag}>{featuredPost.tags[0]}</span>
              <span className={styles.featuredPostDate}>
                {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className={styles.featuredPostReadTime}>{featuredPost.readTime}</span>
            </div>
            <h2 className={styles.featuredPostTitle}>{featuredPost.title}</h2>
            <p className={styles.featuredPostExcerpt}>{featuredPost.excerpt}</p>
            <span className={styles.readMoreLink}>
              Read Article
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.arrowIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </div>
        </Link>
      </div>

      {/* Second Post - Larger Card */}
      <div className={styles.secondPostSection}>
        <h2 className={styles.sectionTitle}>Latest Article</h2>
        
        <article className={styles.secondPostCard}>
          <div className={styles.secondPostImageContainer}>
            <Link href={`/blog/${secondPost.slug}`}>
              <div className={styles.secondPostImage}>
                <Image 
                  src={secondPost.coverImage} 
                  alt={secondPost.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className={styles.coverImage}
                />
              </div>
            </Link>
          </div>
          
          <div className={styles.secondPostContent}>
            <div className={styles.secondPostMeta}>
              <div className={styles.secondPostTags}>
                {secondPost.tags.map((tag, index) => (
                  <span key={index} className={styles.postTag}>{tag}</span>
                ))}
              </div>
              <div className={styles.postDateInfo}>
                <time dateTime={secondPost.publishedAt} className={styles.postDate}>
                  {new Date(secondPost.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <span className={styles.postReadTime}>{secondPost.readTime}</span>
              </div>
            </div>
            
            <h2 className={styles.secondPostTitle}>
              <Link href={`/blog/${secondPost.slug}`}>{secondPost.title}</Link>
            </h2>
            
            <p className={styles.secondPostExcerpt}>{secondPost.excerpt}</p>
            
            <div className={styles.authorSection}>
              <div className={styles.authorAvatar}>
                <Image 
                  src={secondPost.author.avatar} 
                  alt={secondPost.author.name}
                  width={40}
                  height={40}
                  className={styles.avatarImage}
                />
              </div>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{secondPost.author.name}</span>
                <span className={styles.authorTitle}>{secondPost.author.title}</span>
              </div>
            </div>
            
            <Link href={`/blog/${secondPost.slug}`} className={styles.readMoreButton}>
              Read Full Article
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.arrowIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </article>
      </div>
      
      {/* Newsletter Signup */}
      <div className={styles.newsletterSection}>
        <div className={styles.newsletterContent}>
          <h2 className={styles.newsletterTitle}>Join My Newsletter</h2>
          <p className={styles.newsletterDescription}>
            Get notified when I publish new articles and tutorials. I won&apos;t spam your inbox!
          </p>
          
          <form className={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className={styles.newsletterInput} 
              required
            />
            <button type="submit" className={styles.newsletterButton}>
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}