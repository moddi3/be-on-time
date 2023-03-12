// src/pages/_app.tsx
import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { Analytics } from '@vercel/analytics/react';

import { trpc } from '../utils/trpc';

import '../styles/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({
	subsets: ['latin'],
	fallback: [
		'ui-sans-serif',
		'system-ui',
		'-apple-system',
		'BlinkMacSystemFont',
		'"Segoe UI"',
		'Roboto',
		'"Helvetica Neue"',
		'Arial',
		'"Noto Sans"',
		'sans-serif',
		'"Apple Color Emoji"',
		'"Segoe UI Emoji"',
		'"Segoe UI Symbol"',
		'"Noto Color Emoji"',
	],
});

const MyApp: AppType<{ session: Session }> = ({ Component, pageProps: { session, ...pageProps } }) => {
	return (
		<>
			<style jsx global>{`
				html {
					font-family: ${inter.style.fontFamily};
				}
			`}</style>

			<SessionProvider session={session}>
				<Component {...pageProps} />
			</SessionProvider>
			<Analytics />
		</>
	);
};

export default trpc.withTRPC(MyApp);
