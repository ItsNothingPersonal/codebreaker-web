import { contentPath, skeleton } from '@skeletonlabs/skeleton/plugin';
import * as themes from '@skeletonlabs/skeleton/themes';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}', contentPath(import.meta.url, 'svelte')],

	theme: {
		extend: {}
	},

	plugins: [
		typography,
		skeleton({
			themes: [themes.cerberus]
		})
	]
} satisfies Config;
