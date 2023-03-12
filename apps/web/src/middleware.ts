import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	let production = process.env.NODE_ENV === 'production';
	let cookieName = production ? '__Secure-next-auth.session-token' : 'next-auth.session-token';

	let sessionToken = request.cookies.get(cookieName)?.value || '';
	let baseUrl = request.nextUrl.origin;

	let result = await fetch(`${baseUrl}/api/auth/is-session-expired?token=${sessionToken}`);
	const data = await result.json();

	console.log('response', data);
	console.log('cookies', request.cookies.toString());
	console.log('sessionToken', sessionToken);

	if (data.expired === true) {
		return NextResponse.redirect(baseUrl);
	}

	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: '/dashboard',
};
