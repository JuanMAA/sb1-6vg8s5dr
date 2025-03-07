import Hero from '@/components/hero';
import { getBonuses, getCasinos, getFeaturedCasino } from '@/lib/api';

async function getCasinosByCountryData(): Promise<any> {
  try {
    const casinosByCountry = await getCasinos();
    if (!casinosByCountry) {
      console.error('Error fetching getCasinosData:', casinosByCountry);
    }
    return { casinosByCountry };
  } catch (err) {
    return { casinosByCountry: [] };
  }
}

async function getBonusessData(): Promise<any> {
  try {
    const bonusesData = await getBonuses();
    if (!bonusesData) {
      console.error('Error fetching getBonusessData:', bonusesData);
    }
    return { bonusesData };
  } catch (err) {
    return { bonusesData: [] };
  }
}

async function getFeaturedCasinoData(): Promise<any> {
  try {
    const featuredCasinoData = await getFeaturedCasino();
    if (!featuredCasinoData) {
      console.error('Error fetching getFeaturedCasino:', featuredCasinoData);
    }

    return { featuredCasinoData };
  } catch (err) {
    return { featuredCasinoData: null };
  }
}

export default async function Home() {

  const { casinosByCountryData } = await getCasinosByCountryData();
  const { bonusesData } = await getBonusessData();
  const { featuredCasinoData } = await getFeaturedCasinoData();

  return (
    <Hero
      featuredCasinoData={featuredCasinoData}
      casinosData={casinosByCountryData}
      bonusesData={bonusesData} />
  );
}