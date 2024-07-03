// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
const makei18n = new Promise(async (resolve, reject) => {
    try {
        await i18n
            .use(initReactI18next)
            .use(Backend)
            .use(LanguageDetector)
            .init({
                lng: 'en',
                fallbackLng: 'en',
                interpolation: {
                    escapeValue: false
                }
            })
        return resolve(i18n)
    } catch (error) {
        return reject(error)
    }
});

export default makei18n;
