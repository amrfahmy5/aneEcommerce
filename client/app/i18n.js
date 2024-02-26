import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import global_ar from "./translations/ar/global.json";
import global_en from "./translations/en/global.json";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: global_en },
      ar: { translation: global_ar },
    },
    lng: "en",

    fallbackLng: "en",
    debug: true,

    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;
