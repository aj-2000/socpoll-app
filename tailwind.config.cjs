/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	// daisyui: {
	// 	themes: [
	// 		{
	// 			socpoll: {
	// 				orange: '#ff9f1c',
	// 				yellow: '#f5cb5c',
	// 				white: '#ffffff',
	// 				'light-green': '#cbf3f0',
	// 				purple: '#9b5de5',
	// 				pink: '#f15bb5',
	// 				'light-yellow': '#fee440',
	// 				blue: '#00bbf9',
	// 				red: '#ea3546',
	// 				cream: '#ffffea',
	// 				'light-gray': '#cfdbd5',
	// 				black: '#242423',
	// 				'light-pink': '#f8f2f3',
	// 				'cream-black': '#333533',
	// 				'cream-white': '#e8eddf'
	// 			}
	// 		}
	// 	]
	// },
	daisyui: {
		themes: [
			{
				lofi: {
					...require('daisyui/src/colors/themes')['[data-theme=lofi]'],
					border: '#323333'
				}
			}
		]
	},
	plugins: [require('daisyui')]
}
