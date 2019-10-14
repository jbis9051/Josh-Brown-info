const conn = require('./helpers/mysql.js').create();

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
            this.date = row["date"];
            this.tags = row["tags"] || [];
            this.buttons = row["buttons"] || [];
        }
    }

    static async FromQuery(query) {
        const [[row]] = await query;
        if (!row) {
            return null;
        }
        const post = new Post(row);
        await Promise.all([post.getTags(), post.getButtons()]);
        return post;
    }

    static FromId(id) {
        return Post.FromQuery(conn.execute("SELECT * FROM `posts` WHERE id = ?", [id]));
    }

    static async getAll() {
        let [posts] = await conn.execute("SELECT * FROM `posts`");
        posts = posts.map(post => new Post(post));
        const promises = [];
        posts.forEach(post => promises.push(post.getTags(), post.getButtons()));
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
        return conn.execute("INSERT INTO `buttons` (content,hyperlink,`js_id`,`data_custom`, post_id) VALUES (?, ?,?,?,?)", [button.content, button.hyperlink, button.js_id, button.data_custom, this.id]);
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

    async delete() {
        return await this._removeTags() && await conn.execute("DELETE FROM `posts` WHERE id = ? ", [this.id]);
    }

    _sync() {
        return conn.execute("UPDATE `posts` SET `title` = ?,`time_frame` = ?,`description` = ?,`background_url` = ?,`thumb_url` = ?,`display` = ? WHERE id = ?", [this.title, this.time_frame, this.description, this.background_url, this.thumb_url, this.display, this.id]);
    }

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
}

module.exports = Post;
