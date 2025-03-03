"use client";
import { createContext, useContext, useEffect, useState } from "react";
const translations = {
  "en": {
    "home": {
      "title": "Betting Information",
      "subtitle": "Your complete guide to betting houses, bonuses, and legal regulations.",
      "rankings": "View Rankings",
      "legalInfo": "Legal Information",
      "global": "Global",
      "reviews": "Reviews",
      "bonuses": "Bonuses",
      "comparisons": "Comparisons",
      "description": "Complete guide to betting houses, bonuses, and legal regulations",
    },
    "header": {
      "home": "Home",
      "countries": "Countries",
      "rankings": "Rankings",
      "bonuses": "Bonuses",
      "legalInfo": "Legal Info",
      "contact": "Contact",
      "terms": "Terms & Conditions",
      "language": "Language",
      "darkMode": "Dark Mode",
      "lightMode": "Light Mode",
      "casinoOfTheMonth": "Casino of the Month",
      "comparators": "Comparators",
      "casinoComparator": "Casino Comparator",
      "licenseComparator": "License Comparator"
    },
    "featuredCasino": {
      "title": "Featured Casino",
      "description": "A handpicked selection of the best online casinos available.",
      "casinoName": "Casino Name",
      "casinoDescription": "Casino Description",
      "features": {
        "mobileApp": "Mobile App",
        "liveStreaming": "Live Streaming",
        "cashOut": "Cash Out",
        "liveBetting": "Live Betting"
      },
      "rating": "Rating",
      "visitSite": "Visit Site",
      "by": "Featured by",
      "welcomeBonus": "Welcome Bonus Available",
      "viewMore": "View More"
    }
  },
  "es": {
    "home": {
      "title": "Información de Apuestas",
      "subtitle": "Tu guía completa sobre casas de apuestas, bonos y regulaciones legales.",
      "rankings": "Ver Clasificaciones",
      "legalInfo": "Información Legal",
      "global": "Global",
      "reviews": "Reseñas",
      "bonuses": "Bonos",
      "comparisons": "Comparativas",
      "description": "Guía completa sobre casas de apuestas, bonos y regulaciones legales"
    },
    "header": {
      "home": "Inicio",
      "countries": "Países",
      "rankings": "Clasificaciones",
      "bonuses": "Bonificaciones",
      "legalInfo": "Info Legal",
      "contact": "Contacto",
      "terms": "Términos y Condiciones",
      "language": "Idioma",
      "darkMode": "Modo Oscuro",
      "lightMode": "Modo Claro",
      "casinoOfTheMonth": "Casino del Mes",
      "comparators": "Comparadores",
      "casinoComparator": "Comparador de Casinos",
      "licenseComparator": "Comparador de Licencias"
    },
    "featuredCasino": {
      "title": "Casino Destacado",
      "description": "Una selección especial de los mejores casinos en línea disponibles.",
      "casinoName": "Nombre del Casino",
      "casinoDescription": "Descripción del Casino",
      "features": {
        "mobileApp": "App Móvil",
        "liveStreaming": "Streaming en Vivo",
        "cashOut": "Cash Out",
        "liveBetting": "Apuestas en Vivo"
      },
      "rating": "Calificación",
      "visitSite": "Visitar Sitio",
      "by": "Destacado por",
      "welcomeBonus": "Bono de Bienvenida Disponible",
      "viewMore": "Ver Más"
    }
  },
  "fr": {
    "home": {
      "title": "Informations sur les paris",
      "subtitle": "Votre guide complet sur les maisons de paris, les bonus et les réglementations légales.",
      "rankings": "Voir les classements",
      "legalInfo": "Informations légales",
      "global": "Global",
      "reviews": "Avis",
      "bonuses": "Bonus",
      "comparisons": "Comparaisons",
      "description": "Guía completa sobre casas de apuestas, bonos y regulaciones legales"
    },
    "header": {
      "home": "Accueil",
      "countries": "Pays",
      "rankings": "Classements",
      "bonuses": "Bonus",
      "legalInfo": "Info Légale",
      "contact": "Contact",
      "terms": "Termes et Conditions",
      "language": "Langue",
      "darkMode": "Mode Sombre",
      "lightMode": "Mode Clair",
      "casinoOfTheMonth": "Casino du Mois",
      "comparators": "Comparateurs",
      "casinoComparator": "Comparateur de Casinos",
      "licenseComparator": "Comparateur de Licences"
    },
    "featuredCasino": {
      "title": "Casino Vedette",
      "description": "Une sélection choisie des meilleurs casinos en ligne disponibles.",
      "casinoName": "Nom du Casino",
      "casinoDescription": "Description du Casino",
      "features": {
        "mobileApp": "Application Mobile",
        "liveStreaming": "Diffusion en Direct",
        "cashOut": "Retrait Cash",
        "liveBetting": "Paris en Direct"
      },
      "rating": "Évaluation",
      "visitSite": "Visitez le site",
      "by": "Sélectionné par",
      "welcomeBonus": "Bonus de Bienvenue Disponible",
      "viewMore": "Voir Plus"
    }
  },
  "de": {
    "home": {
      "title": "Wettinformationen",
      "subtitle": "Ihr vollständiger Leitfaden zu Wettbüros, Boni und gesetzlichen Vorschriften.",
      "rankings": "Ranglisten anzeigen",
      "legalInfo": "Rechtsinformationen",
      "global": "Global",
      "reviews": "Bewertungen",
      "bonuses": "Boni",
      "comparisons": "Vergleiche",
      "description": "Guía completa sobre casas de apuestas, bonos y regulaciones legales"
    },
    "header": {
      "home": "Startseite",
      "countries": "Länder",
      "rankings": "Ranglisten",
      "bonuses": "Boni",
      "legalInfo": "Rechtliche Infos",
      "contact": "Kontakt",
      "terms": "Geschäftsbedingungen",
      "language": "Sprache",
      "darkMode": "Dunkelmodus",
      "lightMode": "Hellmodus",
      "casinoOfTheMonth": "Casino des Monats",
      "comparators": "Vergleicher",
      "casinoComparator": "Casino-Vergleicher",
      "licenseComparator": "Lizenz-Vergleicher"
    },
    "featuredCasino": {
      "title": "Ausgewähltes Casino",
      "description": "Eine handverlesene Auswahl der besten Online-Casinos, die verfügbar sind.",
      "casinoName": "Casino Name",
      "casinoDescription": "Casino Beschreibung",
      "features": {
        "mobileApp": "Mobile App",
        "liveStreaming": "Live-Streaming",
        "cashOut": "Cash Out",
        "liveBetting": "Live-Wetten"
      },
      "rating": "Bewertung",
      "visitSite": "Website besuchen",
      "by": "Ausgewählt von",
      "welcomeBonus": "Willkommensbonus Verfügbar",
      "viewMore": "Mehr anzeigen"
    }
  }
}

// Definimos el tipo del contexto
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: typeof translations["en"]; // Traducciones dinámicas
}

// Creamos el contexto con valores iniciales
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<string>(() => {
    return typeof window !== "undefined" ? localStorage.getItem("preferredLanguage") || "es" : "es";
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("preferredLanguage", language);
    }
  }, [language]);

  // Traducciones dinámicas según el idioma seleccionado
  const t = translations[language as keyof typeof translations] || translations.es;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook para consumir el contexto
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe usarse dentro de un LanguageProvider");
  }
  return context;
};
