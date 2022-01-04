module.exports = {
	/**
	 *	@description Some developers want to be able to publish a new service worker and have it control already-open web pages as soon as soon as it activates, which will not happen by default.
	 */
	clientsClaim: true,
	skipWaiting: true,
	runtimeCaching: [
		{
			urlPattern: /\.(?:jpe?g|png|gif|svg|ico|webp|avif)$/,

			// Apply a cache-first strategy.
			handler: 'CacheFirst',

			options: {
				cacheName: 'images',
				expiration: {
					maxEntries: 100,
				},
			},
		},
	],
};
