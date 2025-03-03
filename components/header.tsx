"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Moon, Sun, Menu, X, Globe, Target, Award, DollarSign, Scale, Contact, BarChart2, Gamepad } from "lucide-react";
import { useLanguage } from "./language-context";

const languages = [
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
];

const translations = {
  en: {
    home: "Home",
    countries: "Countries",
    rankings: "Rankings",
    bonuses: "Bonuses",
    legalInfo: "Legal Info",
    contact: "Contact",
    terms: "Terms & Conditions",
    language: "Language",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    casinoOfTheMonth: "Casino of the Month",
    comparators: "Comparators",
    casinoComparator: "Casino Comparator",
    licenseComparator: "License Comparator"
  },
  es: {
    home: "Inicio",
    countries: "Países",
    rankings: "Clasificaciones",
    bonuses: "Bonificaciones",
    legalInfo: "Info Legal",
    contact: "Contacto",
    terms: "Términos y Condiciones",
    language: "Idioma",
    darkMode: "Modo Oscuro",
    lightMode: "Modo Claro",
    casinoOfTheMonth: "Casino del Mes",
    comparators: "Comparadores",
    casinoComparator: "Comparador de Casinos",
    licenseComparator: "Comparador de Licencias"
  },
  fr: {
    home: "Accueil",
    countries: "Pays",
    rankings: "Classements",
    bonuses: "Bonus",
    legalInfo: "Info Légale",
    contact: "Contact",
    terms: "Termes et Conditions",
    language: "Langue",
    darkMode: "Mode Sombre",
    lightMode: "Mode Clair",
    casinoOfTheMonth: "Casino du Mois",
    comparators: "Comparateurs",
    casinoComparator: "Comparateur de Casinos",
    licenseComparator: "Comparateur de Licences"
  },
  de: {
    home: "Startseite",
    countries: "Länder",
    rankings: "Ranglisten",
    bonuses: "Boni",
    legalInfo: "Rechtliche Infos",
    contact: "Kontakt",
    terms: "Geschäftsbedingungen",
    language: "Sprache",
    darkMode: "Dunkelmodus",
    lightMode: "Hellmodus",
    casinoOfTheMonth: "Casino des Monats",
    comparators: "Vergleicher",
    casinoComparator: "Casino-Vergleicher",
    licenseComparator: "Lizenz-Vergleicher"
  }
};

// Updated country data with correct URL keys that match the countryData object in the country page
const countryLinks = [
  { name: "España", code: "espana" },
  { name: "Estados Unidos", code: "us" },
  { name: "Reino Unido", code: "uk" },
  { name: "México", code: "mexico" },
  { name: "Argentina", code: "argentina" },
  { name: "Colombia", code: "colombia" },
  { name: "Chile", code: "chile" },
  { name: "Perú", code: "peru" }
];

export default function Header() {
  const { setTheme, theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const { t, setLanguage, language } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 px-5">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">{process.env.NEXT_PUBLIC_SITE_NAME}</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {t.header.home}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>{t.header.countries}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {countryLinks.map((country) => (
                      <li key={country.name}>
                        <Link href={`/countries/${country.code}`} legacyBehavior passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            {country.name}
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/rankings" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Award className="mr-1 h-4 w-4" />
                    {t.header.rankings}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/bonuses" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <DollarSign className="mr-1 h-4 w-4" />
                    {t.header.bonuses}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <BarChart2 className="mr-1 h-4 w-4" />
                  {t.header.comparators}
                </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <li>
                        <Link href="/casino-of-the-month" legacyBehavior passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">{t.header.casinoOfTheMonth}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Casinos destacados por país con análisis detallados
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/comparador/casinos" legacyBehavior passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">{t.header.casinoComparator}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Compara características, bonos y más entre diferentes casinos
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/comparador/licencias" legacyBehavior passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">{t.header.licenseComparator}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Compara autoridades reguladoras y sus requisitos
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/legal-info" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Scale className="mr-1 h-4 w-4" />
                    {t.header.legalInfo}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Contact className="mr-1 h-4 w-4" />
                    {t.header.contact}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Globe className="h-5 w-5" />
                <span className="sr-only">{t.header.language}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem 
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`flex items-center ${language === lang.code ? "bg-accent text-accent-foreground" : ""}`}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                {t.header.lightMode}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                {t.header.darkMode}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link href="/" className="flex items-center py-2 text-base font-medium" onClick={toggleMobileMenu}>
              <Target className="mr-2 h-5 w-5 text-primary" />
              {t.header.home}
            </Link>
            <Link href="/countries" className="flex items-center py-2 text-base font-medium" onClick={toggleMobileMenu}>
              <Globe className="mr-2 h-5 w-5 text-primary" />
              {t.header.countries}
            </Link>
            <Link href="/rankings" className="flex items-center py-2 text-base font-medium" onClick={toggleMobileMenu}>
              <Award className="mr-2 h-5 w-5 text-primary" />
              {t.header.rankings}
            </Link>
            <Link href="/bonuses" className="flex items-center py-2 text-base font-medium" onClick={toggleMobileMenu}>
              <DollarSign className="mr-2 h-5 w-5 text-primary" />
              {t.header.bonuses}
            </Link>
            <Link href="/casino-of-the-month" className="flex items-center py-2 text-base font-medium" onClick={toggleMobileMenu}>
              <Award className="mr-2 h-5 w-5 text-primary" />
              {t.header.casinoOfTheMonth}
            </Link>
            <Link href="/comparador/casinos" className="flex items-center py-2 text-base font-medium" onClick={toggleMobileMenu}>
              <BarChart2 className="mr-2 h-5 w-5 text-primary" />
              {t.header.casinoComparator}
            </Link>
            <Link href="/comparador/licencias" className="flex items-center py-2 text-base font-medium" onClick={toggleMobileMenu}>
              <Scale className="mr-2 h-5 w-5 text-primary" />
              {t.header.licenseComparator}
            </Link>
            <Link href="/legal-info" className="flex items-center py-2 text-base font-medium" onClick={toggleMobileMenu}>
              <Scale className="mr-2 h-5 w-5 text-primary" />
              {t.header.legalInfo}
            </Link>
            <Link href="/contact" className="flex items-center py-2 text-base font-medium" onClick={toggleMobileMenu}>
              <Contact className="mr-2 h-5 w-5 text-primary" />
              {t.header.contact}
            </Link>
            
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Button variant="outline" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    {theme === "dark" ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                    {theme === "dark" ? t.header.lightMode : t.header.darkMode}
                  </Button>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium">{t.header.language}</div>
                  <div className="language-selector mt-1">
                    <select 
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-background"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}