const express = require('express');
const router = express.Router();

const csrf = require('csurf-login-token');
const csrfProtection = csrf('token');

const Post = require('../../admin/Post');
const Main = require('../../admin/Main');

router.get('/edit', csrfProtection, async function (req, res, next) {
    res.render('admin/main/edit', {
        top: await Main.val("aboutme_top"),
        bottom: await Main.val("aboutme_bottom"),
        csrfToken: req.csrfToken()
    });
});
router.post('/save', csrfProtection, async function (req, res, next) {
    if (!req.body.top || !req.body.bottom) {
        res.send('Invalid body');
    }
    await Main.val("aboutme_top", req.body.top);
    await Main.val("aboutme_bottom", req.body.bottom);
    res.redirect(`/admin/main/edit`);
});
router.get('/preview', async function (req, res, next) {
    res.render('admin/main/preview', {posts: await Post.getDisplayed()});
});

module.exports = router;
