import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import TranslationArabic from "./locale/TranslationArabic";
import TranslationEnglish from "./locale/TranslationEnglish";

i18n.use(initReactI18next).init({
    fallbackLng: "en",
    resources: {
        ar: {
            translation: TranslationArabic,
        },
        en: {
            translation: TranslationEnglish,
        },
    },
});
export default i18n;