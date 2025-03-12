"use client";
import { createContext, useContext, useEffect, useState } from "react";
const translations = {
  "en": {
    "topRanked": {
      title: "Top Ranked Betting Sites",
      description: "Our experts have reviewed hundreds of betting sites to bring you the best options available in your region.",
      welcomeBonus: "Welcome Bonus:",
      features: "Features:",
      readReview: "Read Review",
      visitSite: "Visit Site",
      viewAll: "View All",
      bettingSites: "Betting Sites",
      licensing: "Licensing:",
      licenseNumber: "License #:",
      userReviews: "User Reviews:",
      positiveRating: "Positive Rating:",
      topRecommended: "Top Recommended Casino",
      otherCasinos: "Other Recommended Casinos",
      viewAllBettingSites: "View all betting sites →",
    },
    "global": {
      "withdrawalTime": "Withdrawal Time",
      "minimunDeposit": "Minimum Deposit",
      "welcomeBonus": "Welcome Bonus",
      "bettingSites": "Betting Sites",
      "licensing": "Licensing",
      "userReviews": "User Reviews",
      "positiveRating": "Positive Rating",
      "paymentInformation": "Payment Information",
      "details": "Details"
    },
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
      searchCountry: "Search country...",
    },
    "footer": {
      "about": "Your trusted source for information on sports betting and online casinos worldwide.",
      "email": "contact@betsafe.com",
      "phone": "+34 900 123 456",
      "quickLinks": "Quick Links",
      "home": "Home",
      "rankings": "Rankings",
      "bonuses": "Best Bonuses",
      "casinoOfTheMonth": "Casino of the Month",
      "legalInfo": "Legal Information",
      "contact": "Contact",
      "comparators": "Comparators",
      "casinoComparator": "Casino Comparator",
      "licenseComparator": "License Comparator",
      "topCountries": "Top Countries",
      "spain": "Spain",
      "usa": "United States",
      "uk": "United Kingdom",
      "mexico": "Mexico",
      "legal": "Legal",
      "terms": "Terms and Conditions",
      "privacy": "Privacy Policy",
      "disclaimer": "Disclaimer",
      "responsibleGambling": "Responsible Gambling",
      "rights": "All rights reserved.",
      "disclaimerText": "This website is for informational purposes only. We do not promote or encourage gambling. Please gamble responsibly and in accordance with local laws and regulations."
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
    "topRanked": {
      "title": "Casas de Apuestas Mejor Clasificadas",
      "description": "Nuestros expertos han revisado cientos de casas de apuestas para ofrecerte las mejores opciones disponibles en tu región.",
      "welcomeBonus": "Bono de Bienvenida:",
      "features": "Características:",
      "readReview": "Leer Reseña",
      "visitSite": "Visitar Sitio",
      "viewAll": "Ver Todas",
      "bettingSites": "Casas de Apuestas",
      "licensing": "Licencias:",
      "licenseNumber": "Licencia #:",
      "userReviews": "Reseñas de Usuarios:",
      "positiveRating": "Valoración Positiva:",
      "topRecommended": "Top Casino Recomendado",
      "otherCasinos": "Otros Casinos Destacados",
      "viewAllBettingSites": "Ver todas las casas de apuestas →",
    },
    "global":{
      "withdrawalTime": "Tiempo de Retiro",
      "minimunDeposit": "Depósito Mínimo",
      "welcomeBonus": "Bono de Bienvenida",
      "bettingSites": "Casas de Apuestas",
      "licensing": "Licencias",
      "userReviews": "Reseñas de Usuarios",
      "positiveRating": "Valoración Positiva",
      "paymentInformation": "Información de Pagos:",
      "details": "Detalles"
    },
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
      searchCountry: "Buscar país...",
      casinoComparatorDescription: "Compara las características de los casinos en línea más populares por pais.",
    },
    "footer": {
      "about": "Tu fuente confiable de información sobre apuestas deportivas y casinos online en todo el mundo.",
      "email": "contacto@betsafe.com",
      "phone": "+34 900 123 456",
      "quickLinks": "Enlaces Rápidos",
      "home": "Inicio",
      "rankings": "Clasificaciones",
      "bonuses": "Mejores Bonos",
      "casinoOfTheMonth": "Casino del Mes",
      "legalInfo": "Información Legal",
      "contact": "Contacto",
      "comparators": "Comparadores",
      "casinoComparator": "Comparador de Casinos",
      "licenseComparator": "Comparador de Licencias",
      "topCountries": "Países Principales",
      "spain": "España",
      "usa": "Estados Unidos",
      "uk": "Reino Unido",
      "mexico": "México",
      "legal": "Legal",
      "terms": "Términos y Condiciones",
      "privacy": "Política de Privacidad",
      "disclaimer": "Aviso Legal",
      "responsibleGambling": "Juego Responsable",
      "rights": "Todos los derechos reservados.",
      "disclaimerText": "Este sitio web es solo para fines informativos. No promovemos ni fomentamos las apuestas. Por favor, apuesta de manera responsable y de acuerdo con las leyes y regulaciones locales."
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
    "topRanked": {
      title: "Sites de Paris les Mieux Classés",
      description: "Nos experts ont examiné des centaines de sites de paris pour vous proposer les meilleures options disponibles dans votre région.",
      welcomeBonus: "Bonus de Bienvenue:",
      features: "Caractéristiques:",
      readReview: "Lire l'Avis",
      visitSite: "Visiter le Site",
      viewAll: "Voir Tout",
      bettingSites: "Sites de Paris",
      licensing: "Licences:",
      licenseNumber: "Licence #:",
      userReviews: "Avis d'Utilisateurs:",
      positiveRating: "Évaluation Positive:",
      topRecommended: "Meilleur Casino Recommandé",
      otherCasinos: "Autres Casinos Recommandés",
      viewAllBettingSites: "Voir tous les sites de paris →",
    },
    "global": {
      "withdrawalTime": "Temps de Retrait",
      "minimunDeposit": "Dépôt Minimum",
      "welcomeBonus": "Bonus de Bienvenue",
      "bettingSites": "Sites de Paris",
      "licensing": "Licences",
      "userReviews": "Avis d'Utilisateurs",
      "positiveRating": "Évaluation Positive",
      "paymentInformation": "Informations de Paiement",
      "details": "Détails"
    },  
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
    "footer": {
      "about": "Votre source fiable d'informations sur les paris sportifs et les casinos en ligne dans le monde entier.",
      "email": "contact@betsafe.com",
      "phone": "+34 900 123 456",
      "quickLinks": "Liens Rapides",
      "home": "Accueil",
      "rankings": "Classements",
      "bonuses": "Meilleurs Bonus",
      "casinoOfTheMonth": "Casino du Mois",
      "legalInfo": "Informations Légales",
      "contact": "Contact",
      "comparators": "Comparateurs",
      "casinoComparator": "Comparateur de Casinos",
      "licenseComparator": "Comparateur de Licences",
      "topCountries": "Pays Principaux",
      "spain": "Espagne",
      "usa": "États-Unis",
      "uk": "Royaume-Uni",
      "mexico": "Mexique",
      "legal": "Légal",
      "terms": "Termes et Conditions",
      "privacy": "Politique de Confidentialité",
      "disclaimer": "Avertissement",
      "responsibleGambling": "Jeu Responsable",
      "rights": "Tous droits réservés.",
      "disclaimerText": "Ce site Web est uniquement à des fins informatives. Nous ne promouvons ni n'encourageons les jeux d'argent. Veuillez jouer de manière responsable et conformément aux lois et réglementations locales."
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
    "topRanked": {
      title: "Bestbewertete Wettanbieter",
      description: "Unsere Experten haben Hunderte von Wettanbietern bewertet, um Ihnen die besten Optionen in Ihrer Region zu präsentieren.",
      welcomeBonus: "Willkommensbonus:",
      features: "Funktionen:",
      readReview: "Bewertung Lesen",
      visitSite: "Website Besuchen",
      viewAll: "Alle Anzeigen",
      bettingSites: "Wettanbieter",
      licensing: "Lizenzen:",
      licenseNumber: "Lizenz #:",
      userReviews: "Benutzerbewertungen:",
      positiveRating: "Positive Bewertung:",
      topRecommended: "Top Empfohlenes Casino",
      otherCasinos: "Andere Empfohlene Casinos",
      viewAllBettingSites: "Alle Wettanbieter anzeigen →",
    },
    "global": {
      "withdrawalTime": "Auszahlungszeit",
      "minimunDeposit": "Mindesteinzahlung",
      "welcomeBonus": "Willkommensbonus",
      "bettingSites": "Wettanbieter",
      "licensing": "Lizenzen",
      "userReviews": "Benutzerbewertungen",
      "positiveRating": "Positive Bewertung",
      "paymentInformation": "Zahlungsinformationen",
      "details": "Details"
    },
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
    },
    "footer": {
      "about": "Ihre vertrauenswürdige Quelle für Informationen über Sportwetten und Online-Casinos weltweit.",
      "email": "contact@betsafe.com",
      "phone": "+34 900 123 456",
      "quickLinks": "Schnellzugriff",
      "home": "Startseite",
      "rankings": "Ranglisten",
      "bonuses": "Beste Boni",
      "casinoOfTheMonth": "Casino des Monats",
      "legalInfo": "Rechtliche Informationen",
      "contact": "Kontakt",
      "comparators": "Vergleiche",
      "casinoComparator": "Casino-Vergleicher",
      "licenseComparator": "Lizenz-Vergleicher",
      "topCountries": "Top-Länder",
      "spain": "Spanien",
      "usa": "Vereinigte Staaten",
      "uk": "Vereinigtes Königreich",
      "mexico": "Mexiko",
      "legal": "Rechtliches",
      "terms": "Allgemeine Geschäftsbedingungen",
      "privacy": "Datenschutzrichtlinie",
      "disclaimer": "Haftungsausschluss",
      "responsibleGambling": "Verantwortungsbewusstes Spielen",
      "rights": "Alle Rechte vorbehalten.",
      "disclaimerText": "Diese Website dient nur zu Informationszwecken. Wir fördern oder ermutigen kein Glücksspiel. Bitte spielen Sie verantwortungsbewusst und gemäß den örtlichen Gesetzen und Vorschriften."
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
  setCountries: (countries: any[]) => void;
  countries: any[];
  t: typeof translations["en"]; // Traducciones dinámicas
}

// Creamos el contexto con valores iniciales
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<string>(() => {
    return typeof window !== "undefined" ? localStorage.getItem("preferredLanguage") || "es" : "es";
  });

  const [countries, setCountries] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("preferredLanguage", language);
    }
  }, [language]);

  // Traducciones dinámicas según el idioma seleccionado
  const t = translations[language as keyof typeof translations] || translations.es;

  return (
    <LanguageContext.Provider value={{ countries, setCountries, language, setLanguage, t }}>
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
