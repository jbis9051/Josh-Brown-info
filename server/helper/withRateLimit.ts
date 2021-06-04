import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

interface Cache {
    [ip: string]: {
        lastEntryMs: number;
        removalTimeout: NodeJS.Timeout;
    };
}

const cache: Cache = {};

export default function withRateLimit(
    handler: NextApiHandler,
    RATE_LIMIT: number
) {
    return (req: NextApiRequest, res: NextApiResponse) => {
        const ip =
            (req.headers['x-forwarded-header'] as string | undefined) ||
            req.connection.remoteAddress;
        if (!ip) {
            console.error('Could not get IP');
            res.status(500).end('500 Internal Server Error');
            return;
        }
        if (cache[ip]) {
            res.status(429).end('429 Too Many Requests');
            return;
        }
        cache[ip] = {
            lastEntryMs: Date.now(),
            removalTimeout: setTimeout(() => delete cache[ip], RATE_LIMIT),
        };
        // eslint-disable-next-line consistent-return
        return handler(req, res);
    };
}
