import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar as traduções
import enTranslation from '../../public/locales/en/translation.json';
import esTranslation from '../../public/locales/es/translation.json';
import ptTranslation from '../../public/locales/pt/translation.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  es: {
    translation: esTranslation,
  },
  pt: {
    translation: ptTranslation,
  },
};

i18n
  .use(LanguageDetector) // Detecta o idioma do navegador
  .use(initReactI18next) // Passa o i18n para react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Idioma padrão caso não detecte
    debug: false,
    interpolation: {
      escapeValue: false, // React já faz escape por padrão
    },
  });

export default i18n;
