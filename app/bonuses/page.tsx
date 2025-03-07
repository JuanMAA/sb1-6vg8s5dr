import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift, Percent, Coins, Zap } from "lucide-react";
import BonusFilters from '@/components/bonus-filters';
import BonusList from '@/components/bonus-list';
import { getCountries, getCasinos, getBonuses } from '@/lib/api';

const bonusTabs = [
  { type: "all", label: "All Bonuses", icon: Gift },
  { type: "welcome", label: "Welcome Bonuses", icon: Gift },
  { type: "no-deposit", label: "No Deposit", icon: Coins },
  { type: "free-bets", label: "Free Bets", icon: Zap },
  { type: "cashback", label: "Cashback", icon: Percent }
];

async function getCasinosData(): Promise<any> {
  try {
    const casinosData = await getCasinos();
    if (!casinosData) {
      console.error('Error fetching getCasinosData:', casinosData);
    }
    return { casinosData };
  } catch (err) {
    return { casinosData: [] };
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

export default async function Bonuses({
  params
}: {
  params: { country: string };
}) {

  const { casinosData } = await getCasinosData();
  const { bonusesData } = await getBonusessData();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Best Casino Bonuses
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find the most generous casino bonuses and promotions currently available online. Filter by bonus type, wagering requirements, and more.
        </p>
      </div>


      <Tabs defaultValue="all" className="w-full mb-8">
        <div className="flex justify-center mb-6 overflow-x-auto pb-2">
          <TabsList>
            {bonusTabs.map(({ type, label, icon: Icon }) => (
              <TabsTrigger key={type} value={type} className="flex items-center">
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {bonusTabs.map(({ type }) => (
          <TabsContent key={type} value={type}>
            <BonusFilters type={type} casinosData={casinosData} />
            <BonusList type={type} bonusesData={bonusesData} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export async function generateStaticParams() {
  const countries = await getCountries();
  return countries.map(country => ({ country: country.code }));
}
