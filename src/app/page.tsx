import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <hr className="section-divider" />
        <Projects />
        <hr className="section-divider" />
        <Skills />
        <hr className="section-divider" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
