import {I18nManager} from 'react-native';
import memoize from 'lodash.memoize';
import i18n from 'i18n-js';
import {} from 'react-native-localize';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat

const translationGetters = {
  ar: () => require('./ar.json'),
  en: () => require('./en.json'),
};

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

export const setI18nConfig = changedLang => {
  const defaultLang = {language: 'en', isRTL: false};
  const {language, isRTL} = changedLang || defaultLang;

  translate.cache.clear();

  I18nManager.forceRTL(isRTL);

  i18n.translations = {[language]: translationGetters[language]()};
  i18n.local = language;
};
