export const useLanguageStore = create((set) => ({
    language: localStorage.getItem('preferredLanguage') || "es",
    setLanguage: (lang) => {
      localStorage.setItem('preferredLanguage', lang);
      set({ language: lang });
    }
  }));