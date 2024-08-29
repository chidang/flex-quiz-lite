import GlobalData from './globalData';

export const apiBaseUrl = () => {
	return GlobalData.apiBaseUrl;
}

export const getPostTypeNamesById = (id, postTypesOptions) => {
	var matchingKeys              = [];

	for (var key in postTypesOptions) {
		if (postTypesOptions[key] == id) {
			// Capitalize the first letter of the key
			var capitalizedKey = key.charAt( 0 ).toUpperCase() + key.slice( 1 );
			matchingKeys.push( capitalizedKey );
		}
	}

	// Join the matching keys with a comma and return
	return matchingKeys.join( ', ' );
}

// Temporary function to fix wp.i18n issue
export const __ = (text, textDomain) => {
	return text;
}

export const findMenuParent = (menu, activeMenuItem) => {
	function recursiveSearch(menu, activeMenuItem, parentKeys) {
		for (const item of menu) {
			if (item.key === activeMenuItem) {
				return parentKeys;
			}
			if (item.children) {
				const result = recursiveSearch( item.children, activeMenuItem, [...parentKeys, item.key] );
				if (result) {
					return result;
				}
			}
		}
		return null;
	}

	return recursiveSearch( menu, activeMenuItem, [] ) || [];
}

export const iconStyles = { cursor: 'pointer', color: 'var(--fx-primary)' };

export const generateSlug = (title) => {
	return title
		.toLowerCase()
		.replace( /[^\w\s-]/g, '' )
		.trim()
		.replace( /[\s_-]+/g, '-' )
		.replace( /^-+|-+$/g, '' );
};
