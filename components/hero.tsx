import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Globe, Award, DollarSign, Scale, Search } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative py-12 md:py-20 overflow-hidden hero-gradient">
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Información de Apuestas a Nivel Mundial
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-6">
            Tu guía completa sobre casas de apuestas, bonos y regulaciones legales.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              <Link href="/rankings" className="flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Ver Clasificaciones
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10">
              <Link href="/legal-info" className="flex items-center">
                <Scale className="mr-2 h-5 w-5" />
                Información Legal
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-4 gap-2 mt-6">
            <div className="feature-card p-2 text-center card-hover">
              <Globe className="h-6 w-6 mx-auto mb-1 text-primary" />
              <h3 className="font-semibold text-sm">Global</h3>
            </div>
            <div className="feature-card p-2 text-center card-hover">
              <Award className="h-6 w-6 mx-auto mb-1 text-primary" />
              <h3 className="font-semibold text-sm">Reseñas</h3>
            </div>
            <div className="feature-card p-2 text-center card-hover">
              <DollarSign className="h-6 w-6 mx-auto mb-1 text-primary" />
              <h3 className="font-semibold text-sm">Bonos</h3>
            </div>
            <div className="feature-card p-2 text-center card-hover">
              <Search className="h-6 w-6 mx-auto mb-1 text-primary" />
              <h3 className="font-semibold text-sm">Comparativas</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}