import bundleAnalyzer from '@next/bundle-analyzer';

import { env } from './src/env/server.mjs';

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
	openAnalyzer: true,
});

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
	return withBundleAnalyzer(config);
}

export default defineNextConfig({
	reactStrictMode: true,
	swcMinify: true,
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
	// transpilePackages: ['@babel/preset-react', '@fullcalendar/common', '@fullcalendar/daygrid', '@fullcalendar/react'],
	images: {
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'tailwindui.com',
				pathname: '/img/**',
			},
		],
	},
	experimental: {
		newNextLinkBehavior: true,
	},
});
