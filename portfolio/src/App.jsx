import { useTheme } from './hooks/useTheme';
import { useScrollReveal } from './hooks/useScrollReveal';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Talks from './components/Talks';
import Contact from './components/Contact';
import Footer from './components/Footer';

function Divider() {
  return <div className="divider" />;
}

export default function App() {
  const { theme, toggle } = useTheme();
  useScrollReveal();

  return (
    <>
      <Nav theme={theme} onToggleTheme={toggle} />
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Experience />
      <Divider />
      <Projects />
      <Divider />
      <Skills />
      <Divider />
      <Certifications />
      <Divider />
      <Talks />
      <Divider />
      <Contact />
      <Footer />
    </>
  );
}
