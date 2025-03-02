import CasinoList from '@/components/casino-list';

export default function RankingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Online Casino Rankings</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Compare the best online casinos based on our expert reviews, user ratings, bonuses, and more.
        </p>
      </div>
      
      <CasinoList />
    </div>
  );
}