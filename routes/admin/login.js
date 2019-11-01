const express = require('express');
const router = express.Router();

const User = require('../../admin/User');

router.get('/', function (req, res, next) {
    res.render('admin/login', {errorMessage: null, redir: encodeURIComponent(req.query.r || "/admin")});
});
router.post('/', async function (req, res, next) {
    if (!req.body.username || !req.body.password) {
        res.render('admin/login', {
            errorMessage: "Username and Password Don't Match",
            redir: encodeURIComponent(req.query.r || "/admin")
        });
        return;
    }
    const user = await User.FromCredentials(req.body.username, req.body.password);
    if (!user) {
        res.render('admin/login', {
            errorMessage: "Username and Password Don't Match",
            redir: encodeURIComponent(req.query.r || "/admin")
        });
        return;
    }
    const token = await user.addToken();
    const date = new Date();
    date.setHours(date.getHours() + 24);
    res.cookie("token", token, {
        expires: date,
        httpOnly: true,
        path: '/admin',
        secure: true,
        sameSite: 'Strict',
    });
    res.redirect(req.query.r || "/admin");
    user.removeTokensOldThan(1);
});

module.exports = router;
