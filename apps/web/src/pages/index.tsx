import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Balancer from 'react-wrap-balancer';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Session } from 'next-auth';
import { signIn, signOut, useSession } from 'next-auth/react';

import { Avatar, AvatarImage } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

import { getServerAuthSession } from '../server/common/get-server-auth-session';

export const getServerSideProps: GetServerSideProps<{ session: Session | null }> = async (ctx) => {
	const session = await getServerAuthSession(ctx);
	return {
		props: {
			session,
		},
	};
};

export default function Index() {
	return (
		<motion.div
			className={'isolate bg-white h-full overflow-hidden '}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}>
			<div className="h-full">
				<div className="text-center">
					<div className="py-80 text-slate-900">
						<Balancer as="h1" className={'text-6xl font-bold tracking-tighter ] sm:text-4xl'}>
							be on time.
						</Balancer>
						<p className="text-lg leading-8 italic">streamline your daily agenda.</p>
						<Auth />
					</div>
				</div>
			</div>
		</motion.div>
	);
}

function Auth() {
	const router = useRouter();
	const { data: session } = useSession();

	const [loading, setLoading] = useState(false);

	const loginOrProceed = () => {
		setLoading(true);
		return session ? router.push('/dashboard') : signIn('google', { callbackUrl: '/dashboard' });
	};

	const userName = session?.user?.name || '';

	return (
		<div className="flex justify-center gap-4 mt-4">
			{!session && (
				<Button disabled={loading} variant="default" size="sm" onClick={loginOrProceed}>
					{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
					<span className="ml-1">get started</span>
					<ArrowRight className="ml-2 h-4 w-4" />
				</Button>
			)}
			{session && (
				<div className="flex flex-col">
					<Button disabled={loading} variant="default" size="sm" onClick={loginOrProceed}>
						{loading ? (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						) : (
							<Avatar className="h-4 w-4 mr-2 ml-0.5">
								<AvatarImage src={session.user?.image || ''} alt={userName} />
							</Avatar>
						)}
						continue <ArrowRight className="ml-2 h-4 w-4" />
					</Button>
					<a className="mt-2" onClick={() => signOut()}>
						logout
					</a>
				</div>
			)}
		</div>
	);
}
