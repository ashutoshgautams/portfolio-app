// app/page.tsx
import Hero from '../components/home/Hero';
import Skills from '../components/home/Skills';
import FeaturedProjects from '../components/home/FeaturedProjects';
import HomeJourney from '@/components/home/HomeJourney';
import HomeBlog from '@/components/home/HomeBlog';

export default function Home() {
  return (
    <>
      <Hero />
      
      <FeaturedProjects />
      <HomeJourney />
      <Skills />
      <HomeBlog />
      
    </>
  );
}