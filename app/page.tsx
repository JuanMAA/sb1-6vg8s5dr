import Hero from '@/components/hero';
import FeaturedCasino from '@/components/featured-casino';
import CasinoList from '@/components/casino-list';
import BonusList from '@/components/bonus-list';
import CountryList from '@/components/country-list';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
          <div className="lg:col-span-2">
            <FeaturedCasino />
          </div>
          <div className="lg:col-span-1">
            <Card className="h-full border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Selecciona tu País
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CountryList />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Separator className="max-w-5xl mx-auto my-4" />
      
      <section className="py-12">
        <div className="container">
          <div className="text-center mb-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Casas de Apuestas Mejor Clasificadas</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
              Nuestros expertos han revisado cientos de casas de apuestas para ofrecerte las mejores opciones disponibles.
            </p>
          </div>
          
          <CasinoList limit={3} />
          
          <div className="text-center mt-6">
            <a href="/rankings" className="text-primary hover:text-primary/80 transition-colors">
              Ver todas las casas de apuestas →
            </a>
          </div>
        </div>
      </section>
      
      <section className="py-10 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container">
          <div className="text-center mb-4 animate-fade-in">
            <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Mejores Bonos de Apuestas</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
              Encuentra los bonos y promociones de apuestas más generosos disponibles actualmente en línea.
            </p>
          </div>
          
          <BonusList limit={3} />
          
          <div className="text-center mt-6">
            <a href="/bonuses" className="text-primary hover:text-primary/80 transition-colors">
              Ver todos los bonos →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}