import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import ScrollProgressBar from '@/components/ScrollProgressBar';

export default function Home() {
  return (
    <main className="min-h-screen bg-black w-full relative">
      {/* Fixed scroll progress bar — orange to yellow */}
      <ScrollProgressBar />

      <Navbar />

      {/* Hero is dark scrollytelling — completely untouched */}
      <Hero />

      {/* Everything below switches to the bright editorial theme */}
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}

