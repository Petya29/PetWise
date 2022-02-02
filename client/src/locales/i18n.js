import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translationsEn } from "./en";
import { translationsRu } from "./ru";
import { translationsPl } from "./pl";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: translationsEn },
            ru: { translation: translationsRu },
            pl: { translation: translationsPl },
        },
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;