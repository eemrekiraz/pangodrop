import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import tr from "./locales/tr.json";

const detector = new LanguageDetector();

detector.addDetector({
  name: "navigator-tr-priority",
  lookup() {
    if (typeof navigator === "undefined") {
      return undefined;
    }

    const language = navigator.language?.toLowerCase() || "";
    return language.startsWith("tr") ? "tr" : "en";
  }
});

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      tr: { translation: tr }
    },
    fallbackLng: "en",
    supportedLngs: ["en", "tr"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["navigator-tr-priority"],
      caches: ["localStorage"]
    }
  });

export default i18n;
