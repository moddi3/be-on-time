import dayjs from 'dayjs';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';

import { Navbar } from '@/components/ui/Navbar';
import { getServerAuthSession } from '@/server/common/get-server-auth-session';
import { Sidebar } from '@/components/ui/Sidebar';

export const getServerSideProps: GetServerSideProps<{ session: Session | null }> = async (ctx) => {
	return {
		props: {
			session: await getServerAuthSession(ctx),
		},
	};
};

const Dashboard: NextPage = () => {
	const { data: session } = useSession();
	const user = session!.user;

	return (
		<div className="h-full flex">
			<Sidebar user={user} />

			<main className="flex-1 min-w-0 overflow-auto">
				<Navbar user={user} />
			</main>
		</div>
	);
};

export default Dashboard;
