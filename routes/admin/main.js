var express = require('express');
var router = express.Router();

const csrf = require('csurf-login-token');
const csrfProtection = csrf('token');

const Post = require('../../admin/Post');
const Main = require('../../admin/Main');

router.get('/edit', csrfProtection, async function (req, res, next) {
    res.render('admin/main/edit', {
        aboutMeMarkdown: await Main.val("about"),
        welcomeMarkdown: await Main.val("welcome"),
        csrfToken: req.csrfToken()
    });
});
router.post('/save', csrfProtection, async function (req, res, next) {
    if (!req.body.aboutme || !req.body.welcome) {
        res.send('Invalid body');
    }
    await Main.val("about", req.body.aboutme);
    await Main.val("welcome", req.body.welcome);
    res.redirect(`/admin/posts`);
});
router.get('/preview', async function (req, res, next) {
    res.render('admin/main/preview', {posts: await Post.getAll()});
});

module.exports = router;
