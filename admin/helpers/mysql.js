const mysql = require('mysql2');
const config = require('../../config.js');

const pool = mysql.createPool(config.mysql);

module.exports = {
    create: () => pool.promise()
};
