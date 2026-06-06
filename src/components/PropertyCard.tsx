import React from 'react';
import { Bed, Bath, Square, MapPin, Heart } from 'lucide-react';
import type { Property } from '../lib/supabase';
import { formatPrice, propertyTypeLabel } from '../utils';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
}

export default function PropertyCard({ property, onSelect }: PropertyCardProps) {
  const image = property.images[0] ?? 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800';

  return (
    <article
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100"
      onClick={() => onSelect(property)}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
              property.transaction_type === 'venta'
                ? 'bg-primary-600 text-white'
                : 'bg-accent-600 text-white'
            }`}
          >
            {property.transaction_type === 'venta' ? 'Venta' : 'Renta'}
          </span>
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-lg">
            {propertyTypeLabel(property.property_type)}
          </span>
        </div>

        <button
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-400 hover:text-primary-600 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2 group-hover:text-primary-700 transition-colors">
            {property.title}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
          <MapPin size={13} className="flex-shrink-0 text-primary-500" />
          <span className="truncate">{property.city}, {property.state}</span>
        </div>

        {/* Features */}
        {(property.bedrooms > 0 || property.bathrooms > 0 || property.area_m2) && (
          <div className="flex items-center gap-4 text-gray-600 text-sm mb-4 pb-4 border-b border-gray-100">
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1.5">
                <Bed size={14} className="text-gray-400" />
                {property.bedrooms} rec.
              </span>
            )}
            {property.bathrooms > 0 && (
              <span className="flex items-center gap-1.5">
                <Bath size={14} className="text-gray-400" />
                {property.bathrooms} {property.bathrooms === 1 ? 'baño' : 'baños'}
              </span>
            )}
            {property.area_m2 && (
              <span className="flex items-center gap-1.5">
                <Square size={14} className="text-gray-400" />
                {property.area_m2} m²
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <div className="text-primary-600 font-black text-xl">
              {formatPrice(property.price, property.transaction_type)}
            </div>
          </div>
          <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1.5 rounded-lg group-hover:bg-primary-600 group-hover:text-white transition-colors">
            Ver detalles
          </span>
        </div>
      </div>
    </article>
  );
}
