var express = require('express');
var router = express.Router();

const mainRouter = require('./admin/main.js');
const loginRouter = require('./admin/login.js');
const postRouter = require('./admin/posts.js');
const formRouter = require('./admin/form.js');

const User = require('../admin/User');

router.use('/login', loginRouter);

router.get('/logout', async function (req, res, next) {
    if (req.cookies.token) {
        await User.removeToken(req.cookies.token);
    }
    res.redirect("/admin/login")
});


router.all(['/', '/*'], async function (req, res, next) {
    if (!req.cookies.token || typeof req.cookies.token !== "string") {
        res.redirect('/admin/login?r=' + encodeURIComponent(req.originalUrl));
        return;
    }
    req.user = await User.FromToken(req.cookies.token);
    if (!req.user) {
        res.redirect('/admin/login?r=' + encodeURIComponent(req.originalUrl));
        return;
    }
    next();
});


/* GET admin page. */
router.get('/', function (req, res, next) {
    res.render('admin/dashboard');
});

router.use('/main', mainRouter);
router.use('/posts', postRouter);
router.use('/form', formRouter);

module.exports = router;
