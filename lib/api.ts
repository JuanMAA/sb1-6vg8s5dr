import { supabase } from './supabase-client';

// Casino related queries
export async function getCasinos() {
  try {
    const { data, error } = await supabase
      .from('casinos')
      .select('*')
      .order('rating', { ascending: false });
    if (error) {
      console.error('Error fetching casinos:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error in getCasinos:', err);
    return [];
  }
}

export async function getCasinosByCountry(countryCode: string) {
  try {
    const { data, error } = await supabase
      .from('casinos')
      .select(`
        *,
        casino_countries!inner(
          countries!inner(code)
        )
      `)
      .eq('casino_countries.countries.code', countryCode)
      .order('rating', { ascending: false });

    if (error) {
      console.error(`Error fetching casinos for country ${countryCode}:`, error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error(`Error in getCasinosByCountry for ${countryCode}:`, err);
    return [];
  }
}

export async function getFeaturedCasino(countryCode?: string) {
  try {
    let query = supabase
      .from('casinos')
      .select('*, casino_countries(countries!inner(code))')
      .eq('featured', true)
      .order('rating', { ascending: false })
      .limit(1);

    if (countryCode && countryCode !== 'global') {
      query = query.eq('casino_countries.countries.code', countryCode);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching featured casino:', error);
      return null;
    }

    return data?.[0] || null;
  } catch (err) {
    console.error('Error in getFeaturedCasino:', err);
    return null;
  }
}

export async function getCasinoDetails(slug: string) {
  try {
    const { data, error } = await supabase
      .from('casinos')
      .select(`
        *,
        casino_features(features(*)),
        casino_payment_methods(payment_methods(*)),
        casino_game_providers(game_providers(*)),
        casino_licenses(licenses(*)),
        casino_security_features(security_features(*)),
        pros_cons(*),
        supported_languages(*),
        support_channels(*)
      `)
      .eq('slug', slug)
      .single();

    if (error) {
      console.error(`Error fetching casino details for ${slug}:`, error);
      return null;
    }

    return data;
  } catch (err) {
    console.error(`Error in getCasinoDetails for ${slug}:`, err);
    return null;
  }
}

// Bonus related queries
export async function getBonuses(type?: string) {
  try {
    let query = supabase
      .from('bonuses')
      .select(`
        *,
        casinos(*)
      `)
      .order('created_at', { ascending: false });

    if (type && type !== 'all') {
      query = query.eq('bonus_type', type);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching bonuses:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error in getBonuses:', err);
    return [];
  }
}

// Country related queries
export async function getCountries() {
  try {
    const { data, error } = await supabase
      .from('countries')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching countries:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error in getCountries:', err);
    return [];
  }
}

export async function getCountryByCode(code: string) {
  try {
    const { data, error } = await supabase
      .from('countries')
      .select('*')
      .eq('code', code)
      .single();

    if (error) {
      console.error(`Error fetching country with code ${code}:`, error);
      return null;
    }

    return data;
  } catch (err) {
    console.error(`Error in getCountryByCode for ${code}:`, err);
    return null;
  }
}

// License related queries
export async function getLicenses() {
  try {
    const { data, error } = await supabase
      .from('licenses')
      .select(`
        *,
        license_requirements(*),
        license_player_protections(*),
        license_pros_cons(*)
      `)
      .order('trust_score', { ascending: false });

    if (error) {
      console.error('Error fetching licenses:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error in getLicenses:', err);
    return [];
  }
}

export async function getLicenseById(id: string) {
  try {
    const { data, error } = await supabase
      .from('licenses')
      .select(`
        *,
        license_requirements(*),
        license_player_protections(*),
        license_pros_cons(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching license with id ${id}:`, error);
      return null;
    }

    return data;
  } catch (err) {
    console.error(`Error in getLicenseById for ${id}:`, err);
    return null;
  }
}