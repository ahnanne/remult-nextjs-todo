/** "catch all" Next.js API route which will be used to handle all API requests */
import { NextApiRequest, NextApiResponse } from 'next';
import * as util from 'util'; // https://github.com/nodejs/node/blob/v17.0.0/lib/util.js
import { api } from '../../src/server/api';
import { expressjwt } from 'express-jwt';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await util.promisify(expressjwt({
    secret: process.env[ 'JWT_SECRET' ] || "my secret",
    credentialsRequired: false,
    algorithms: ['HS256'] // jsonwebtoken에서 사용되는 디폴트 알고리즘
  }) as any)(req, res);
  await util.promisify((api as any))(req, res);
};

export default handler;