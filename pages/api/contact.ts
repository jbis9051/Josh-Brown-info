import { NextApiRequest, NextApiResponse } from 'next';
import withRateLimit from '../../server/helper/withRateLimit';
import ContactMessageService from '../../server/services/ContactMessageService';

async function contact(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(404).end('404 Not Found');
        return;
    }
    if (
        !['name', 'email', 'message'].every(
            (key) => req.body[key] && typeof req.body[key] === 'string'
        ) ||
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            req.body.email
        )
    ) {
        res.status(400).end('400 Bad Request');
    }
    const ip =
        (req.headers['x-forwarded-header'] as string | undefined) ||
        req.connection.remoteAddress;
    await ContactMessageService.addContactMessage(
        ip as string,
        req.body.name,
        req.body.email,
        req.body.message
    );

    res.status(200).end('200 Ok');
}

export default withRateLimit(contact, 1000);
