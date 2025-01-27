import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from "react-i18next";
import i18n from "i18next";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    debug: true,
    load: "languageOnly",
    fallbackLng: "en",
    detection: {
      order: [
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
        "htmlTag",
        "subdomain",
        "path",
      ],
      caches: ["cookie"],
    },
    backend: {
      loadPath: '../public/locale/{{lng}}/translation.json',
    },
  });