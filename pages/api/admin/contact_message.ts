import { NextApiRequest, NextApiResponse } from 'next';
import { withAuthRequired } from '../../../server/helper/withAuthRequired';
import Message from '../../../server/models/Message';

async function contactMessage(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(404).end('404 Not Found');
        return;
    }
    if (!req.query.id) {
        res.status(400).end('400 Bad Input');
        return;
    }
    const id = parseInt(req.query.id.toString(), 10);

    if (Number.isNaN(id)) {
        res.status(404).end('404 Not Found');
        return;
    }

    const message = await Message.query().findById(id);

    if (!message) {
        res.status(404).end('404 Not Found');
        return;
    }

    res.status(200).json({ contactMessage: message });
}

export default withAuthRequired(contactMessage);
