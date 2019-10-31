const conn = require('./helpers/mysql.js').create();
const showdown = require('showdown');
const converter = new showdown.Converter();

class Post {
    constructor(row) {
        if (row) {
            this.id = row["id"];
            this.title = row["title"];
            this.time_frame = row["time_frame"];
            this.description = row["description"];
            this.background_url = row["background_url"];
            this.thumb_url = row["thumb_url"];
            this.display = row["display"];
            this.isTrashed = row["trash"];
            this.date = row["date"];
            this.tags = row["tags"] || [];
            this.buttons = row["buttons"] || [];
            this.quotes = row["quotes"] || [];
        }
    }

    getTextTitle() {
        return this.title.replace(/<[^>]+>/g, "");
    }

    getHTMLDescription() {
        return converter.makeHtml(this.description);
    }

    static async FromQuery(query) {
        const [[row]] = await query;
        if (!row) {
            return null;
        }
        const post = new Post(row);
        await Promise.all([post.getTags(), post.getButtons(), post.getQuotes()]);
        return post;
    }

    static FromId(id) {
        return Post.FromQuery(conn.execute(Post.orderQuery("SELECT * FROM `posts` WHERE id = ?"), [id]));
    }

    static async getAll() {
        let [posts] = await conn.execute(Post.orderQuery("SELECT * FROM `posts`"));
        return await Post._ObjectsToPosts(posts);
    }

    static async getDisplayed() {
        let [posts] = await conn.execute(Post.orderQuery("SELECT * FROM `posts` WHERE `display` = 1 AND `trash` = 0"));
        return await Post._ObjectsToPosts(posts);
    }

    static async getNonTrashed() {
        let [posts] = await conn.execute(Post.orderQuery("SELECT * FROM `posts` WHERE `trash` = 0"));
        return await Post._ObjectsToPosts(posts);
    }

    static async getTrashed() {
        let [posts] = await conn.execute(Post.orderQuery("SELECT * FROM `posts` WHERE `trash` = 1"));
        return await Post._ObjectsToPosts(posts);
    }

    static async _ObjectsToPosts(posts) {
        posts = posts.map(post => new Post(post));
        const promises = [];
        posts.forEach(post => promises.push(post.getTags(), post.getButtons(), post.getQuotes()));
        await Promise.all(promises);
        return posts;
    }

    update(row) {
        this.title = row["title"] || this.title;
        this.time_frame = row["time_frame"] || this.time_frame;
        this.description = row["description"] || this.description;
        this.background_url = row["background_url"] || this.background_url;
        this.thumb_url = row["thumb_url"] || this.thumb_url;
        if (row["display"] !== undefined) {
            this.display = !!row["display"]
        }
        let promises = [];
        if (row["tags"] !== undefined) {
            if (typeof row["tags"] === "string") {
                row["tags"] = [row["tags"]];
            }
            promises.push(this.updateTags(row["tags"]));
        }
        if (row["buttons"] !== undefined) {
            promises.push(this.updateButtons(row["buttons"]));
        }
        if (row["quotes"] !== undefined) {
            promises.push(this.updateQuotes(row["quotes"]));
        }
        promises.push(this._sync());
        return Promise.all(promises);
    }

    _removeTags() {
        return conn.execute("DELETE FROM `tags` WHERE `post_id` = ?", [this.id]);
    }

    _addTag(tagName) {
        return conn.execute("INSERT INTO `tags` (tag, post_id) VALUES (?, ?)", [tagName, this.id]);
    }

    async getTags() {
        const [tags] = await conn.execute("SELECT `tag` FROM `tags` WHERE post_id = ?", [this.id]);
        this.tags = tags.map(tag => tag.tag);
        return this.tags;
    }

    async updateTags(tags) {
        await this._removeTags();
        return await Promise.all(tags.map(tag => this._addTag(tag)));
    }

    _removeButtons() {
        return conn.execute("DELETE FROM `buttons` WHERE `post_id` = ?", [this.id]);
    }

    _addButton(button) {
        return conn.execute("INSERT INTO `buttons` (content,hyperlink,`extra_class`,`data_custom`, post_id) VALUES (?, ?,?,?,?)", [button.content, button.hyperlink, button.extra_class, button.data_custom, this.id]);
    }

    async getButtons() {
        [this.buttons] = await conn.execute("SELECT * FROM `buttons` WHERE post_id = ?", [this.id]);
        return this.buttons;
    }

    async updateButtons(buttons) {
        await this._removeButtons();
        for (const button of buttons) {
            await this._addButton(button);
        }
    }

    _removeQuotes() {
        return conn.execute("DELETE FROM `quotes` WHERE `post_id` = ?", [this.id]);
    }

    _addQuote(quote) {
        return conn.execute("INSERT INTO `quotes` (`name`,`quote`, post_id) VALUES (?,?,?)", [quote.name, quote.quote, this.id]);
    }

    async getQuotes() {
        [this.quotes] = await conn.execute("SELECT * FROM `quotes` WHERE post_id = ?", [this.id]);
        return this.quotes;
    }

    async updateQuotes(quotes) {
        await this._removeQuotes();
        for (const quote of quotes) {
            await this._addQuote(quote);
        }
    }

    async delete() {
        return await this._removeTags() && await conn.execute("DELETE FROM `posts` WHERE id = ? ", [this.id]);
    }

    trash() {
        return conn.execute("UPDATE `posts` SET `trash` = 1 WHERE id = ? ", [this.id]);
    }

    recover() {
        return conn.execute("UPDATE `posts` SET `trash` = 0 WHERE id = ? ", [this.id]);
    }

    _sync() {
        return conn.execute("UPDATE `posts` SET `title` = ?,`time_frame` = ?,`description` = ?,`background_url` = ?,`thumb_url` = ?,`display` = ? WHERE id = ?", [this.title, this.time_frame, this.description, this.background_url, this.thumb_url, this.display, this.id]);
    }

    /**
     *
     * @param input
     * @return {Promise<Post>}
     */
    static async new(input = {}) {
        const defaults = {
            title: "Untitled",
            time_frame: "October of 2019",
            description: "",
            background_url: null,
            thumb_url: null,
            display: false
        };
        const row = Object.assign(defaults, input);
        const [results] = await conn.execute("INSERT INTO `posts` (`title`,`time_frame`,`description`,`background_url`,`thumb_url`,`display`) VALUES (?,?,?,?,?,?)", [row.title, row.time_frame, row.description, row.background_url, row.thumb_url, row.display]);
        return await Post.FromId(results.insertId);
    }

    static orderQuery(query) {
        return query + " ORDER BY `order_num`,`date` DESC";
    }

    setOrder(id) {
        return conn.execute("UPDATE `posts` SET `order_num` = ? WHERE `id` = ?", [id, this.id]);
    }
}

module.exports = Post;
