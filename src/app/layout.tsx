// app/layout.tsx (updated)
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
        <title>Ashutosh Gautam | Developer & Designer</title>
        <meta name="description" content="Personal portfolio showcasing projects and insights in web development and design" />
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