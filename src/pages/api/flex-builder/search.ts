import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'

const cors = Cors({
    methods: ['GET'],
})

/**
 * Middleware to enable cors for the get request
 * @param req 
 * @param res 
 * @param fn 
 * @returns 
 */

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

/**
 * Api enpoint for fetching schema based on path
 * @requires Query<string>(path) : `addresslist/0.1.0/addresslist`
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
    await runMiddleware(req, res, cors);
    const path = req.query.path;
    if (!path || Array.isArray(path)) {
        return res.status(400).json({ message: 'Query<string>:path is required' });
    }
    try {
        const schemaJson = await import(`./schema/${path}.json`).then(res => res.default);
        return res.status(200).json(schemaJson)
    } catch (err: any) {
        return res.status(500).json({ message: err.code ?? "Internal Server Error" });
    }
}
