import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type PropertyType = 'casa' | 'departamento' | 'terreno' | 'local_comercial';
export type TransactionType = 'venta' | 'renta';
export type PropertyStatus = 'disponible' | 'vendido' | 'rentado';

export interface Property {
  id: string;
  title: string;
  description: string | null;
  price: number;
  property_type: PropertyType;
  transaction_type: TransactionType;
  bedrooms: number;
  bathrooms: number;
  area_m2: number | null;
  address: string | null;
  city: string;
  state: string;
  latitude: number | null;
  longitude: number | null;
  images: string[];
  featured: boolean;
  status: PropertyStatus;
  created_at: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  message: string;
  property_id?: string;
}

export interface PropertyFilters {
  transaction_type?: TransactionType;
  property_type?: PropertyType;
  city?: string;
  min_price?: number;
  max_price?: number;
}
