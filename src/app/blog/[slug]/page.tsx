// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '../../../data/blog-posts';
import styles from './page.module.css';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.slug === params.slug);
  
  if (!post) {
    notFound();
  }

  // Format the date
  const date = new Date(post.publishedAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Convert markdown content to HTML (basic conversion)
  const contentHtml = post.content
    .replace(/# (.*$)/gm, '<h1>$1</h1>')
    .replace(/## (.*$)/gm, '<h2>$1</h2>')
    .replace(/### (.*$)/gm, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/```(.+?)\n([\s\S]*?)```/gm, (_, language, code) => 
      `<pre><code class="language-${language}">${code}</code></pre>`)
    .replace(/`([^`]+)`/g, '<code>$1</code>');

  return (
    <div className={styles.blogPostPage}>
      <article className={styles.article}>
        <div className={styles.header}>
          <Link href="/blog" className={styles.backLink}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.backIcon}>
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Blog
          </Link>
          
          <div className={styles.postMeta}>
            <div className={styles.tags}>
              {post.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className={styles.dateInfo}>
              <time dateTime={post.publishedAt} className={styles.date}>
                {formattedDate}
              </time>
              <span className={styles.readTime}>{post.readTime}</span>
            </div>
          </div>
          
          <h1 className={styles.title}>{post.title}</h1>
          
          <div className={styles.authorInfo}>
            <div className={styles.authorAvatar}>
              <Image 
                src={post.author.avatar} 
                alt={post.author.name}
                width={50}
                height={50}
                className={styles.avatar}
              />
            </div>
            <div className={styles.authorDetails}>
              <span className={styles.authorName}>{post.author.name}</span>
              <span className={styles.authorTitle}>{post.author.title}</span>
            </div>
          </div>
        </div>

        <div className={styles.coverImage}>
          <Image 
            src={post.coverImage} 
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            priority
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: `<p>${contentHtml}</p>` }} />
        </div>
        
        <div className={styles.shareSection}>
          <h3 className={styles.shareTitle}>Share this article</h3>
          <div className={styles.shareButtons}>
            <button className={styles.shareButton}>
              Twitter
            </button>
            <button className={styles.shareButton}>
              LinkedIn
            </button>
            <button className={styles.shareButton}>
              Facebook
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}