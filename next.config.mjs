/** @type {import('next').NextConfig} */
const nextConfig = {
	// Enable React strict mode for better development experience
	reactStrictMode: true,
	
	// Optimize images
	images: {
		formats: ['image/webp', 'image/avif'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},

	// Remove experimental CSS optimization for now to avoid build issues
	experimental: {
		// optimizeCss: true, // Removed to fix critters dependency issue
	},

	// Environment variables validation
	env: {
		CUSTOM_KEY: process.env.CUSTOM_KEY,
	},

	// Headers for security and performance
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
				],
			},
		];
	},

	// Optimize for static export if needed
	trailingSlash: false,
	
	// PoweredByHeader
	poweredByHeader: false,
};

export default nextConfig;
