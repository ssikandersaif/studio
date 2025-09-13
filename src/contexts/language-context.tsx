"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Language = 'en' | 'ml' | 'hi' | 'ta' | 'te' | 'kn' | 'bn' | 'mr' | 'gu' | 'pa';
export type Translations = {
  [key in Language]?: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (translations: Translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (translations: Translations) => {
    return translations[language] || translations['en'] || '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const languageNameMap: Record<Language, string> = {
    en: 'English',
    ml: 'മലയാളം (Malayalam)',
    hi: 'हिन्दी (Hindi)',
    ta: 'தமிழ் (Tamil)',
    te: 'తెలుగు (Telugu)',
    kn: 'ಕನ್ನಡ (Kannada)',
    bn: 'বাংলা (Bengali)',
    mr: 'मराठी (Marathi)',
    gu: 'ગુજરાતી (Gujarati)',
    pa: 'ਪੰਜਾਬੀ (Punjabi)',
};
