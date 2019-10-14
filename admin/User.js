const bcrypt = require('bcrypt');
const crypto = require("crypto");


const conn = require('./helpers/mysql.js').create();

class User {
    constructor(row) {
        if (row) {
            this.id = row["id"];
            this.type = row["type"];
            this.date = row["date"];
        }
    }

    static async FromQuery(query) {
        const [[row]] = await query;
        if (!row) {
            return null;
        }
        return new User(row);
    }

    static FromId(id) {
        return User.FromQuery(conn.execute("SELECT * FROM `users` WHERE id = ?", [id]));
    }

    static FromUsername(username) {
        return User.FromQuery(conn.execute("SELECT * FROM `users` WHERE username = ?", [username]));
    }

    static async usernameExists(username) {
        return !!(await User.FromUsername(username));
    }

    static async signUp(username, password, type) {
        const hash = await bcrypt.hash(password, 10);
        const [results] = await conn.execute("INSERT INTO `users` (`username`,`password`,`type`) VALUES (?,?,?)", [username, hash, type]);
        return await User.FromId(results.insertId);
    }

    static async FromToken(token) {
        if (!token) {
            return null;
        }
        const [[row]] = await conn.execute("SELECT token,user_id FROM `tokens` WHERE `token` = ? AND `date` >=  CURDATE() - INTERVAL 1 DAY", [token]);
        if (!row || token.length !== row.token.length || !(await crypto.timingSafeEqual(Buffer.from(token), Buffer.from(row.token)))) {
            return null;
        }
        return await User.FromId(row.user_id);
    }

    removeAllTokens() {
        return conn.execute("DELETE FROM tokens WHERE user_id = ?", [this.id]);
    }

    static removeToken(token) {
        return conn.execute("DELETE FROM tokens WHERE token = ?", [token]);
    }

    removeTokensOldThan(days) {
        return conn.execute("DELETE FROM tokens WHERE user_id = ? AND date <= CURDATE() - INTERVAL ? DAY", [this.id, days]);
    }

    async addToken() {
        const token = crypto.randomBytes(64).toString('hex');
        await conn.execute("INSERT INTO tokens (token, user_id) VALUES (?, ?)", [token, this.id]);
        return token;
    }

    static async authenticateUser(username, password) {
        const [[row]] = await conn.execute("SELECT password FROM `users` WHERE username = ?", [username]);
        if (!row) {
            return false;
        }
        return bcrypt.compare(password, row.password);
    }

    /**
     *
     * @param username
     * @param password
     * @return {Promise<null|User|boolean>}
     * @constructor
     */
    static async FromCredentials(username, password) {
        if (await User.authenticateUser(username, password)) {
            return User.FromUsername(username);
        }
        return false;
    }

    changePassword(password) {
        return Promise.all([this.removeAllTokens(), this._updatePassword(password)])
    }

    async _updatePassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return conn.execute("UPDATE `users` SET `password` = ? WHERE id = ?", [hash, this.id]);
    }

    _updateEmail(username) {
        return conn.execute("UPDATE `users` SET `username` = ? WHERE id = ?", [username, this.id]);
    }

    changeEmail(username) {
        return this._updateEmail(username).then(_ => this.email = username);
    }


}

module.exports = User;
