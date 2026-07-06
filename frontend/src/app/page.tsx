import { BackgroundBeams } from '@/components/ui/background-beams';
import Header from '@/components/Header';
import Hero from '@/components/hero';
import About from '@/components/about';
import Skills from '@/components/skills';
import Projects from '@/components/projects';
import Contact from '@/components/contact';
import Footer from '@/components/Footer';
import GlobalScripts from '@/components/GlobalScripts';

export default function Home() {
  return (
    <>
      <BackgroundBeams />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <GlobalScripts />
    </>
  );
}
