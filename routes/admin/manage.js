var express = require('express');
var router = express.Router();
const csrf = require('csurf-login-token');

const path = require('path');
const fs = require('fs-extra');
const ejs = require('ejs');
const showdown = require('showdown');

const csrfProtection = csrf('token');
const converter = new showdown.Converter();

const Post = require('../../admin/Post');
const Main = require('../../admin/Main');

router.get('/', csrfProtection, async function (req, res, next) {
    const lu = await Main.get("last_publish_date");
    res.render('admin/manage/index', {
        lastUpdate: lu.value ? lu.date.toLocaleString() : "Never",
        csrfToken: req.csrfToken()
    });
});
router.get('/publish', csrfProtection, async function (req, res, next) {
    const genPath = (name) => path.join(__dirname, '..', '..', 'views', 'gen', name);
    const pathToProjectComponent = path.join(__dirname, '..', '..', 'views', 'admin', 'components', 'project.ejs');
    const aboutmePromise = fs.writeFile(genPath('aboutmeHTML.ejs'), converter.makeHtml(await Main.val("about")));
    const welcomePromise = fs.writeFile(genPath('welcomeHTML.ejs'), converter.makeHtml(await Main.val("welcome")));
    const posts = (await Post.getAll()).filter(post => post.display);
    let resumeHTML = "";
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        resumeHTML += await ejs.renderFile(pathToProjectComponent, {post: post, i: i});
    }
    const resumePromise = fs.appendFile(genPath('resumeHTML.ejs'), resumeHTML);
    Promise.all([aboutmePromise, welcomePromise, resumePromise, Main.updateDate("last_publish_date", "1")]).then(() => res.redirect(`/admin/manage`))
});

module.exports = router;
