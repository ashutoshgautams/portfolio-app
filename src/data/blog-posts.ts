// data/blog-posts.ts
export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string;
    tags: string[];
    publishedAt: string;
    readTime: string;
    content: string;
    author: {
      name: string;
      avatar: string;
      title: string;
    };
  }
  
  export const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Building Performant Web Applications with Next.js and TypeScript',
      slug: 'building-performant-web-applications-nextjs-typescript',
      excerpt: 'Learn how to leverage Next.js and TypeScript to create blazing-fast web applications with improved developer experience and type safety.',
      coverImage: '/blog/next1.webp',
      tags: ['Next.js', 'TypeScript', 'Performance'],
      publishedAt: '2023-11-15T10:00:00Z',
      readTime: '8 min read',
      content: `
  # Building Performant Web Applications with Next.js and TypeScript
  
  In the modern web development landscape, creating applications that combine excellent user experience with developer-friendly workflows is crucial. Next.js and TypeScript form a powerful combination that enables developers to build high-performance web applications while maintaining code quality and scalability.
  
  ## Why Next.js?
  
  Next.js has emerged as one of the most popular React frameworks, and for good reason. It offers a suite of features that address many common challenges in web development:
  
  ### Server-Side Rendering (SSR)
  
  One of Next.js's standout features is its built-in support for server-side rendering. Unlike traditional single-page applications that render entirely on the client side, SSR generates the HTML on the server and sends a fully rendered page to the client. This approach offers several advantages:
  
  - **Improved Performance**: Users see content more quickly, as the initial HTML is already rendered when it reaches the browser.
  - **Better SEO**: Search engines can more easily crawl and index your content.
  - **Enhanced User Experience**: Visitors don't need to wait for JavaScript to load before seeing content.
  
  ### Static Site Generation (SSG)
  
  Next.js also excels at static site generation, which pre-renders pages at build time:
  
  \`\`\`typescript
  // pages/blog/[slug].tsx
  export async function getStaticProps({ params }) {
    const post = await fetchBlogPost(params.slug);
    return {
      props: {
        post,
      },
      revalidate: 60, // Optional: Regenerate page after 60 seconds
    };
  }
  
  export async function getStaticPaths() {
    const posts = await fetchAllBlogPosts();
    const paths = posts.map((post) => ({
      params: { slug: post.slug },
    }));
    
    return {
      paths,
      fallback: 'blocking', // Show a fallback while generating new pages
    };
  }
  \`\`\`
  
  This approach provides the best of both worlds: the performance benefits of static sites with the ability to update content without rebuilding the entire application.
  
  ### Incremental Static Regeneration (ISR)
  
  For dynamic content that still requires optimal performance, Next.js offers ISR, allowing you to update static pages after they've been built:
  
  \`\`\`typescript
  export async function getStaticProps() {
    const products = await fetchProducts();
    
    return {
      props: {
        products,
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 10 seconds
      revalidate: 10,
    };
  }
  \`\`\`
  
  ## Adding TypeScript to the Mix
  
  While Next.js provides the performance infrastructure, TypeScript brings type safety and improved developer experience to your codebase.
  
  ### Type Safety Benefits
  
  TypeScript's static type system helps catch errors during development rather than at runtime:
  
  \`\`\`typescript
  // Without TypeScript
  function calculateTotal(items) {
    return items.reduce((total, item) => total + item.price, 0);
  }
  
  // With TypeScript
  interface Product {
    id: string;
    name: string;
    price: number;
  }
  
  function calculateTotal(items: Product[]): number {
    return items.reduce((total, item) => total + item.price, 0);
  }
  \`\`\`
  
  In the TypeScript version, you'll get immediate feedback if you try to call \`calculateTotal\` with incorrect parameters or if an item doesn't have a \`price\` property.
  
  ### Enhanced Developer Experience
  
  TypeScript also provides excellent tooling support:
  
  - **Intelligent Code Completion**: Your IDE can provide accurate suggestions based on type information.
  - **Refactoring Support**: Renaming variables or restructuring code becomes much safer with TypeScript.
  - **Self-Documenting Code**: Types serve as documentation, making it easier for new developers to understand your codebase.
  
  ## Performance Optimization Techniques
  
  Beyond the built-in advantages of Next.js and TypeScript, there are several techniques you can apply to further enhance performance:
  
  ### 1. Code Splitting
  
  Next.js automatically splits your code into smaller chunks, loading only what's needed for each page:
  
  \`\`\`typescript
  // This component will be dynamically loaded
  import dynamic from 'next/dynamic';
  
  const DynamicComponent = dynamic(() => import('../components/HeavyComponent'), {
    loading: () => <p>Loading...</p>,
    ssr: false, // Don't render on the server
  });
  
  function MyPage() {
    return (
      <div>
        <h1>My Page</h1>
        <DynamicComponent />
      </div>
    );
  }
  \`\`\`
  
  ### 2. Image Optimization
  
  The Next.js Image component automatically optimizes images for performance:
  
  \`\`\`typescript
  import Image from 'next/image';
  
  function ProductCard({ product }) {
    return (
      <div>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={500}
          height={350}
          placeholder="blur"
          blurDataURL={product.thumbnailUrl}
          priority={product.featured}
        />
        <h2>{product.name}</h2>
      </div>
    );
  }
  \`\`\`
  
  This component automatically:
  - Serves images in modern formats like WebP when supported
  - Resizes images to the optimal size for each device
  - Lazy loads images that are outside the viewport
  - Prevents layout shift through proper sizing
  
  ### 3. Font Optimization
  
  Next.js 13 introduced automatic font optimization:
  
  \`\`\`typescript
  // In your _app.tsx or layout.tsx
  import { Inter } from 'next/font/google';
  
  const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
  });
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en" className={inter.className}>
        <body>{children}</body>
      </html>
    );
  }
  \`\`\`
  
  This approach eliminates layout shift by preloading font files and applying the correct CSS.
  
  ## Real-World Implementation Tips
  
  When building production applications with Next.js and TypeScript, consider these best practices:
  
  ### 1. Establish a Strong TypeScript Foundation
  
  Create a robust set of type definitions for your domain models:
  
  \`\`\`typescript
  // types/index.ts
  export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'editor' | 'viewer';
    createdAt: string;
  }
  
  export interface Post {
    id: string;
    title: string;
    content: string;
    authorId: string;
    publishedAt: string | null;
    status: 'draft' | 'published' | 'archived';
  }
  \`\`\`
  
  ### 2. Optimize Data Fetching
  
  Use SWR or React Query for client-side data fetching with smart caching:
  
  \`\`\`typescript
  import useSWR from 'swr';
  
  function Dashboard() {
    const { data, error, isLoading } = useSWR<User[]>(
      '/api/users',
      async (url) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      },
      {
        revalidateOnFocus: false,
        dedupingInterval: 60000,
      }
    );
  
    if (isLoading) return <p>Loading users...</p>;
    if (error) return <p>Error loading users</p>;
    
    return (
      <ul>
        {data.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    );
  }
  \`\`\`
  
  ### 3. Implement Proper Error Boundaries
  
  TypeScript and React error boundaries can work together to provide graceful failure handling:
  
  \`\`\`typescript
  import { Component, ErrorInfo, ReactNode } from 'react';
  
  interface ErrorBoundaryProps {
    fallback: ReactNode;
    children: ReactNode;
  }
  
  interface ErrorBoundaryState {
    hasError: boolean;
  }
  
  class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
      return { hasError: true };
    }
  
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      console.error("Uncaught error:", error, errorInfo);
      // You could also log to an error reporting service here
    }
  
    render() {
      if (this.state.hasError) {
        return this.props.fallback;
      }
  
      return this.props.children;
    }
  }
  \`\`\`
  
  ## Conclusion
  
  The combination of Next.js and TypeScript provides a powerful foundation for building performant, maintainable web applications. By leveraging server-side rendering, static site generation, and incremental static regeneration alongside TypeScript's type safety, you can create experiences that are fast for users and enjoyable for developers to work on.
  
  As web development continues to evolve, this stack remains at the forefront of balancing performance with developer experience, making it an excellent choice for modern web applications of all sizes.
  `,
      author: {
        name: 'Ashutosh Gautam',
        avatar: '/profile.jpg',
        title: 'Full-Stack Developer'
      }
    },
    {
      id: '2',
      title: 'Modern CSS Techniques That Will Transform Your Web Design',
      slug: 'modern-css-techniques-transform-web-design',
      excerpt: 'Discover cutting-edge CSS features and techniques that will elevate your web design skills and help you create more dynamic, responsive user interfaces.',
      coverImage: '/blog/css.webp',
      tags: ['CSS', 'Web Design', 'Frontend'],
      publishedAt: '2023-12-20T08:30:00Z',
      readTime: '10 min read',
      content: `
  # Modern CSS Techniques That Will Transform Your Web Design
  
  CSS has evolved dramatically in recent years, with new features and capabilities that empower developers to create sophisticated layouts and interactions that previously required JavaScript. In this article, we'll explore some of the most powerful modern CSS techniques that can transform your approach to web design.
  
  ## CSS Grid: Beyond the Basics
  
  While many developers are familiar with the basics of CSS Grid, leveraging its more advanced features can unlock new possibilities for complex layouts.
  
  ### Subgrid
  
  One of the most exciting recent additions to CSS Grid is the subgrid feature, which allows nested grids to inherit the track sizing of their parent grid:
  
  \`\`\`css
  .parent-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 20px;
  }
  
  .child-element {
    grid-column: 2 / 12;
    
    display: grid;
    grid-template-columns: subgrid;
  }
  \`\`\`
  
  With subgrid, you can ensure that nested elements align perfectly with the parent grid structure, creating cohesive designs across complex components.
  
  ### Grid Template Areas
  
  For more readable and maintainable layouts, grid template areas provide a visual way to define grid structures:
  
  \`\`\`css
  .dashboard {
    display: grid;
    grid-template-columns: 250px 1fr 300px;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      "sidebar header header"
      "sidebar content widgets"
      "sidebar footer footer";
    height: 100vh;
  }
  
  .header { grid-area: header; }
  .sidebar { grid-area: sidebar; }
  .content { grid-area: content; }
  .widgets { grid-area: widgets; }
  .footer { grid-area: footer; }
  \`\`\`
  
  This approach makes layout structure immediately clear and simplifies media queries for responsive designs:
  
  \`\`\`css
  @media (max-width: 768px) {
    .dashboard {
      grid-template-columns: 1fr;
      grid-template-areas:
        "header"
        "content"
        "widgets"
        "footer";
    }
    
    .sidebar {
      display: none;
    }
  }
  \`\`\`
  
  ## Fluid Typography and Spacing
  
  Creating truly responsive designs means moving beyond fixed breakpoints. Fluid typography and spacing techniques allow your design to scale smoothly across all viewport sizes.
  
  ### Modern Fluid Typography with clamp()
  
  The \`clamp()\` function provides a powerful way to implement fluid typography:
  
  \`\`\`css
  :root {
    --fluid-type-min: 1rem;    /* 16px */
    --fluid-type-max: 1.5rem;  /* 24px */
    --fluid-screen-min: 20rem; /* 320px */
    --fluid-screen-max: 80rem; /* 1280px */
  }
  
  body {
    font-size: clamp(
      var(--fluid-type-min),
      var(--fluid-type-min) + (var(--fluid-type-max) - var(--fluid-type-min)) * ((100vw - var(--fluid-screen-min)) / (var(--fluid-screen-max) - var(--fluid-screen-min))),
      var(--fluid-type-max)
    );
  }
  \`\`\`
  
  This approach ensures text scales smoothly between minimum and maximum sizes based on the viewport width, eliminating the need for multiple font-size declarations across breakpoints.
  
  ### Fluid Space with Custom Properties
  
  The same concept works brilliantly for spacing:
  
  \`\`\`css
  :root {
    --space-xs: clamp(0.5rem, 0.5rem + 0.25vw, 0.75rem);
    --space-sm: clamp(0.75rem, 0.75rem + 0.5vw, 1.25rem);
    --space-md: clamp(1.25rem, 1.25rem + 1vw, 2.25rem);
    --space-lg: clamp(2rem, 2rem + 1.5vw, 3.5rem);
    --space-xl: clamp(3rem, 3rem + 2.5vw, 5.5rem);
  }
  
  .card {
    padding: var(--space-md);
    margin-bottom: var(--space-lg);
  }
  
  .card-title {
    margin-bottom: var(--space-sm);
  }
  \`\`\`
  
  This creates a cohesive spacing system that scales fluidly across viewport sizes.
  
  ## CSS Custom Properties for Dynamic Theming
  
  CSS custom properties (variables) have transformed how we handle theming and dynamic style changes.
  
  ### Theme Switching without JavaScript
  
  You can implement light and dark themes using custom properties and the \`prefers-color-scheme\` media query:
  
  \`\`\`css
  :root {
    --color-bg: #ffffff;
    --color-text: #121212;
    --color-primary: #3a86ff;
    --color-secondary: #ff006e;
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  @media (prefers-color-scheme: dark) {
    :root {
      --color-bg: #121212;
      --color-text: #f0f0f0;
      --color-primary: #7aa5ff;
      --color-secondary: #ff5c8f;
      --shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
    }
  }
  
  body {
    background-color: var(--color-bg);
    color: var(--color-text);
  }
  
  .button-primary {
    background-color: var(--color-primary);
  }
  
  .card {
    box-shadow: var(--shadow);
  }
  \`\`\`
  
  For user-controlled theme switching, you can combine this with a class on the \`html\` or \`body\` element:
  
  \`\`\`css
  [data-theme="dark"] {
    --color-bg: #121212;
    --color-text: #f0f0f0;
    /* Other dark theme variables */
  }
  \`\`\`
  
  ### Component-Specific Variables
  
  Custom properties are especially powerful when scoped to components:
  
  \`\`\`css
  .alert {
    --alert-bg: #f8d7da;
    --alert-color: #842029;
    --alert-border: #f5c2c7;
    
    background-color: var(--alert-bg);
    color: var(--alert-color);
    border: 1px solid var(--alert-border);
    padding: 1rem;
    border-radius: 4px;
  }
  
  .alert.alert-success {
    --alert-bg: #d1e7dd;
    --alert-color: #0f5132;
    --alert-border: #badbcc;
  }
  
  .alert.alert-warning {
    --alert-bg: #fff3cd;
    --alert-color: #664d03;
    --alert-border: #ffecb5;
  }
  \`\`\`
  
  This pattern makes components highly adaptable and maintainable.
  
  ## Scroll-Driven Animations
  
  Scroll-linked animations used to require JavaScript libraries, but now they can be accomplished with pure CSS.
  
  ### Scroll-Triggered Animations with Intersection Observer
  
  While not purely CSS, combining CSS animations with the Intersection Observer API provides a lightweight approach to scroll-triggered animations:
  
  \`\`\`css
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
  \`\`\`
  
  \`\`\`javascript
  // Add this JavaScript to implement the intersection observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
  });
  \`\`\`
  
  ### Native CSS Scroll-Driven Animations
  
  For browsers that support it, you can now use pure CSS for scroll-linked animations:
  
  \`\`\`css
  @keyframes reveal {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .scroll-reveal {
    view-timeline-name: --reveal;
    view-timeline-axis: block;
    animation: reveal linear both;
    animation-timeline: --reveal;
    animation-range: entry 10% cover 30%;
  }
  \`\`\`
  
  This cutting-edge feature creates smooth animations as elements enter the viewport without any JavaScript.
  
  ## Advanced Selectors and Combinators
  
  Modern CSS selectors enable targeting elements with incredible precision.
  
  ### :has() Relational Pseudo-Class
  
  The \`:has()\` selector allows you to style elements based on their children or siblings:
  
  \`\`\`css
  /* Style cards that contain images differently */
  .card:has(img) {
    padding-top: 0;
  }
  
  /* Style form fields that have required inputs */
  .form-group:has(input[required]) label::after {
    content: " *";
    color: red;
  }
  
  /* Target paragraphs that immediately follow headlines with a class */
  h2.important + p {
    font-weight: 500;
  }
  \`\`\`
  
  ### :is() and :where() for More Concise Selectors
  
  These pseudo-classes reduce repetition and improve readability:
  
  \`\`\`css
  /* Instead of this */
  header a:hover,
  nav a:hover,
  footer a:hover {
    text-decoration: underline;
  }
  
  /* You can write this */
  :is(header, nav, footer) a:hover {
    text-decoration: underline;
  }
  \`\`\`
  
  The main difference between \`:is()\` and \`:where()\` is specificity: \`:where()\` has zero specificity, making it ideal for creating default styles that can be easily overridden.
  
  ## Aspect Ratio Control
  
  Maintaining consistent aspect ratios has become much simpler with the \`aspect-ratio\` property:
  
  \`\`\`css
  .video-container {
    width: 100%;
    aspect-ratio: 16 / 9;
    background: #000;
  }
  
  .profile-image {
    width: 100%;
    max-width: 300px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 50%;
  }
  
  .card {
    aspect-ratio: 3 / 4;
  }
  \`\`\`
  
  This property eliminates the need for the old padding-top hack and ensures elements maintain proportions across screen sizes.
  
  ## Container Queries
  
  Perhaps the most revolutionary recent addition to CSS, container queries allow elements to adapt based on their parent container's size rather than the viewport:
  
  \`\`\`css
  .container {
    container-type: inline-size;
    container-name: card-container;
  }
  
  .card {
    display: grid;
    gap: 1rem;
  }
  
  @container card-container (min-width: 400px) {
    .card {
      grid-template-columns: 150px 1fr;
    }
  }
  
  @container card-container (max-width: 399px) {
    .card {
      grid-template-columns: 1fr;
    }
  }
  \`\`\`
  
  This enables truly modular, reusable components that adapt to their context rather than the viewport size.
  
  ## Conclusion
  
  Modern CSS has evolved into a powerful system capable of creating sophisticated, responsive, and dynamic user interfaces with less reliance on JavaScript. By embracing these techniques, you can streamline your development process, improve performance, and create more maintainable designs.
  
  The key to mastering modern CSS is experimentation—try incorporating these techniques into your workflow incrementally, and you'll quickly see how they can transform your approach to web design. As browser support continues to improve, we can expect even more exciting CSS features in the coming years, further empowering developers to create exceptional web experiences.
  `,
      author: {
        name: 'Ashutosh Gautam',
        avatar: '/profile.jpg',
        title: 'Full-Stack Developer'
      }
    }
  ];