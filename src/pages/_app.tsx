// src/pages/_app.tsx
import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { Analytics } from '@vercel/analytics/react';

import { trpc } from '../utils/trpc';

import '../styles/globals.css';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
	return (
		<>
			<SessionProvider session={session}>
				<Component {...pageProps} />
			</SessionProvider>
			<Analytics />
		</>
	);
};

export default trpc.withTRPC(MyApp);
