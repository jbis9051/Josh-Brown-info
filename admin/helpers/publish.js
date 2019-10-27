const path = require('path');
const fs = require('fs-extra');
const ejs = require('ejs');
const showdown = require('showdown');

const converter = new showdown.Converter();
const Main = require('../Main');
const Post = require('../Post');

module.exports = async () => {
    const genPath = (name) => path.join(__dirname, '..', '..', 'views', 'gen', name);
    const pathToProjectComponent = path.join(__dirname, '..', '..', 'views', 'admin', 'components', 'project.ejs');
    const aboutmePromise = fs.writeFile(genPath('aboutmeHTML.ejs'), converter.makeHtml(await Main.val("about")));
    const welcomePromise = fs.writeFile(genPath('welcomeHTML.ejs'), converter.makeHtml(await Main.val("welcome")));
    const posts = await Post.getDisplayed();
    let resumeHTML = "";
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        resumeHTML += await ejs.renderFile(pathToProjectComponent, {post: post, i: i});
    }
    resumeHTML += '<div class="parallax more_soon fadeIn_5"></div>'; // and more to come!
    const resumePromise = fs.appendFile(genPath('resumeHTML.ejs'), resumeHTML);
    return await Promise.all([aboutmePromise, welcomePromise, resumePromise, Main.updateDate("last_publish_date", "1")]);
};
