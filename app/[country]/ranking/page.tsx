import CasinoList from '@/components/casino-list';
import CasinoFilters from '@/components/casino-filters';
import { getCountries, getCasinosByCountry } from '@/lib/api';

async function getCasinosByCountryData(country: string): Promise<any> {
  try {
    const casinosByCountry = await getCasinosByCountry(country);
    if (!casinosByCountry) {
      console.error('Error fetching getCasinosData:', casinosByCountry);
    }
    return { casinosByCountry };
  } catch (err) {
    return { casinosByCountry: [] };
  }
}

export default async function RankingsPage({
  params
}: {
  params: { country: string };
}) {

  const { casinosByCountryData } = await getCasinosByCountryData(params.country);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Online Casino Rankings</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Compare the best online casinos based on our expert reviews, user ratings, bonuses, and more.
        </p>
      </div>

      <CasinoFilters />
      <CasinoList
        highlightFirst={true}
        casinosByCountryData={casinosByCountryData}
        countryCode={params.country} />
    </div>
  );
}

export async function generateStaticParams() {
  const countries = await getCountries();
  return countries.map(country => ({ country: country.code }));
}
