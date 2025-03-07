import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift, Percent, Coins, Zap } from "lucide-react";
import BonusFilters from '@/components/bonus-filters';
import BonusList from '@/components/bonus-list';

export default function BonusesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Best Casino Bonuses</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find the most generous casino bonuses and promotions currently available online. Filter by bonus type, wagering requirements, and more.
        </p>
      </div>
      
      <Tabs defaultValue="all" className="w-full mb-8">
        <div className="flex justify-center mb-6 overflow-x-auto pb-2">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center">
              <Gift className="h-4 w-4 mr-2" />
              All Bonuses
            </TabsTrigger>
            <TabsTrigger value="welcome" className="flex items-center">
              <Gift className="h-4 w-4 mr-2" />
              Welcome Bonuses
            </TabsTrigger>
            <TabsTrigger value="no-deposit" className="flex items-center">
              <Coins className="h-4 w-4 mr-2" />
              No Deposit
            </TabsTrigger>
            <TabsTrigger value="free-bets" className="flex items-center">
              <Zap className="h-4 w-4 mr-2" />
              Free Bets
            </TabsTrigger>
            <TabsTrigger value="cashback" className="flex items-center">
              <Percent className="h-4 w-4 mr-2" />
              Cashback
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all">
          <BonusFilters type="all" />
          <BonusList type="all" />
        </TabsContent>
        
        <TabsContent value="welcome">
          <BonusFilters type="welcome" />
          <BonusList type="welcome" />
        </TabsContent>
        
        <TabsContent value="no-deposit">
          <BonusFilters type="no-deposit" />
          <BonusList type="no-deposit" />
        </TabsContent>
        
        <TabsContent value="free-bets">
          <BonusFilters type="free-bets" />
          <BonusList type="free-bets" />
        </TabsContent>
        
        <TabsContent value="cashback">
          <BonusFilters type="cashback" />
          <BonusList type="cashback" />
        </TabsContent>
      </Tabs>
    </div>
  );
}