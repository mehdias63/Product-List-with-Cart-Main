/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./public/**/*.html', './src/**/*.{html,js}'],
	theme: {
		fontFamily: {
			red: ['Red Hat Text'],
		},
		extend: {
			colors: {
				red: '#C73B0F',
				green: '#1EA575',
				'rose-900': '#260F08',
				'rose-500': '#87635A',
				'rose-400': '#AD8A85',
				'rose-300': '#CAAFA7',
				'rose-100': '#F5EEEC',
				'rose-50': '#FCF8F6',
			},
		},
	},
	plugins: [],
}
