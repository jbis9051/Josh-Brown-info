var express = require('express');
var router = express.Router();

const Post = require('../../admin/Post');
const csrf = require('csurf-login-token');
const csrfProtection = csrf('token');

router.get('/', async function (req, res, next) {
    res.render('admin/posts/list', {posts: await Post.getAll()});
});
// TODO: Add ability to reorder posts
router.get('/new', async function (req, res, next) {
    const post = await Post.new();
    res.redirect(`/admin/posts/${post.id}/edit`);
});
router.get('/:id/edit', csrfProtection, async function (req, res, next) {
    const post = await Post.FromId(req.params.id);
    res.render('admin/posts/edit', {post: post, csrfToken: req.csrfToken()});
});
router.post('/:id/save', csrfProtection, async function (req, res, next) {
    const post = await Post.FromId(req.params.id);
    if (!post) {
        res.send("Error: Could Not Find Post with that ID");
        return;
    }
    if (req.body.display === undefined) {
        req.body.display = false;
    }
    if (!req.body.tags) {
        req.body.tags = [];
    } else {
        req.body.tags = req.body.tags.split(",").map(tag => tag.trim());
    }
    req.body.buttons = [];
    req.body.quotes = [];
    const orNull = (val) => val ? val : null;
    if (req.body["button_name[]"]) {
        if (typeof req.body["button_name[]"] === "string") {
            req.body["button_name[]"] = [req.body["button_name[]"]];
            req.body["button_link[]"] = [req.body["button_link[]"]];
            req.body["button_class[]"] = [req.body["button_class[]"]];
            req.body["button_data[]"] = [req.body["button_data[]"]];
        }
        if (req.body["button_name[]"].length !== req.body["button_link[]"].length || req.body["button_class[]"].length !== req.body["button_data[]"].length || req.body["button_name[]"].length !== req.body["button_class[]"].length) {
            res.send("Error: Lengths don't match");
            return;
        }
        req.body["button_name[]"].forEach((val, index) => {
            req.body.buttons.push({
                content: req.body["button_name[]"][index],
                hyperlink: orNull(req.body["button_link[]"][index]),
                extra_class: orNull(req.body["button_class[]"][index]),
                data_custom: orNull(req.body["button_data[]"][index]),
            });
        });
    }
    if (req.body["quote_name[]"]) {
        if (typeof req.body["quote_name[]"] === "string") {
            req.body["quote_name[]"] = [req.body["quote_name[]"]];
            req.body["quote_quote[]"] = [req.body["quote_quote[]"]];
        }
        if (req.body["quote_name[]"].length !== req.body["quote_quote[]"].length) {
            res.send("Error: Lengths don't match");
            return;
        }
        req.body["quote_name[]"].forEach((val, index) => {
            req.body.quotes.push({
                name: req.body["quote_name[]"][index],
                quote: orNull(req.body["quote_quote[]"][index]),
            });
        });
    }
    await post.update(req.body);
    res.redirect(`/admin/posts`);
});
router.get('/:id/delete', csrfProtection, async function (req, res, next) {
    const post = await Post.FromId(req.params.id);
    await post.delete();
    res.redirect("/admin/posts");
});
router.get('/preview', async function (req, res, next) {
    res.render('admin/posts/preview', {posts: await Post.getAll()});
});

module.exports = router;
