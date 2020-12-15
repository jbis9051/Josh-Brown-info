import {NextApiRequest, NextApiResponse} from "next";
import {withRateLimit} from "../../server/helper/withRateLimit";
import config from "../../config";

function contact(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(404).end('404 Not Found');
        return;
    }
    const page = parseInt(req.query.page?.toString());
    if (isNaN(page) || page <= 0) {
        res.status(400).end('400 Bad Request');
        return;
    }
    return fetch(`https://dev.to/api/articles/me/published?page=${page}`, {
        headers: {
            'api-key': config.devto.apiKey
        }
    }).then(res => res.json()).then(articles => {
        res.status(200).json(articles);
    }).catch(() => {
        res.status(500).json([]);
    });
}

export default withRateLimit(contact, 50);
