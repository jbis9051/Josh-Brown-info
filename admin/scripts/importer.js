const path = require('path');
const fs = require('fs');
const cheerio = require("cheerio");
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const Post = require('../../admin/Post.js');

const $ = cheerio.load(fs.readFileSync(path.join(__dirname, '..', '..', 'views', 'resume_import.ejs')));

const link = str => {
    if (!str.startsWith("http")) {
        return "https://joshbrown.info" + (str.startsWith("/") ? str : "/" + str);
    }
    return str;
};
const clean = str => entities.decode(str.replace(/\n +(?=[\w])| {2,}/g, " ").replace(/<br>/g, "\n"));
$('.project_wrapper').each(async (i, el) => {
    el = $(el);
    const post = await Post.new({
        title: clean(el.find(".project_title").html()),
        time_frame: clean(el.find(".project_date").html()),
        description: clean(el.find(".project_description").html()),
        background_url: null,
        thumb_url: clean(link(el.find("img").attr('src'))),
        display: true
    });
    el.find(".product_button").each(async (i, but) => {
        but = $(but);
        const classes = but.attr("class").split(/\s+/);
        classes.splice(classes.indexOf("product_button"), 1);
        let hyperlink = null;
        let data_custom = null;
        if (but.parent().is("a")) {
            hyperlink = but.parent().attr("href").trim();
        }
        if (but.is("[data-url]")) {
            data_custom = but.attr("data-url").trim();
        }
        await post._addButton({
            content: clean(but.html().trim()),
            extra_class: classes[0] ? clean(classes[0].trim()) : null,
            hyperlink: hyperlink ? link(hyperlink) : hyperlink,
            data_custom: data_custom
        });
    });
    el.find(".person").each(async (i, per) => {
        per = $(per);
        await post._addQuote({
            name: clean(per.html().trim()),
            quote: clean(per.next('.quote').html())
        });
    });
});
