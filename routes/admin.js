var express = require('express');
var router = express.Router();

const User = require('../admin/User');
const Post = require('../admin/Post');
const ContactForm = require('../admin/ContactForm');

router.get('/login', function (req, res, next) {
    res.render('admin/login', {errorMessage: null, redir: encodeURIComponent(req.query.r || "/admin")});
});
router.post('/login', async function (req, res, next) {
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

router.get('/logout', async function (req, res, next) {
    await User.removeToken(req.cookies.token);
    res.redirect("/admin/login")
});

router.get('/posts', async function (req, res, next) {
    res.render('admin/posts/list', {posts: await Post.getAll()});
});
router.get('/posts/new', async function (req, res, next) {
    const post = await Post.new();
    res.redirect(`/admin/posts/${post.id}/edit`);
});
router.get('/posts/:id/edit', async function (req, res, next) {
    const post = await Post.FromId(req.params.id);
    res.render('admin/posts/edit', {post: post});
});
router.post('/posts/:id/save', async function (req, res, next) {
    const post = await Post.FromId(req.params.id);
    if (!post) {
        res.send("Error: Could Not Find Post with that ID");
        return;
    }
    if (req.body.display === undefined) {
        req.body.display = false;
    }
    if (req.body.tags) {
        req.body.tags = req.body.tags.split(",").map(tag => tag.trim());
    }
    if (typeof req.body["button_name[]"] === "string") {
        req.body["button_name[]"] = [req.body["button_name[]"]];
        req.body["button_link[]"] = [req.body["button_link[]"]];
        req.body["button_id[]"] = [req.body["button_id[]"]];
        req.body["button_data[]"] = [req.body["button_data[]"]];
    }
    if (req.body["button_name[]"].length !== req.body["button_link[]"].length || req.body["button_id[]"].length !== req.body["button_data[]"].length || req.body["button_name[]"].length !== req.body["button_id[]"].length) {
        res.send("Error: Lengths don't match");
        return;
    }
    const orNull = (val) => val ? val : null;
    req.body.buttons = [];
    req.body["button_name[]"].forEach((val, index) => {
        req.body.buttons.push({
            content: req.body["button_name[]"][index],
            hyperlink: orNull(req.body["button_link[]"][index]),
            js_id: orNull(req.body["button_id[]"][index]),
            data_custom: orNull(req.body["button_data[]"][index]),
        });
    });
    await post.update(req.body);
    res.redirect(`/admin/posts`);
});
router.get('/posts/:id/delete', async function (req, res, next) {
    const post = await Post.FromId(req.params.id);
    await post.delete();
    res.redirect("/admin/posts");
});

router.get('/form/contact', async function (req, res, next) {
    res.render('admin/contact/list', {items: await ContactForm.getAll()});
});
router.get('/form/contact/responses/:id', async function (req, res, next) {
    const response = await ContactForm.FromId(req.params.id);
    console.log(response);
    res.render('admin/contact/view', {item: response});
});

module.exports = router;
