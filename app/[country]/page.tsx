import Hero from '@/components/hero';
import FeaturedCasino from '@/components/featured-casino';
import CasinoList from '@/components/casino-list';
import BonusList from '@/components/bonus-list';
import CountryList from '@/components/country-list';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Globe, Award, DollarSign, Scale, Search } from "lucide-react";
import { getCountries, getCountryByCode, getFeaturedCasino } from '@/lib/api';
import { supabase } from '@/lib/supabase';

export const revalidate = 172800; // 2 days in seconds

const translations = {
  en: {
    title: "Betting Information",
    subtitle: "Your complete guide to betting houses, bonuses, and legal regulations.",
    rankings: "View Rankings",
    legalInfo: "Legal Information",
    global: "Global",
    reviews: "Reviews",
    bonuses: "Bonuses",
    comparisons: "Comparisons"
  },
  es: {
    title: "Información de Apuestas",
    subtitle: "Tu guía completa sobre casas de apuestas, bonos y regulaciones legales.",
    rankings: "Ver Clasificaciones",
    legalInfo: "Información Legal",
    global: "Global",
    reviews: "Reseñas",
    bonuses: "Bonos",
    comparisons: "Comparativas"
  },
  fr: {
    title: "Informations sur les paris",
    subtitle: "Votre guide complet sur les maisons de paris, les bonus et les réglementations légales.",
    rankings: "Voir les classements",
    legalInfo: "Informations légales",
    global: "Global",
    reviews: "Avis",
    bonuses: "Bonus",
    comparisons: "Comparaisons"
  },
  de: {
    title: "Wettinformationen",
    subtitle: "Ihr vollständiger Leitfaden zu Wettbüros, Boni und gesetzlichen Vorschriften.",
    rankings: "Ranglisten anzeigen",
    legalInfo: "Rechtsinformationen",
    global: "Global",
    reviews: "Bewertungen",
    bonuses: "Boni",
    comparisons: "Vergleiche"
  }
};

async function getCountryData(country: string): Promise<any> {
  try {
    const countryData = await getCountryByCode(country);
    if (!countryData) {
      console.error('Error fetching countryData:', countryData);
    }

    return { countryData };
  } catch (err) {
    console.error('Error:', err);
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
    console.error('Error:', err);
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

  return (
    <Hero countryData={countryData} featuredCasinoData={featuredCasinoData} />
  );
}

export async function generateStaticParams() {
  const countries = await getCountries();

  return countries.map(country => ({
    country: country.code
  }));
}
