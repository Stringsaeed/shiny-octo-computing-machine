import I18n from 'i18n-js';
import Moment from 'moment';
import memoize from 'lodash.memoize';
import {I18nManager} from 'react-native';
// import {findBestAvailableLanguage} from 'react-native-localize';

const translationGetters = {
	ar: () => require('./ar.json'),
	en: () => require('./en.json'),
};

export const translate = memoize(
	(key, config) => I18n.t(key, config),
	(key, config) => (config ? key + JSON.stringify(config) : key),
);

export const setI18nConfig = () => {
	const fallBack = {language: 'ar', isRTL: true};
	const {language, isRTL} = fallBack;
	translate.cache.clear();

	I18nManager.forceRTL(isRTL);

	I18n.translations = {[language]: translationGetters[language]()};
	I18n.locale = language;
	Moment.locale(language);
	return language;
};
