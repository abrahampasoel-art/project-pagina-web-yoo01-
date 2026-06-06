
/*
# Esquema inicial de YOO'INMUEBLES

## Descripcion
Crea las tablas principales para el sitio web de la inmobiliaria YOO'INMUEBLES.
Esta es una aplicacion de catalogo publico sin autenticacion de usuarios.

## Tablas nuevas

### properties (propiedades)
- id: identificador unico
- title: titulo de la propiedad
- description: descripcion detallada
- price: precio en MXN
- property_type: tipo (casa, departamento, terreno, local_comercial)
- transaction_type: tipo de transaccion (venta, renta)
- bedrooms: numero de recamaras
- bathrooms: numero de banos
- area_m2: superficie en m2
- address: direccion
- city: ciudad
- state: estado (Hidalgo por defecto)
- latitude: coordenada geografica
- longitude: coordenada geografica
- images: arreglo de URLs de imagenes
- featured: si aparece en la seccion destacada
- status: estado (disponible, vendido, rentado)
- created_at: fecha de creacion

### contact_messages (mensajes de contacto)
- id: identificador unico
- name: nombre del interesado
- email: correo electronico
- phone: telefono
- message: mensaje
- property_id: propiedad de interes (opcional)
- created_at: fecha de envio

## Seguridad
- RLS habilitado en todas las tablas
- Lectura publica de propiedades disponibles
- Insercion publica de mensajes de contacto
- Sin acceso de escritura a propiedades desde el frontend
*/

-- Tabla de propiedades
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  price numeric(12,2) NOT NULL,
  property_type text NOT NULL CHECK (property_type IN ('casa', 'departamento', 'terreno', 'local_comercial')),
  transaction_type text NOT NULL DEFAULT 'venta' CHECK (transaction_type IN ('venta', 'renta')),
  bedrooms integer DEFAULT 0,
  bathrooms integer DEFAULT 0,
  area_m2 numeric(10,2),
  address text,
  city text NOT NULL,
  state text NOT NULL DEFAULT 'Hidalgo',
  latitude numeric(10,7),
  longitude numeric(10,7),
  images text[] DEFAULT '{}',
  featured boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'disponible' CHECK (status IN ('disponible', 'vendido', 'rentado')),
  created_at timestamptz DEFAULT now()
);

-- Tabla de mensajes de contacto
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  property_id uuid REFERENCES properties(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Indices para consultas frecuentes
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_transaction ON properties(transaction_type);

-- Habilitar RLS
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Politicas para properties (solo lectura publica)
DROP POLICY IF EXISTS "public_select_properties" ON properties;
CREATE POLICY "public_select_properties" ON properties FOR SELECT
  TO anon, authenticated USING (status = 'disponible');

-- Politicas para contact_messages (solo insercion publica)
DROP POLICY IF EXISTS "public_insert_contact" ON contact_messages;
CREATE POLICY "public_insert_contact" ON contact_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Datos de ejemplo para demostrar el sitio
INSERT INTO properties (title, description, price, property_type, transaction_type, bedrooms, bathrooms, area_m2, address, city, state, images, featured, status) VALUES
(
  'Casa moderna en fraccionamiento exclusivo',
  'Hermosa casa de dos plantas con acabados de lujo, jardín privado y amplia sala. Ubicada en fraccionamiento cerrado con seguridad las 24 horas. Cocina integral equipada, sala de tv, cuarto de servicio y doble garage.',
  3200000,
  'casa',
  'venta',
  3, 2, 180,
  'Av. Insurgentes 245, Fraccionamiento Las Palmas',
  'Pachuca de Soto',
  'Hidalgo',
  ARRAY['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'],
  true,
  'disponible'
),
(
  'Departamento con vista panorámica',
  'Moderno departamento en piso 8 con impresionante vista a la ciudad. Incluye sala-comedor amplio, cocina americana, dos recámaras con closet y baño completo. Edificio con elevador, área de lavandería y estacionamiento.',
  1850000,
  'departamento',
  'venta',
  2, 1, 95,
  'Blvd. Colosio 1023 Torre A, Piso 8',
  'Pachuca de Soto',
  'Hidalgo',
  ARRAY['https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=800'],
  true,
  'disponible'
),
(
  'Residencia con alberca y jardín',
  'Espectacular residencia de lujo con alberca privada, jardín paisajista, terraza y asador. 4 recámaras con baño completo cada una, sala de juegos, estudio y cochera para 3 autos. Los mejores acabados.',
  8500000,
  'casa',
  'venta',
  4, 4, 420,
  'Privada de los Pinos 12, Residencial del Parque',
  'Mineral de la Reforma',
  'Hidalgo',
  ARRAY['https://images.pexels.com/photos/32870/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800'],
  true,
  'disponible'
),
(
  'Terreno para desarrolladores',
  'Excelente terreno plano con todos los servicios en zona de alto desarrollo. Ideal para construir residencial, condominio o local comercial. Escrituras en regla y uso de suelo mixto.',
  1200000,
  'terreno',
  'venta',
  0, 0, 500,
  'Carretera Pachuca-Tulancingo Km 3',
  'Mineral de la Reforma',
  'Hidalgo',
  ARRAY['https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=800'],
  false,
  'disponible'
),
(
  'Local comercial en zona prime',
  'Local comercial en avenida principal con gran afluencia de personas. Apto para restaurante, tienda de ropa, farmacia o cualquier giro comercial. Incluye bodega trasera y medio baño.',
  18000,
  'local_comercial',
  'renta',
  0, 1, 85,
  'Av. Revolución 567, Centro',
  'Pachuca de Soto',
  'Hidalgo',
  ARRAY['https://images.pexels.com/photos/264507/pexels-photo-264507.jpeg?auto=compress&cs=tinysrgb&w=800'],
  false,
  'disponible'
),
(
  'Casa en renta amueblada',
  'Cómoda casa en renta totalmente amueblada, ideal para familias o ejecutivos. Sala con muebles, comedor, cocina equipada con refrigerador, lavadora y secadora. Jardín privado y cochera techada.',
  12000,
  'casa',
  'renta',
  3, 2, 150,
  'Calle Hidalgo 89, Col. Centro',
  'Tulancingo de Bravo',
  'Hidalgo',
  ARRAY['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800'],
  true,
  'disponible'
),
(
  'Departamento de lujo céntrico',
  'Exclusivo departamento en el corazón de la ciudad. Diseño contemporáneo con materiales de primera calidad. Gimnasio en el edificio, roof garden compartido y seguridad 24/7.',
  2400000,
  'departamento',
  'venta',
  2, 2, 110,
  'Blvd. Everardo Márquez 234, Piso 5',
  'Pachuca de Soto',
  'Hidalgo',
  ARRAY['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'],
  false,
  'disponible'
),
(
  'Casa familiar con amplio patio',
  'Acogedora casa familiar con amplio patio trasero ideal para niños. Recién remodelada con pintura nueva, pisos de mármol y cocina integral. Zona tranquila con acceso a escuelas y servicios.',
  2100000,
  'casa',
  'venta',
  3, 2, 200,
  'Calle Allende 156, Col. San Francisco',
  'Tulancingo de Bravo',
  'Hidalgo',
  ARRAY['https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg?auto=compress&cs=tinysrgb&w=800'],
  false,
  'disponible'
)
ON CONFLICT DO NOTHING;
