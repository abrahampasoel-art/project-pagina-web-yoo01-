import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { sendContactMessage } from '../lib/api';

interface ContactProps {
  preselectedPropertyId?: string;
  onClear: () => void;
}

export default function Contact({ preselectedPropertyId, onClear }: ContactProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (preselectedPropertyId) {
      setForm((f) => ({
        ...f,
        message: f.message || 'Hola, estoy interesado en la propiedad que vi en su sitio web. ¿Me podrian dar mas informacion?',
      }));
    }
  }, [preselectedPropertyId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setStatus('loading');
    setErrorMsg('');
    try {
      await sendContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        message: form.message.trim(),
        property_id: preselectedPropertyId || undefined,
      });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
      onClear();
    } catch {
      setStatus('error');
      setErrorMsg('Ocurrio un error al enviar el mensaje. Por favor intenta de nuevo.');
    }
  };

  return (
    <section id="contacto" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <span className="text-primary-400 text-sm font-bold uppercase tracking-widest">
              Contacto
            </span>
            <h2 className="text-3xl lg:text-4xl font-black text-white mt-2 mb-5">
              Hablemos de tu propiedad ideal
            </h2>
            <p className="text-gray-400 leading-relaxed mb-10">
              Nuestros asesores estan listos para ayudarte a encontrar la mejor
              opcion. Respondemos todos los mensajes en menos de 24 horas.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: Phone,
                  title: 'Telefono',
                  value: '771 123 4567',
                  href: 'tel:+527711234567',
                },
                {
                  icon: Mail,
                  title: 'Correo electronico',
                  value: 'contacto@yooinmuebles.com',
                  href: 'mailto:contacto@yooinmuebles.com',
                },
                {
                  icon: MapPin,
                  title: 'Oficina',
                  value: 'Av. Juarez 123, Pachuca de Soto, Hidalgo',
                  href: '#',
                },
              ].map(({ icon: Icon, title, value, href }) => (
                <a
                  key={title}
                  href={href}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-gray-800 group-hover:bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                    <Icon size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</div>
                    <div className="text-white font-medium group-hover:text-primary-400 transition-colors">{value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-800 rounded-2xl p-8">
            {preselectedPropertyId && (
              <div className="flex items-center justify-between bg-primary-900/50 border border-primary-700 text-primary-300 text-sm px-4 py-3 rounded-xl mb-6">
                <span>Consultando una propiedad especifica</span>
                <button onClick={onClear} className="text-primary-400 hover:text-white ml-2 font-bold">x</button>
              </div>
            )}

            {status === 'success' ? (
              <div className="text-center py-12">
                <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Mensaje enviado</h3>
                <p className="text-gray-400 text-sm">
                  Gracias por contactarnos. Te responderemos en menos de 24 horas.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-primary-400 font-semibold hover:text-primary-300 transition-colors text-sm"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">
                      Nombre *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre completo"
                      className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">
                      Telefono
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="771 000 0000"
                      className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">
                    Correo electronico *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@correo.com"
                    className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1.5">
                    Mensaje *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="¿En que tipo de propiedad estas interesado? ¿Cuales son tus necesidades?"
                    className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/30 border border-red-800 px-4 py-3 rounded-xl">
                    <AlertCircle size={16} />
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors"
                >
                  {status === 'loading' ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <Send size={16} />
                      Enviar mensaje
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
