import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

interface HeaderProps {
  currentSection: string;
}

const navLinks = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'propiedades', label: 'Propiedades' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'contacto', label: 'Contacto' },
];

export default function Header({ currentSection }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const isHeroSection = currentSection === 'inicio' && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-white shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollTo('inicio')}
            className="flex items-center gap-2 group"
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-lg transition-colors ${
              isHeroSection
                ? 'bg-white text-primary-600'
                : 'bg-primary-600 text-white'
            }`}>
              Y
            </div>
            <div className="flex flex-col leading-tight">
              <span className={`font-black text-lg tracking-tight transition-colors ${
                isHeroSection ? 'text-white' : 'text-gray-900'
              }`}>
                YOO'INMUEBLES
              </span>
              <span className={`text-xs font-medium tracking-widest uppercase transition-colors ${
                isHeroSection ? 'text-white/70' : 'text-primary-600'
              }`}>
                Hidalgo, Mexico
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentSection === link.id
                    ? isHeroSection
                      ? 'bg-white/20 text-white'
                      : 'bg-primary-50 text-primary-700'
                    : isHeroSection
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+527711234567"
              className={`hidden sm:flex items-center gap-2 text-sm font-medium transition-colors ${
                isHeroSection ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              <Phone size={15} />
              771 123 4567
            </a>
            <button
              onClick={() => scrollTo('contacto')}
              className="hidden lg:block bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              Cotizar
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isHeroSection && !menuOpen
                  ? 'text-white hover:bg-white/10'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  currentSection === link.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contacto')}
              className="mt-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-4 py-3 rounded-lg transition-colors"
            >
              Cotizar ahora
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
