const conn = require('./helpers/mysql.js').create();

class Main {
    static val(key, value) {
        if (value === undefined) {
            return Main._getValue(key);
        } else {
            return Main._setValue(key, value);
        }
    }

    static async _getValue(key) {
        const [[result]] = await conn.execute("SELECT `value` FROM `main` WHERE `col` = ?", [key]);
        return result.value;
    }

    static _setValue(key, value) {
        return conn.execute("UPDATE `main` SET `value` = ? WHERE `col` = ?", [value, key]);
    }
}

module.exports = Main;
