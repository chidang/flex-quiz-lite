/** @type {import('tailwindcss').Config} */
export default {
	prefix: 'fxq-',
		content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		],
		theme: {
			fontSize: {
				xs: ['10px', '17px'],
				sm: ['12px', '20px'],
				base: ['14px', '19.5px'],
				lg: ['18px', '21.94px'],
				xl: ['20px', '24.38px'],
				'2xl': ['24px', '29.26px'],
				'3xl': ['28px', '50px'],
				'4xl': ['48px', '58px'],
				'8xl': ['96px', '106px']
			},
			extend: {
				fontFamily: {
					palanquin: ['Palanquin', 'sans-serif'],
					montserrat: ['Montserrat', 'sans-serif'],
				},
				colors: {
					'primary': "#007cba",
					'primary-2': "#007cba",
					'primary-8': "#f4c0855e",
					'underline-primary': "#dd6902",
					"brand": "#00aad0",
					"coral-red": "#FF6452",
					"slate-gray": "#6D6D6D",
					"pale-blue": "#F5F6FF",
					"white-400": "rgba(255, 255, 255, 0.80)"
				},
				boxShadow: {
					'3xl': '0 10px 40px rgba(0, 0, 0, 0.1)'
				},
				backgroundImage: {
				},
				screens: {
					"wide": "1440px"
				}
			},
	},
	plugins: [],
	}
