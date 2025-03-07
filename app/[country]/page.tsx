import Hero from '@/components/hero';
import { getCountries, getCountryByCode, getFeaturedCasino } from '@/lib/api';

export const revalidate = 172800; // 2 days in seconds

async function getCountriesData(): Promise<any> {
  try {
    const countriesData = await getCountries();
    if (!countriesData) {
      console.error('Error fetching getCountriesData:', countriesData);
    }
    return { countriesData };
  } catch (err) {
    return { countriesData: [] };
  }
}

async function getCountryData(country: string): Promise<any> {
  try {
    const countryData = await getCountryByCode(country);
    if (!countryData) {
      console.error('Error fetching countryData:', countryData);
    }
    console.log("countryData",countryData)
    return { countryData };
  } catch (err) {
    return { countryData: null };
  }
}

async function getFeaturedCasinoData(country: string): Promise<any> {
  try {
    const featuredCasinoData = await getFeaturedCasino(country);
    if (!featuredCasinoData) {
      console.error('Error fetching getFeaturedCasino:', featuredCasinoData);
    }

    return { featuredCasinoData };
  } catch (err) {
    return { featuredCasinoData: null };
  }
}

export default async function Country({
  params
}: {
  params: { country: string };
}) {
  const { countryData } = await getCountryData(params.country);
  const { featuredCasinoData } = await getFeaturedCasinoData(params.country);
  const { countriesData } = await getCountriesData();

  return (
    <Hero
      countryData={countryData}
      countriesData={countriesData}
      featuredCasinoData={featuredCasinoData} />
  );
}

export async function generateStaticParams() {
  const countries = await getCountries();

  return countries.map(country => ({
    country: country.code
  }));
}
