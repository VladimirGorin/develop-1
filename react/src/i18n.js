// Example i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationRU from "./locales/ru/translation.json";

const resources = {
    en: {
        translation: translationEN,
    },
    ru: {
        translation: translationRU,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "ru", // Default language
    fallbackLng: "en", // Fallback language
    interpolation: {
        escapeValue: false, // React already safes from xss
    },
});

export default i18n;
