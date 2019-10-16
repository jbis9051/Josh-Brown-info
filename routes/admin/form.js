var express = require('express');
var router = express.Router();

const ContactForm = require('../../admin/ContactForm');

router.get('/contact', async function (req, res, next) {
    res.render('admin/contact/list', {items: await ContactForm.getAll()});
});
router.get('/contact/responses/:id', async function (req, res, next) {
    const response = await ContactForm.FromId(req.params.id);
    console.log(response);
    res.render('admin/contact/view', {item: response});
});


module.exports = router;
