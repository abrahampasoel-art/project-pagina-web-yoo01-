import React, { useState, useEffect } from 'react';
import { X, Bed, Bath, Square, MapPin, Phone, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Property } from '../lib/supabase';
import { formatPrice, propertyTypeLabel } from '../utils';

interface PropertyModalProps {
  property: Property;
  onClose: () => void;
  onContact: (propertyId: string) => void;
}

export default function PropertyModal({ property, onClose, onContact }: PropertyModalProps) {
  const [imageIdx, setImageIdx] = useState(0);
  const images = property.images.length > 0
    ? property.images
    : ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setImageIdx((i) => (i - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setImageIdx((i) => (i + 1) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, images.length]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white w-full sm:max-w-3xl sm:rounded-2xl overflow-hidden max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Gallery */}
        <div className="relative aspect-[16/9] bg-gray-900 flex-shrink-0">
          <img
            src={images[imageIdx]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {images.length > 1 && (
            <>
              <button
                onClick={() => setImageIdx((i) => (i - 1 + images.length) % images.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setImageIdx((i) => (i + 1) % images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <ChevronRight size={18} />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImageIdx(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${i === imageIdx ? 'bg-white' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </>
          )}

          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
              property.transaction_type === 'venta' ? 'bg-primary-600 text-white' : 'bg-accent-600 text-white'
            }`}>
              {property.transaction_type === 'venta' ? 'Venta' : 'Renta'}
            </span>
            <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-lg">
              {propertyTypeLabel(property.property_type)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Details */}
        <div className="overflow-y-auto flex-1 p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <h2 className="text-xl font-black text-gray-900 leading-snug">{property.title}</h2>
            <div className="text-primary-600 font-black text-2xl whitespace-nowrap">
              {formatPrice(property.price, property.transaction_type)}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-5">
            <MapPin size={14} className="text-primary-500 flex-shrink-0" />
            <span>{property.address ? `${property.address}, ` : ''}{property.city}, {property.state}</span>
          </div>

          {/* Stats */}
          {(property.bedrooms > 0 || property.bathrooms > 0 || property.area_m2) && (
            <div className="grid grid-cols-3 gap-3 mb-6">
              {property.bedrooms > 0 && (
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <Bed size={20} className="mx-auto mb-1 text-primary-500" />
                  <div className="font-bold text-gray-900">{property.bedrooms}</div>
                  <div className="text-xs text-gray-500">Recámaras</div>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <Bath size={20} className="mx-auto mb-1 text-primary-500" />
                  <div className="font-bold text-gray-900">{property.bathrooms}</div>
                  <div className="text-xs text-gray-500">Baños</div>
                </div>
              )}
              {property.area_m2 && (
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <Square size={20} className="mx-auto mb-1 text-primary-500" />
                  <div className="font-bold text-gray-900">{property.area_m2}</div>
                  <div className="text-xs text-gray-500">m²</div>
                </div>
              )}
            </div>
          )}

          {property.description && (
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-2">Descripcion</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{property.description}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+527711234567"
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              <Phone size={16} />
              Llamar ahora
            </a>
            <button
              onClick={() => onContact(property.id)}
              className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              <MessageSquare size={16} />
              Enviar mensaje
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
