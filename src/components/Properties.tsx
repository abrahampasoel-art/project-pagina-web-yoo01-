import React, { useState, useEffect, useCallback } from 'react';
import { SlidersHorizontal, ChevronDown, X, Loader2 } from 'lucide-react';
import PropertyCard from './PropertyCard';
import PropertyModal from './PropertyModal';
import { getProperties } from '../lib/api';
import type { Property, PropertyType, TransactionType } from '../lib/supabase';
import { propertyTypeLabel } from '../utils';

interface PropertiesProps {
  searchQuery: string;
  onContactProperty: (id: string) => void;
}

const PROPERTY_TYPES: PropertyType[] = ['casa', 'departamento', 'terreno', 'local_comercial'];

export default function Properties({ searchQuery, onContactProperty }: PropertiesProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Property | null>(null);
  const [transactionFilter, setTransactionFilter] = useState<TransactionType | ''>('');
  const [typeFilter, setTypeFilter] = useState<PropertyType | ''>('');
  const [showFilters, setShowFilters] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProperties({
        transaction_type: transactionFilter || undefined,
        property_type: typeFilter || undefined,
      });
      setProperties(data);
    } catch {
      setError('No se pudieron cargar las propiedades. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [transactionFilter, typeFilter]);

  useEffect(() => { load(); }, [load]);

  const filtered = searchQuery.trim()
    ? properties.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        propertyTypeLabel(p.property_type).toLowerCase().includes(searchQuery.toLowerCase())
      )
    : properties;

  return (
    <section id="propiedades" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-primary-600 text-sm font-bold uppercase tracking-widest">
              Catalogo
            </span>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mt-1">
              {searchQuery ? `Resultados para "${searchQuery}"` : 'Propiedades disponibles'}
            </h2>
            {!loading && (
              <p className="text-gray-500 mt-1 text-sm">
                {filtered.length} propiedad{filtered.length !== 1 ? 'es' : ''} encontrada{filtered.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 px-4 py-2.5 rounded-xl hover:border-primary-300 transition-colors self-start sm:self-auto"
          >
            <SlidersHorizontal size={16} />
            Filtros
            {(transactionFilter || typeFilter) && (
              <span className="w-2 h-2 rounded-full bg-primary-600" />
            )}
            <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Tipo de transaccion
              </label>
              <div className="flex gap-2 flex-wrap">
                {(['', 'venta', 'renta'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTransactionFilter(t)}
                    className={`text-sm font-semibold px-4 py-2 rounded-lg border transition-colors ${
                      transactionFilter === t
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    {t === '' ? 'Todos' : t === 'venta' ? 'Venta' : 'Renta'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Tipo de propiedad
              </label>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setTypeFilter('')}
                  className={`text-sm font-semibold px-4 py-2 rounded-lg border transition-colors ${
                    typeFilter === '' ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300'
                  }`}
                >
                  Todos
                </button>
                {PROPERTY_TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`text-sm font-semibold px-4 py-2 rounded-lg border transition-colors ${
                      typeFilter === t ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    {propertyTypeLabel(t)}
                  </button>
                ))}
              </div>
            </div>
            {(transactionFilter || typeFilter) && (
              <div className="sm:col-span-2">
                <button
                  onClick={() => { setTransactionFilter(''); setTypeFilter(''); }}
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-600 transition-colors"
                >
                  <X size={14} />
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 size={32} className="animate-spin text-primary-500" />
          </div>
        ) : error ? (
          <div className="text-center py-24">
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={load}
              className="text-primary-600 font-semibold hover:underline"
            >
              Reintentar
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Sin resultados</h3>
            <p className="text-gray-500">
              No encontramos propiedades con esos criterios. Intenta con otros filtros.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={setSelected}
              />
            ))}
          </div>
        )}
      </div>

      {selected && (
        <PropertyModal
          property={selected}
          onClose={() => setSelected(null)}
          onContact={(id) => {
            setSelected(null);
            onContactProperty(id);
          }}
        />
      )}
    </section>
  );
}
