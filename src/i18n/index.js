import i18n from 'i18n-js';
import Moment from 'moment';
import {memoize} from 'lodash';
import {I18nManager} from 'react-native';
import {findBestAvailableLanguage} from 'react-native-localize';

const translationGetters = {
  ar: () => require('./ar.json'),
  en: () => require('./en.json'),
};

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

export const setI18nConfig = () => {
  const {language, isRTL} = findBestAvailableLanguage(['ar', 'en']);

  translate.cache.clear();
  I18nManager.forceRTL(isRTL);
  i18n.translations = {[language]: translationGetters[language]()};
  i18n.local = language;
  Moment.local(language);
};
