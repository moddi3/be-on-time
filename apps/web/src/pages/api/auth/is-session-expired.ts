import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../server/db/client';

const getSessionToken = async (req: NextApiRequest, res: NextApiResponse) => {
	const token = req.query.token as string;

	if (!token || typeof token !== 'string') {
		res.json({ expired: true });
		return;
	}

	const dbToken = await prisma?.session.findUnique({
		where: {
			sessionToken: token,
		},
	});
	if (!dbToken || !dbToken.sessionToken) {
		res.json({ expired: true });
		return;
	}

	const expired = new Date(dbToken?.expires || '').getTime() < Date.now();

	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Cache-Control', 's-maxage=1000000000, stale-while-revalidate');

	res.json({
		expired,
	});
};

export default getSessionToken;
