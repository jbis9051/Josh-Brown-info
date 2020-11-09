import mysql from "mysql2/promise";
import config from "../config";

const connectionPromise = mysql.createConnection(config.mysql);

interface TokenData {
    token: string,
    user_id: number
}

export class User {
    id: number;
    username: string;
    type: number;
    password: string;
    date: Date;

    constructor(id: number, username: string, password: string, type: number, date: Date) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.type = type;
        this.date = date;
    }

    static async getToken(token: string): Promise<TokenData | undefined> {
        const conn = await connectionPromise;
        // @ts-ignore
        const [[row]] = await conn.execute("SELECT token, user_id FROM `tokens` WHERE `token` = ? AND `date` >=  CURDATE() - INTERVAL 1 DAY", [token]);
        return row;
    }

    static async getPassword(username: string) {
        const conn = await connectionPromise;
        // @ts-ignore
        const [[row]] = await conn.execute("SELECT password FROM `users` WHERE username = ?", [username]);
        if (!row) {
            return;
        }
        return row.password;
    }

    static async getUserFromUsername(username: string) {
        const conn = await connectionPromise;
        // @ts-ignore
        const [[row]] = await conn.execute("SELECT * FROM `users` WHERE username = ?", [username]);
        if (!row) {
            return;
        }
        return new User(row.id, row.username, row.password, row.type, row.date);
    }

    static async getUserFromId(id: number) {
        const conn = await connectionPromise;
        // @ts-ignore
        const [[row]] = await conn.execute("SELECT * FROM `users` WHERE id = ?", [id]);
        if (!row) {
            return;
        }
        return new User(row.id, row.username, row.password, row.type, row.date);
    }

    static async insertToken(token: string, user: User) {
        const conn = await connectionPromise;
        await conn.execute("INSERT INTO tokens (token, user_id) VALUES (?, ?)", [token, user.id]);
    }

    static async removeOldTokens(days: number) {
        const conn = await connectionPromise;
        return conn.execute("DELETE FROM tokens WHERE date <= CURDATE() - INTERVAL ? DAY", [days]);
    }

    static async removeToken(token: string) {
        const conn = await connectionPromise;
        return conn.execute("DELETE FROM tokens WHERE token = ?", [token]);
    }
}
