/** @type {import('tailwindcss').Config} */
export default {
	prefix: 'fxq-',
		important: '#flex-quiz-wrap',
		content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		],
		theme: {
			fontSize: {
				xs: ['10px', '17px'],
				sm: ['12px', '20px'],
				base: ['16px', '24px'],
				lg: ['18px', '21.94px'],
				xl: ['20px', '24.38px'],
				'2xl': ['24px', '29.26px'],
				'3xl': ['32px', '48px'],
				'4xl': ['48px', '58px'],
				'8xl': ['96px', '106px']
			},
			extend: {
				fontFamily: {
					palanquin: ['Palanquin', 'sans-serif'],
					montserrat: ['Montserrat', 'sans-serif'],
				},
				colors: {
					'primary': "var(--fx-primary)",
					'secondary': "var(--fx-secondary)",
					'tertiary': "var(--fx-tertiary)",
					'primary-box': "var(--fx-primary-box)",
					'secondary-box': "var(--fx-secondary-box)",
					'dark-grey': '#ADADAD',
					'light-grey': '#F7F7F7',
				},
				boxShadow: {
					'custom-inset-hover': 'inset 0 0 0 100px rgba(0, 0, 0, 0.2)',
				},
				backgroundImage: {
				},
				screens: {
					"wide": "1440px"
				},
				maxWidth: {
					'3xl': '790px'
				},
			},
	},
	plugins: [
	function ({ addUtilities }) {
		const newUtilities = {
			'ol.marker-text-xs > li::marker': {
				'font-size': '0.75rem', // Tailwind's `text-xs`
			},
			'ol.marker-text-sm > li::marker': {
				'font-size': '0.875rem', // Tailwind's `text-sm`
			},
			'ol.marker-text-base > li::marker': {
				'font-size': '1rem', // Tailwind's `text-base`
			},
			'ol.marker-text-lg > li::marker': {
				'font-size': '1.125rem', // Tailwind's `text-lg`
			},
			'ol.marker-text-xl > li::marker': {
				'font-size': '1.25rem', // Tailwind's `text-xl`
			},
			'ol.marker-text-2xl > li::marker': {
				'font-size': '1.5rem', // Tailwind's `text-2xl`
			},
			'ol.marker-font-bold > li::marker': {
				'font-weight': '600'
			}
		}

		addUtilities( newUtilities, ['responsive', 'hover'] )
	},
	],
	}
