import type { PropertyType, TransactionType } from './lib/supabase';

export function formatPrice(price: number, transactionType: TransactionType): string {
  const formatted = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return transactionType === 'renta' ? `${formatted}/mes` : formatted;
}

export function propertyTypeLabel(type: PropertyType): string {
  const labels: Record<PropertyType, string> = {
    casa: 'Casa',
    departamento: 'Departamento',
    terreno: 'Terreno',
    local_comercial: 'Local Comercial',
  };
  return labels[type];
}

export function propertyTypeIcon(type: PropertyType): string {
  const icons: Record<PropertyType, string> = {
    casa: '🏠',
    departamento: '🏢',
    terreno: '🌿',
    local_comercial: '🏪',
  };
  return icons[type];
}
