"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Globe, Award, DollarSign, Scale, Search } from "lucide-react";
import FeaturedCasino from "@/components/featured-casino";
import { Separator } from "@radix-ui/react-dropdown-menu";
import CasinoList from "./casino-list";
import BonusList from "./bonus-list";
import { useEffect, useState } from "react";
import { useLanguage } from "./language-context";

export default function Hero({ countryData, countriesData, featuredCasinoData, casinosData, bonusesData }: any) {
  const { t, setLanguage, setCountries } = useLanguage();

  useEffect(() => {
    setLanguage(countryData?.default_language);
  }, [countryData]);

  useEffect(() => {
    setCountries(countriesData);
  }, []);

  return (
    <div className="relative py-12 md:py-20 overflow-hidden hero-gradient">
      <div className="relative z-10 mx-10 mx-auto max-w-[1300px]">
        <div className="grid grid-cols-1 md:grid-cols-[55%_45%] items-center">
          <div className="text-center md:text-left px-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              {t.home.title} {countryData ? countryData.name : t.home.global}
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-6">
              {t.home.description} {countryData?.flag_emoji ? countryData.flag_emoji : ""}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-6">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                <Link href="/ranking" className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  {t.home.rankings}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10">
                <Link href="/legal-info" className="flex items-center">
                  <Scale className="mr-2 h-5 w-5" />
                  {t.home.legalInfo}
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-3 mt-6">
              <div className="feature-card p-2 text-center card-hover cursor-pointer">
                <Globe className="h-6 w-6 mx-auto mb-1 text-primary" />
                <h3 className="font-semibold text-sm">{t.home.global}</h3>
              </div>
              <div className="feature-card p-2 text-center card-hover cursor-pointer">
                <Award className="h-6 w-6 mx-auto mb-1 text-primary" />
                <h3 className="font-semibold text-sm">{t.home.reviews}</h3>
              </div>
              <div className="feature-card p-2 text-center card-hover cursor-pointer">
                <DollarSign className="h-6 w-6 mx-auto mb-1 text-primary" />
                <h3 className="font-semibold text-sm">{t.home.bonuses}</h3>
              </div>
              <div className="feature-card p-2 text-center card-hover cursor-pointer">
                <Search className="h-6 w-6 mx-auto mb-1 text-primary" />
                <h3 className="font-semibold text-sm">{t.home.comparisons}</h3>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <FeaturedCasino casino={featuredCasinoData} t={t.featuredCasino} />
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <Separator className="mx-auto max-w-5xl border-t border-gray-300 dark:border-gray-600 my-14" />

      <section className="container mx-auto from-primary/5 to-accent/5">
        <div className="container">
          <div className="text-center mb-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Casas de Apuestas Mejor Clasificadas</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
              Nuestros expertos han revisado cientos de casas de apuestas para ofrecerte las mejores opciones disponibles.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Featured Casino (First Place) */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">1</span>
                Top Casino Recomendado
              </h3>
              <CasinoList limit={1} displayStyle="featured" casinosByCountryData={casinosData} />
            </div>

            {/* Top 4 Casinos */}
            <div>
              <h3 className="text-xl font-bold mb-4">Otros Casinos Destacados</h3>
              <CasinoList limit={4} skip={1} displayStyle="compact" casinosByCountryData={casinosData} />
            </div>
          </div>

          <div className="text-center mt-6">
            <a href="/ranking" className="text-primary hover:text-primary/80 transition-colors">
              Ver todas las casas de apuestas →
            </a>
          </div>
        </div>
      </section>

      <Separator className="mx-auto max-w-5xl border-t border-gray-300 dark:border-gray-600 my-14" />

      <section className="container mx-auto from-primary/5 to-accent/5">
        <div className="text-center mb-4 animate-fade-in">
          <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{t.home.bonuses}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm mb-7">
            {t.home.subtitle}
          </p>

          <BonusList limit={3} bonusesData={bonusesData} />

          <div className="text-center mt-6">
            <a href="/bonuses" className="text-primary hover:text-primary/80 transition-colors">
              {t.home.bonuses} →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}