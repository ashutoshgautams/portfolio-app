// app/layout.tsx
"use client";

import { useEffect } from 'react';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CustomCursor from '../components/utils/CustomCursor';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  // Set up theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Ashutosh Gautam | Full-Stack Developer & UI Designer</title>
        <meta name="description" content="Portfolio of Ashutosh Gautam, a seasoned Full-Stack Developer with expertise in TypeScript, Next.js, React and Node.js. Explore my projects, blog, and professional journey." />
        <meta name="keywords" content="Ashutosh Gautam, full stack developer, web developer, UI designer, React, Next.js, TypeScript, portfolio, software engineer" />
        <meta name="author" content="Ashutosh Gautam" />
        
        {/* Open Graph meta tags for social sharing */}
        <meta property="og:title" content="Ashutosh Gautam | Full-Stack Developer & UI Designer" />
        <meta property="og:description" content="Crafting responsive websites and web applications that provide intuitive, pixel-perfect user experiences." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ashutoshgautam.com" />
        <meta property="og:image" content="https://ashutoshgautam.com/og-image.jpg" />
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@ashutoshgautam" />
        <meta name="twitter:title" content="Ashutosh Gautam | Full-Stack Developer & UI Designer" />
        <meta name="twitter:description" content="Crafting responsive websites and web applications that provide intuitive, pixel-perfect user experiences." />
        <meta name="twitter:image" content="https://ashutoshgautam.com/twitter-image.jpg" />
        
        {/* Favicon and other icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://ashutoshgautam.com${pathname}`} />
        
        {/* Allow search engines to index the site */}
        <meta name="robots" content="index, follow" />
        
        {/* Responsive design meta tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <CustomCursor />
        <div className={`container ${isHomePage ? 'homePage' : ''}`}>
          <Header />
          <main className="main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}