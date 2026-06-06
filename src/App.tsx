import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Properties from './components/Properties';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [currentSection, setCurrentSection] = useState('inicio');
  const [searchQuery, setSearchQuery] = useState('');
  const [contactPropertyId, setContactPropertyId] = useState<string | undefined>();

  const handleContactProperty = useCallback((id: string) => {
    setContactPropertyId(id);
    setTimeout(() => {
      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  // Intersection observer for active nav section
  useEffect(() => {
    const sections = ['inicio', 'propiedades', 'nosotros', 'contacto'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setCurrentSection(id);
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header currentSection={currentSection} />
      <main>
        <Hero onSearch={setSearchQuery} />
        <Properties
          searchQuery={searchQuery}
          onContactProperty={handleContactProperty}
        />
        <About />
        <Contact
          preselectedPropertyId={contactPropertyId}
          onClear={() => setContactPropertyId(undefined)}
        />
      </main>
      <Footer />
    </div>
  );
}
