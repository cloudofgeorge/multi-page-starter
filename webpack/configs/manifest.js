const { rootPath } = require('../utils.js');

const manifestConfig = {
	name: 'Progressive Web App',
	short_name: 'PWA',
	description: 'Awesome Progressive Web App',
	background_color: '#ffffff',
	theme_color: '#ffffff',
	crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
	orientation: 'portrait',
	display: 'standalone',
	start_url: '/',
	inject: true,
	fingerprints: true,
	ios: false,
	icons: [
		{
			src: rootPath('src/assets/img/pwa_icon/pwa.png'),
			sizes: [96, 128, 192, 256, 384, 512, 1024], // multiple sizes
			destination: '/assets/favicon',
		},
	],
};

module.exports = manifestConfig;
