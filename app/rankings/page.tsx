import CasinoList from '@/components/casino-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift, AppWindow, Coins, Zap, Video, BanknoteIcon, ListVideo } from "lucide-react";

export default function RankingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Online Casino Rankings</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Compare the best online casinos based on our expert reviews, user ratings, bonuses, and more.
        </p>
      </div>
      <Tabs defaultValue="all" className="w-full mb-8">
        <div className="flex justify-center mb-6 overflow-x-auto pb-2">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center">
              <AppWindow className="h-4 w-4 mr-2" />
              App Móvil
            </TabsTrigger>
            <TabsTrigger value="welcome" className="flex items-center">
              <Video className="h-4 w-4 mr-2" />
              Streaming
            </TabsTrigger>
            <TabsTrigger value="no-deposit" className="flex items-center">
              <BanknoteIcon className="h-4 w-4 mr-2" />
              Cashout
            </TabsTrigger>
            <TabsTrigger value="free-bets" className="flex items-center">
              <ListVideo className="h-4 w-4 mr-2" />
              Apuestas en Vivo
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
      <CasinoList />
    </div>
  );
}