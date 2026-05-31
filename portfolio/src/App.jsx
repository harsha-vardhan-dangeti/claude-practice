import { HashRouter, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import { useScrollReveal } from './hooks/useScrollReveal';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import HomePage        from './pages/HomePage';
import AboutPage       from './pages/AboutPage';
import ExperiencePage  from './pages/ExperiencePage';
import ProjectsPage    from './pages/ProjectsPage';
import SkillsPage      from './pages/SkillsPage';
import AchievementsPage from './pages/AchievementsPage';
import ContactPage     from './pages/ContactPage';

// Must live inside HashRouter to access useLocation
function Inner() {
  const { theme, toggle } = useTheme();
  useScrollReveal();

  return (
    <>
      <ScrollToTop />
      <Nav theme={theme} onToggleTheme={toggle} />
      <main>
        <Routes>
          <Route path="/"             element={<HomePage />} />
          <Route path="/about"        element={<AboutPage />} />
          <Route path="/experience"   element={<ExperiencePage />} />
          <Route path="/projects"     element={<ProjectsPage />} />
          <Route path="/skills"       element={<SkillsPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/contact"      element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Inner />
    </HashRouter>
  );
}
