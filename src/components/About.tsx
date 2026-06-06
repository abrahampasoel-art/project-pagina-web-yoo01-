import React from 'react';
import { Award, Users, MapPin, Clock } from 'lucide-react';

export default function About() {
  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <span className="text-primary-600 text-sm font-bold uppercase tracking-widest">
              Quienes somos
            </span>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mt-2 mb-6">
              La inmobiliaria de confianza en Hidalgo
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              YOO'INMUEBLES nació con la visión de transformar la manera en que
              las familias e inversionistas encuentran su propiedad ideal en el
              estado de Hidalgo. Con más de 10 años de experiencia en el mercado
              inmobiliario regional, somos el socio de confianza que guía cada
              paso del proceso.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Nuestro equipo de asesores especializados conoce a fondo cada ciudad
              y colonia del estado: desde la capital Pachuca hasta Tulancingo,
              Tula, Actopan y más. Ofrecemos asesoramiento personalizado,
              transparencia total y el compromiso de encontrar la mejor opcion
              para tu presupuesto y necesidades.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Award, label: '10+ años', sub: 'de experiencia' },
                { icon: Users, label: '500+ clientes', sub: 'satisfechos' },
                { icon: MapPin, label: '8 ciudades', sub: 'en Hidalgo' },
                { icon: Clock, label: 'Respuesta', sub: 'en 24 horas' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-primary-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{label}</div>
                    <div className="text-gray-500 text-xs">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image collage */}
          <div className="relative h-[500px] hidden lg:block">
            <img
              src="https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Casa en Hidalgo"
              className="absolute top-0 right-0 w-3/4 h-72 object-cover rounded-2xl shadow-lg"
            />
            <img
              src="https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Interior de propiedad"
              className="absolute bottom-0 left-0 w-2/3 h-64 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute bottom-24 right-0 bg-primary-600 text-white rounded-2xl p-5 shadow-xl w-44 text-center">
              <div className="text-4xl font-black">150+</div>
              <div className="text-sm font-medium text-primary-200 mt-1">propiedades en catalogo</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
