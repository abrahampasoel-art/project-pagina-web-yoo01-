import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center font-black text-white text-lg">
                Y
              </div>
              <div>
                <div className="font-black text-white">YOO'INMUEBLES</div>
                <div className="text-xs text-primary-500 tracking-widest uppercase">Hidalgo, Mexico</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5">
              Tu inmobiliaria de confianza en el estado de Hidalgo. Ayudando a familias
              e inversionistas a encontrar su propiedad ideal desde 2014.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Instagram, label: 'Instagram' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon size={16} className="text-gray-400 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4">Navegacion</h3>
            <ul className="space-y-2.5">
              {[
                { id: 'inicio', label: 'Inicio' },
                { id: 'propiedades', label: 'Propiedades' },
                { id: 'nosotros', label: 'Nosotros' },
                { id: 'contacto', label: 'Contacto' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4">Propiedades</h3>
            <ul className="space-y-2.5 text-sm">
              {['Casas en venta', 'Departamentos', 'Terrenos', 'Locales comerciales', 'Propiedades en renta'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo('propiedades')}
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white text-sm mb-4">Contacto</h3>
            <ul className="space-y-3">
              {[
                { icon: Phone, text: '771 123 4567', href: 'tel:+527711234567' },
                { icon: Mail, text: 'contacto@yooinmuebles.com', href: 'mailto:contacto@yooinmuebles.com' },
                { icon: MapPin, text: 'Av. Juarez 123, Pachuca, Hgo.', href: '#' },
              ].map(({ icon: Icon, text, href }) => (
                <li key={text}>
                  <a href={href} className="flex items-start gap-2.5 text-sm hover:text-white transition-colors">
                    <Icon size={14} className="mt-0.5 flex-shrink-0 text-primary-500" />
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p>© {new Date().getFullYear()} YOO'INMUEBLES. Todos los derechos reservados.</p>
          <p>Hecho con dedicacion en Hidalgo, Mexico</p>
        </div>
      </div>
    </footer>
  );
}
