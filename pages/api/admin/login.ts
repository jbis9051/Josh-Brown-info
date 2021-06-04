import { NextApiRequest, NextApiResponse } from 'next';
import UserService from '../../../server/services/UserService';
import User from '../../../server/models/User';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(404).end('404 Not Found');
        return;
    }

    function isInputValid() {
        if (!req.body.username || !req.body.password) {
            return false;
        }
        return (
            typeof req.body.username === 'string' &&
            typeof req.body.password === 'string'
        );
    }

    if (!isInputValid()) {
        res.status(400).end('400 Bad Input');
        return;
    }
    if (
        !(await UserService.isValidCredentials(
            req.body.username,
            req.body.password
        ))
    ) {
        res.status(401).json({ error: 'Invalid Username or Password' });
        return;
    }
    const user = await User.query().findOne({ username: req.body.username });
    if (!user) {
        res.status(401).json({ error: 'An error occurred' });
        return;
    }
    const token = await UserService.generateToken(user);
    res.status(200).json({ token });
}
