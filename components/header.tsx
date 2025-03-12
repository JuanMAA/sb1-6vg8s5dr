"use client";

import { useState, useRef, useEffect } from "react";
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
import { Moon, Sun, Menu, X, Globe, Target, Award, DollarSign, Scale, Contact, BarChart2, Search } from "lucide-react";
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
    licenseComparator: "License Comparator",
    searchCountry: "Search country..."
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
    licenseComparator: "Comparador de Licencias",
    searchCountry: "Buscar país..."
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
    licenseComparator: "Comparateur de Licences",
    searchCountry: "Rechercher un pays..."
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
    licenseComparator: "Lizenz-Vergleicher",
    searchCountry: "Land suchen..."
  }
};

// Updated country data with correct URL keys that match the countryData object in the country page
const countryLinks = [
  { name: "España", code: "espana", flag: "🇪🇸" },
  { name: "Estados Unidos", code: "us", flag: "🇺🇸" },
  { name: "Reino Unido", code: "uk", flag: "🇬🇧" },
  { name: "México", code: "mexico", flag: "🇲🇽" },
  { name: "Argentina", code: "argentina", flag: "🇦🇷" },
  { name: "Colombia", code: "colombia", flag: "🇨🇴" },
  { name: "Chile", code: "chile", flag: "🇨🇱" },
  { name: "Perú", code: "peru", flag: "🇵🇪" }
];

export default function Header() {
  const { setTheme, theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  const countryMenuRef = useRef<HTMLDivElement>(null);
  const { t, setLanguage } = useLanguage();


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const changeLanguage = (langCode: string) => {
    setLanguage(langCode);
    // In a real app, you would implement language switching logic here
    localStorage.setItem('preferredLanguage', langCode);
  };

  // Filter countries based on search term
  const filteredCountries = countryLinks.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close country menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryMenuRef.current && !countryMenuRef.current.contains(event.target as Node)) {
        setIsCountryMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 pl-5">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">
              {process.env.NEXT_PUBLIC_SITE_NAME}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {t.home.home}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem hidden>
                <NavigationMenuTrigger
                  onClick={() => setIsCountryMenuOpen(true)}
                  className="flex items-center"
                >
                  <Globe className="mr-1 h-4 w-4" />
                  {t.home.countries}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div ref={countryMenuRef} className="w-[400px] p-4 md:w-[500px] lg:w-[600px]">
                    <div className="mb-4 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder={t.home.searchCountry}
                        className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <ul className="grid grid-cols-2 gap-3">
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((country) => (
                          <li key={country.code}>
                            <Link
                              href={`/countries/${country.code}`}
                              legacyBehavior
                              passHref
                              onClick={() => setIsCountryMenuOpen(false)}
                            >
                              <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                <div className="flex items-center">
                                  <span className="mr-2 text-xl">{country.flag}</span>
                                  <span>{country.name}</span>
                                </div>
                              </NavigationMenuLink>
                            </Link>
                          </li>
                        ))
                      ) : (
                        <li className="col-span-2 text-center py-4 text-muted-foreground">
                          No se encontraron países que coincidan con "{searchTerm}"
                        </li>
                      )}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/ranking" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Award className="mr-1 h-4 w-4" />
                    {t.home.rankings}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/bonuses" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <DollarSign className="mr-1 h-4 w-4" />
                    {t.home.bonuses}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <BarChart2 className="mr-1 h-4 w-4" />
                  {t.home?.comparisons}
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
                          <div className="text-sm font-medium leading-none">{t.home.casinoComparator}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Compara características, bonos y más entre diferentes casinos
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/comparador/licencias" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">{t.home.licenseComparator}</div>
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
                    {t.home.legalInfo}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Contact className="mr-1 h-4 w-4" />
                    {t.home.contact}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Globe className="h-5 w-5" />
                <span className="sr-only">{t.home.language}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex items-center ${currentLanguage === lang.code ? "bg-accent text-accent-foreground" : ""}`}
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
                {t.home.lightMode}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                {t.home.darkMode}
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
              {t.home.home}
            </Link>

            {/* Mobile Countries Dropdown */}
            <div className="py-2">
              <div className="flex items-center text-base font-medium mb-2">
                <Globe className="mr-2 h-5 w-5 text-primary" />
                {t.home.countries}
              </div>
              <div className="ml-7 mb-2">
                <input
                  type="text"
                  placeholder={t.home.searchCountry}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="ml-7 grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <Link
                      key={country.code}
                      href={`/countries/${country.code}`}
                      className="flex items-center py-1 px-2 rounded-md hover:bg-accent"
                      onClick={toggleMobileMenu}
                    >
                      <span className="mr-2">{country.flag}</span>
                      <span className="text-sm">{country.name}</span>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-2 text-muted-foreground text-sm">
                    No se encontraron países
                  </div>
                )}
              </div>
            </div>

            <Link href="/ranking" className="flex items-center py-2 text-base font-medium" onClick={toggleMobileMenu}>
              <Award className="mr-2 h-5 w-5 text-primary" />
              {t.home.rankings}
            </Link>
            <Link href="/bonuses" className="flex items-center py-2 text-base font-medium" onClick={toggleMobileMenu}>
              <DollarSign className="mr-2 h-5 w-5 text-primary" />
              {t.home.bonuses}
            </Link>
            <Link href="/casino-of-the-month" className="flex items-center py-2 text-base font-medium" onClick={toggleMobileMenu}>
              <Award className="mr-2 h-5 w-5 text-primary" />
              {t.home.casinoOfTheMonth}
            </Link>
            <Link href="/comparador/casinos" className="flex items-center py-2 text-base font-medium" onClick={toggleMobileMenu}>
              <BarChart2 className="mr-2 h-5 w-5 text-primary" />
              {t.home.casinoComparator}
            </Link>
            <Link href="/comparador/licencias" className="flex items-center py-2 text-base font-medium" onClick={toggleMobileMenu}>
              <Scale className="mr-2 h-5 w-5 text-primary" />
              {t.home.licenseComparator}
            </Link>
            <Link href="/legal-info" className="flex items-center py-2 text-base font-medium" onClick={toggleMobileMenu}>
              <Scale className="mr-2 h-5 w-5 text-primary" />
              {t.home.legalInfo}
            </Link>
            <Link href="/contact" className="flex items-center py-2 text-base font-medium" onClick={toggleMobileMenu}>
              <Contact className="mr-2 h-5 w-5 text-primary" />
              {t.home.contact}
            </Link>

            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Button variant="outline" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    {theme === "dark" ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                    {theme === "dark" ? t.lightMode : t.darkMode}
                  </Button>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium">{t.home.language}</div>
                  <div className="language-selector mt-1">
                    <select
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-background"
                      value={currentLanguage}
                      onChange={(e) => changeLanguage(e.target.value)}
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