const conn = require('./helpers/mysql.js').create();

class ContactForm {
    constructor(row) {
        if (row) {
            this.id = row["id"];
            this.date = row["date"];
            this.ip = row["ip"];
            this.name = row["name"];
            this.email = row["email"];
            this.message = row["message"];
        }
    }

    static async FromQuery(query) {
        const [[row]] = await query;
        if (!row) {
            return null;
        }
        return new ContactForm(row);
    }

    static FromId(id) {
        return ContactForm.FromQuery(conn.execute("SELECT * FROM `contact_form_data` WHERE id = ?", [id]));
    }

    static async getAll() {
        let [contactForms] = await conn.execute("SELECT * FROM `contact_form_data` ORDER BY `date` DESC");
        return contactForms.map(contactForm => new ContactForm(contactForm));
    }

    static async new(input = {}) {
        /* const defaults = {
             title: "Untitled",
             time_frame: "October of 2019",
             description: "",
             background_url: null,
             thumb_url: null,
             display: false
         };
         const row = Object.assign(defaults, input);
         const [results] = await conn.execute("INSERT INTO `contactForms` (`title`,`time_frame`,`description`,`background_url`,`thumb_url`,`display`) VALUES (?,?,?,?,?,?)", [row.title, row.time_frame, row.description, row.background_url, row.thumb_url, row.display]);
         return await Post.FromId(results.insertId);*/
    }
}

module.exports = ContactForm;
