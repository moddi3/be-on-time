// // middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// // This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, response: NextResponse) {
	let sessionToken = request.cookies.get('next-auth.session-token')?.value || '';
	let baseUrl = request.nextUrl.origin;

	let result = await fetch(`${baseUrl}/api/auth/is-session-expired?token=${sessionToken}`);
	const { expired } = await result.json();
	if (!expired) return NextResponse.next();

	return NextResponse.redirect(new URL('/', baseUrl));
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: '/dashboard',
};