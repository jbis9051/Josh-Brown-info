var express = require('express');
var router = express.Router();

const config = require('../config.js');
const mailgun = require('mailgun-js')(config.mailgun);


router.all('/', async function (req, res, next) {
    const conn = await require("mysql2/promise").createConnection(config.mysql);
    res.setHeader('Content-Type', 'application/json');
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const errors = [];
    if (!validateName(req.body.name)) {
        errors.push("Invalid Name");
    }
    if (!validateEmail(req.body.email)) {
        errors.push("Invalid Email");
    }
    if (!validateReason(req.body.reason)) {
        errors.push("Invalid Reason");
    }
    if (errors.length === 0) {
        const data = {
            from: 'Contact From <API@joshbrown.info>',
            to: 'josh9051@gmail.com',
            subject: 'Contact Form Submission',
            text:
                `Name: ${req.body.name}
            
Message:    

${req.body.message}           
`
        };
        conn.execute('INSERT INTO contact_form_data (ip,name,email,reason,message) VALUE (?,?,?,?,?)', [ip, req.body.name, req.body.email, req.body.reason, req.body.message]).then(e => res.send({status: "success"}));
        mailgun.messages().send(data, (error, body) => {
            if (error) {
                console.error(error);
            }
        });
    } else {
        res.send({status: "fail", errors: errors});
    }
});

function validateName(name) {
    return /^[a-zA-Z.&, ']+$/.test(name);
}

function validateEmail(email) {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(String(email).toLowerCase());
}

const reasonsWhitelist = [
    "employment",
    "questions",
    "suggestions",
    "other",
];

function validateReason(reason) {
    return reasonsWhitelist.includes(reason);
}

module.exports = router;
