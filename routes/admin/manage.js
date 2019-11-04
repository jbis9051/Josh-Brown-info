const express = require('express');
const router = express.Router();
const csrf = require('csurf-login-token');

const csrfProtection = csrf('token');

const Main = require('../../admin/Main');
const publish = require('../../admin/helpers/publish.js');

router.get('/', csrfProtection, async function (req, res, next) {
    const lu = await Main.get("last_publish_date");
    res.render('admin/manage/index', {
        lastUpdate: lu.value ? lu.date.toLocaleString() : "Never",
        csrfToken: req.csrfToken()
    });
});
router.get('/publish', csrfProtection, async function (req, res, next) {
    publish().then(() => res.redirect(`/admin/manage`))
});

module.exports = router;
