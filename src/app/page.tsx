import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollFX from '@/components/ScrollFX';

export default function Page() {
  return (
    <>
      <Nav />
      <main id="content">
        <Hero />
        <hr className="section-divider" />
        <About />
        <hr className="section-divider" />
        <Projects />
        <hr className="section-divider" />
        <Skills />
        <hr className="section-divider" />
        <Contact />
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
