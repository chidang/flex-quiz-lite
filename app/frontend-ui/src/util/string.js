export const capitalizeFirstLetter = (str) => {
	if ( ! str) {
		return str; // Return the original string if it is empty or undefined
	}

	// Capitalize the first letter of the first word and concatenate with the rest of the string
	return str.charAt( 0 ).toUpperCase() + str.slice( 1 ).toLowerCase();
}
