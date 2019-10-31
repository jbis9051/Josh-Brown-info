var express = require('express');
var router = express.Router();

const Post = require('../admin/Post');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});
/* GET Project page. */
router.get('/project/:id', async function (req, res, next) {
    const post = await Post.FromId(req.params.id);
    if (!post || post.isTrashed || !post.display) {
        next();
        return;
    }
    res.render('project_view', {project: post});
});

module.exports = router;
