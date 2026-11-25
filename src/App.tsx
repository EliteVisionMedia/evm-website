import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import { AnimatePresence, MotionConfig } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingSocial from './components/FloatingSocial';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import ComingSoon from './pages/ComingSoon';
import Services from './pages/Services';
import DigitalMarketing from './pages/DigitalMarketing';
import WebDesign from './pages/WebDesign';
import VideoProduction from './pages/VideoProduction';
import Work from './pages/Work';
import ServiceDetailPage from './pages/ServiceDetailPage';
import { CaseStudyPage, IndustriesOverview, IndustryPage } from './pages/Industries';
import About from './pages/About';
import Contact from './pages/Contact';
import { servicePages } from './data/services';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Wait for the page transition to mount the section, then scroll to it.
      const t = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 350);
      return () => window.clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const location = useLocation();

  return (
    // reducedMotion="user": transform/layout animations are skipped when the OS asks for reduced motion.
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          {servicePages.map((s) => (
            <Route key={s.slug} path={s.path} element={<PageTransition>{s.slug === 'digital-marketing' ? <DigitalMarketing /> : s.slug === 'web-design-development' ? <WebDesign /> : <VideoProduction />}</PageTransition>} />
          ))}
          <Route path="/services/:parent/:topic" element={<PageTransition><ServiceDetailPage /></PageTransition>} />
          <Route path="/industries" element={<PageTransition><IndustriesOverview /></PageTransition>} />
          <Route path="/industries/:slug" element={<PageTransition><IndustryPage /></PageTransition>} />
          <Route path="/case-studies/:slug" element={<PageTransition><CaseStudyPage /></PageTransition>} />
          <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><BlogList /></PageTransition>} />
          <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
          <Route path="/blogs" element={<Navigate to="/blog" replace />} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="*" element={<PageTransition><ComingSoon title="Page not found" notFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <FloatingSocial />
    </MotionConfig>
  );
}
