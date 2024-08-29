import GlobalData from './globalData';
import { __ as translate } from '@wordpress/i18n';

export const apiBaseUrl = () => {
	return GlobalData.apiBaseUrl;
}

// data input:
// {
// hello: [null, 'bonjour']
// }

// data outputt:
// {
// hello: ['bonjour']
// }

export const transformJson = (data) => {
	const newJson          = {};
	for (const key in data) {
		if (data.hasOwnProperty( key )) {
			// Check if the value is an array and has more than one element
			if (Array.isArray( data[key] ) && data[key].length > 1) {
				// Remove the first element (null) from the array
				newJson[key] = data[key].slice( 1 );
			} else {
				// If it's not an array or doesn't need transformation, copy as is
				newJson[key] = data[key];
			}
		}
	}
	return newJson;
};

export const adjustI18nData = (data) => {

	const transformedData = {};

	// Iterate over each key-value pair in the original object
	for (const key in data) {
		if (data.hasOwnProperty( key )) {
			// Convert the string value to an array containing that string
			transformedData[key] = [data[key]];
		}
	}
	return transformedData;
};

export const __ = ($str, $textDomain) => {
	return translate( $str );
}
