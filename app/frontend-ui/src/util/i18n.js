import { setLocaleData } from '@wordpress/i18n';
import { adjustI18nData } from './common'

const loadTranslations = (locale) => {
	if (locale === 'en') {
		resolve( false ); // Resolve immediately for 'en' locale
		return;
	}
	setLocaleData( adjustI18nData( flexQuizI18n ) );
};

export { loadTranslations };
