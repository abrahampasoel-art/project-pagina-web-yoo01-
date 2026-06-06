import { supabase, type Property, type PropertyFilters, type ContactMessage } from './supabase';

export async function getFeaturedProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('featured', true)
    .eq('status', 'disponible')
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) throw error;
  return data ?? [];
}

export async function getProperties(filters: PropertyFilters = {}): Promise<Property[]> {
  let query = supabase
    .from('properties')
    .select('*')
    .eq('status', 'disponible')
    .order('created_at', { ascending: false });

  if (filters.transaction_type) {
    query = query.eq('transaction_type', filters.transaction_type);
  }
  if (filters.property_type) {
    query = query.eq('property_type', filters.property_type);
  }
  if (filters.city) {
    query = query.ilike('city', `%${filters.city}%`);
  }
  if (filters.min_price !== undefined) {
    query = query.gte('price', filters.min_price);
  }
  if (filters.max_price !== undefined) {
    query = query.lte('price', filters.max_price);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .eq('status', 'disponible')
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function sendContactMessage(message: ContactMessage): Promise<void> {
  const { error } = await supabase.from('contact_messages').insert(message);
  if (error) throw error;
}
