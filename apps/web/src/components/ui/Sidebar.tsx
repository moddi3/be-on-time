import { Avatar, AvatarImage } from '@/components/ui/Avatar';
import {
	Calculator,
	Calendar,
	ChevronDown,
	CreditCard,
	Info,
	LogOut,
	Settings,
	ShieldCheck,
	Slash,
	UserCog,
	Users,
} from 'lucide-react';
import { User } from 'next-auth';
import Link from 'next/link';
import React from 'react';

export const Sidebar: React.FC<{
	user: User;
}> = ({ user }) => {
	return (
		<div className="w-64 flex-none flex h-screen flex-col justify-between border-r bg-white">
			<div className="px-4 py-6">
				<Link href={'/'}>
					<span className="grid h-10 w-full place-content-center rounded-lg bg-gray-100 text-xl font-bold tracking-tighter hover:opacity-70">
						be on time.
					</span>
				</Link>
				<nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
					<a href="#" className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-700">
						<Settings className="h-5 w-5 opacity-75" />

						<span className="text-sm font-medium"> General </span>
					</a>

					<details className="group [&_summary::-webkit-details-marker]:hidden">
						<summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
							<div className="flex items-center gap-2">
								<Users className="h-5 w-5 opacity-75" />

								<span className="text-sm font-medium"> Teams </span>
							</div>

							<span className="shrink-0 transition duration-300 group-open:-rotate-180">
								<ChevronDown className="h-5 w-5" />
							</span>
						</summary>

						<nav aria-label="Teams Nav" className="mt-2 flex flex-col px-4">
							<a
								href="#"
								className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
								<Slash className="h-5 w-5 opacity-75" />

								<span className="text-sm font-medium"> Banned Users </span>
							</a>

							<a
								href="#"
								className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
								<Calendar className="h-5 w-5 opacity-75" />

								<span className="text-sm font-medium"> Calendar </span>
							</a>
						</nav>
					</details>

					<a
						href="#"
						className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
						<CreditCard className="h-5 w-5 opacity-75" />

						<span className="text-sm font-medium"> Billing </span>
					</a>

					<a
						href="#"
						className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
						<Calculator className="h-5 w-5 opacity-75" />

						<span className="text-sm font-medium"> Invoices </span>
					</a>

					<details className="group [&_summary::-webkit-details-marker]:hidden">
						<summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
							<div className="flex items-center gap-2">
								<UserCog className="h-5 w-5 opacity-75" />

								<span className="text-sm font-medium"> Account </span>
							</div>

							<span className="shrink-0 transition duration-300 group-open:-rotate-180">
								<ChevronDown className="h-5 w-5" />
							</span>
						</summary>

						<nav aria-label="Account Nav" className="mt-2 flex flex-col px-4">
							<a
								href="#"
								className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
								<Info className="h-5 w-5 opacity-75" />

								<span className="text-sm font-medium"> Details </span>
							</a>

							<a
								href="#"
								className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
								<ShieldCheck className="h-5 w-5 opacity-75" />

								<span className="text-sm font-medium"> Security </span>
							</a>

							<form action="/logout">
								<button
									type="submit"
									className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
									<LogOut className="h-5 w-5 opacity-75" />

									<span className="text-sm font-medium"> Logout </span>
								</button>
							</form>
						</nav>
					</details>
				</nav>
			</div>

			<div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
				<a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
					<Avatar>
						<AvatarImage src={user?.image || ''} alt={user?.name || ''} />
					</Avatar>
					{/* <img
							alt="Man"
							src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
							className="h-10 w-10 rounded-full object-cover"
						/> */}

					<div>
						<p className="text-xs">
							<strong className="block font-medium">{user?.name}</strong>

							<span>{user?.email}</span>
						</p>
					</div>
				</a>
			</div>
		</div>
	);
};
