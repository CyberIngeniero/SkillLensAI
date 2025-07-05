import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Importar traducciones
import esTranslations from './locales/es.json';
import caTranslations from './locales/ca.json';
import enTranslations from './locales/en.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: esTranslations,
      },
      ca: {
        translation: caTranslations,
      },
      en: {
        translation: enTranslations,
      },
    },
    lng: 'es',
    fallbackLng: 'es',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;