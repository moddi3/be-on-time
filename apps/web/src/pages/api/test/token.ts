import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const secret = process.env.NEXTAUTH_SECRET ? process.env.NEXTAUTH_SECRET : 'NEXTAUTH_SECRET not found!';

	const decoded_token_from_request = await getToken({ req, secret });

	res.status(200).json({
		secret,
		decoded_token_from_request,
	});
}
