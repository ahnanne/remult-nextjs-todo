/** "catch all" Next.js API route which will be used to handle all API requests */
import { NextApiRequest, NextApiResponse } from 'next';
import * as util from 'util'; // https://github.com/nodejs/node/blob/v17.0.0/lib/util.js
import { api } from '../../src/server/api';

const handler = async ( req: NextApiRequest, res: NextApiResponse ) => {
    await util.promisify( ( api as any ) )( req, res );
};

export default handler;