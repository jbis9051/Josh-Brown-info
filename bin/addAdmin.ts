import User from "../server/models/User";
import bcrypt from "bcrypt";
import {destroy} from "../server/models/setup";

const username = process.env.USER;
const password = process.env.PASSWORD;

if (!username || !password) {
    throw new Error('Username and Password required');
}

const hash = bcrypt.hashSync(password, 10);
User.query().insert({username, password: hash}).then(destroy);
