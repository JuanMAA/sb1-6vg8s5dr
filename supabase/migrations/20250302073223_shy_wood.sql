/*
  # Initial Schema for Casino Information System

  1. New Tables
    - `casinos` - Main table for casino information
    - `countries` - Countries information including legal status
    - `licenses` - Licensing authorities information
    - `bonuses` - Casino bonuses information
    - `features` - Casino features
    - `payment_methods` - Payment methods
    - `game_providers` - Game providers
    - `security_features` - Security features
    - Various junction tables for many-to-many relationships

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create casinos table
CREATE TABLE IF NOT EXISTS casinos (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT NOT NULL,
  website_url TEXT NOT NULL,
  description TEXT NOT NULL,
  rating DECIMAL(3,1) NOT NULL,
  established_year INTEGER NOT NULL,
  min_deposit DECIMAL(10,2),
  withdrawal_time TEXT,
  has_mobile_app BOOLEAN DEFAULT false,
  has_live_streaming BOOLEAN DEFAULT false,
  has_cash_out BOOLEAN DEFAULT false,
  has_live_betting BOOLEAN DEFAULT false,
  monthly_visits INTEGER,
  positive_rating_percentage INTEGER,
  user_reviews_count INTEGER,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- Create countries table
CREATE TABLE IF NOT EXISTS countries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  flag_emoji TEXT NOT NULL,
  legal_status TEXT NOT NULL,
  regulatory_body TEXT,
  legal_age TEXT,
  tax_info TEXT,
  legal_info TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- Create licenses table
CREATE TABLE IF NOT EXISTS licenses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  established_year INTEGER NOT NULL,
  website_url TEXT NOT NULL,
  rating TEXT NOT NULL,
  trust_score DECIMAL(3,1) NOT NULL,
  description TEXT NOT NULL,
  application_process TEXT,
  annual_fees TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- Create license requirements table
CREATE TABLE IF NOT EXISTS license_requirements (
  id SERIAL PRIMARY KEY,
  license_id INTEGER NOT NULL REFERENCES licenses(id) ON DELETE CASCADE,
  requirement TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create license player protections table
CREATE TABLE IF NOT EXISTS license_player_protections (
  id SERIAL PRIMARY KEY,
  license_id INTEGER NOT NULL REFERENCES licenses(id) ON DELETE CASCADE,
  protection TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create license pros and cons table
CREATE TABLE IF NOT EXISTS license_pros_cons (
  id SERIAL PRIMARY KEY,
  license_id INTEGER NOT NULL REFERENCES licenses(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_pro BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create bonuses table
CREATE TABLE IF NOT EXISTS bonuses (
  id SERIAL PRIMARY KEY,
  casino_id INTEGER NOT NULL REFERENCES casinos(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  bonus_code TEXT,
  wagering_requirement INTEGER,
  min_deposit DECIMAL(10,2),
  max_amount DECIMAL(10,2),
  valid_until TIMESTAMPTZ,
  bonus_type TEXT NOT NULL,
  is_exclusive BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- Create features table
CREATE TABLE IF NOT EXISTS features (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create payment methods table
CREATE TABLE IF NOT EXISTS payment_methods (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create game providers table
CREATE TABLE IF NOT EXISTS game_providers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  website_url TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create security features table
CREATE TABLE IF NOT EXISTS security_features (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create pros and cons table
CREATE TABLE IF NOT EXISTS pros_cons (
  id SERIAL PRIMARY KEY,
  casino_id INTEGER NOT NULL REFERENCES casinos(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_pro BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create supported languages table
CREATE TABLE IF NOT EXISTS supported_languages (
  id SERIAL PRIMARY KEY,
  casino_id INTEGER NOT NULL REFERENCES casinos(id) ON DELETE CASCADE,
  language TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create support channels table
CREATE TABLE IF NOT EXISTS support_channels (
  id SERIAL PRIMARY KEY,
  casino_id INTEGER NOT NULL REFERENCES casinos(id) ON DELETE CASCADE,
  channel TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create junction tables for many-to-many relationships

-- Casino to Countries
CREATE TABLE IF NOT EXISTS casino_countries (
  id SERIAL PRIMARY KEY,
  casino_id INTEGER NOT NULL REFERENCES casinos(id) ON DELETE CASCADE,
  country_id INTEGER NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  is_restricted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(casino_id, country_id)
);

-- Casino to Features
CREATE TABLE IF NOT EXISTS casino_features (
  id SERIAL PRIMARY KEY,
  casino_id INTEGER NOT NULL REFERENCES casinos(id) ON DELETE CASCADE,
  feature_id INTEGER NOT NULL REFERENCES features(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(casino_id, feature_id)
);

-- Casino to Payment Methods
CREATE TABLE IF NOT EXISTS casino_payment_methods (
  id SERIAL PRIMARY KEY,
  casino_id INTEGER NOT NULL REFERENCES casinos(id) ON DELETE CASCADE,
  payment_method_id INTEGER NOT NULL REFERENCES payment_methods(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(casino_id, payment_method_id)
);

-- Casino to Game Providers
CREATE TABLE IF NOT EXISTS casino_game_providers (
  id SERIAL PRIMARY KEY,
  casino_id INTEGER NOT NULL REFERENCES casinos(id) ON DELETE CASCADE,
  game_provider_id INTEGER NOT NULL REFERENCES game_providers(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(casino_id, game_provider_id)
);

-- Casino to Licenses
CREATE TABLE IF NOT EXISTS casino_licenses (
  id SERIAL PRIMARY KEY,
  casino_id INTEGER NOT NULL REFERENCES casinos(id) ON DELETE CASCADE,
  license_id INTEGER NOT NULL REFERENCES licenses(id) ON DELETE CASCADE,
  license_number TEXT,
  issue_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(casino_id, license_id)
);

-- Casino to Security Features
CREATE TABLE IF NOT EXISTS casino_security_features (
  id SERIAL PRIMARY KEY,
  casino_id INTEGER NOT NULL REFERENCES casinos(id) ON DELETE CASCADE,
  security_feature_id INTEGER NOT NULL REFERENCES security_features(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(casino_id, security_feature_id)
);

-- Enable Row Level Security
ALTER TABLE casinos ENABLE ROW LEVEL SECURITY;
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE license_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE license_player_protections ENABLE ROW LEVEL SECURITY;
ALTER TABLE license_pros_cons ENABLE ROW LEVEL SECURITY;
ALTER TABLE bonuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE features ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE pros_cons ENABLE ROW LEVEL SECURITY;
ALTER TABLE supported_languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE casino_countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE casino_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE casino_payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE casino_game_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE casino_licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE casino_security_features ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (read-only for now)
-- In a real application, you would create more specific policies based on user roles

-- Read-only policies for all tables
CREATE POLICY "Allow read access for all users" ON casinos FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON countries FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON licenses FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON license_requirements FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON license_player_protections FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON license_pros_cons FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON bonuses FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON features FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON payment_methods FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON game_providers FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON security_features FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON pros_cons FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON supported_languages FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON support_channels FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON casino_countries FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON casino_features FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON casino_payment_methods FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON casino_game_providers FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON casino_licenses FOR SELECT USING (true);
CREATE POLICY "Allow read access for all users" ON casino_security_features FOR SELECT USING (true);

-- Create policies for authenticated users (write access)
-- Only authenticated users can insert/update/delete data
CREATE POLICY "Allow write access for authenticated users" ON casinos FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow write access for authenticated users" ON casinos FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow write access for authenticated users" ON casinos FOR DELETE USING (auth.role() = 'authenticated');

-- Similar policies for other tables
-- (Abbreviated for brevity - in a real application, you would create these for all tables)