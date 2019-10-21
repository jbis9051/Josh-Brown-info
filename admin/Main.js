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

    static _newValue(key, value) {
        return conn.execute("INSERT INTO `main` (`col`,`value`) VALUES (?,?)", [key, value]);
    }

    static _delete(key) {
        return conn.execute("DELETE FROM `main` WHERE `col` = ?", [key]);
    }

    static async updateDate(key, value) {
        if (value === undefined) {
            value = await Main._getValue(key);
        }
        await Main._delete(key);
        return await Main._newValue(key, value);
    }


    static async get(key) {
        const [[result]] = await conn.execute("SELECT * FROM `main` WHERE `col` = ?", [key]);
        return result;
    }
}

module.exports = Main;
