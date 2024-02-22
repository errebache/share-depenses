import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/properties.json';
import translationFR from './locales/fr/properties.json';

const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // langue par défaut
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  });

export default i18n;