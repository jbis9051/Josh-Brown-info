import mysql from "mysql2/promise";
import config from "../config";

const connectionPromise = mysql.createConnection(config.mysql);

export class ContactMessage {
    id: number;
    date: Date;
    ip: string;
    name: string;
    email: string;
    reason: string;
    message: string;

    constructor(id: number, date: Date, ip: string, name: string, email: string, reason: string, message: string) {
        this.id = id;
        this.date = date;
        this.ip = ip;
        this.name = name;
        this.email = email;
        this.reason = reason;
        this.message = message;
    }

    static async insert(ip: string, name: string, email: string, message: string) {
        const conn = await connectionPromise;
        return await conn.execute('INSERT INTO contact_form_data (ip, name, email, message) VALUES (?, ?, ?, ?)', [ip, name, email, message]);
    }

    static async getAll() {
        const conn = await connectionPromise;
        const [contactForms] = await conn.execute("SELECT * FROM `contact_form_data` ORDER BY `date` DESC");
        return (contactForms as any[]).map((contactForm: ContactMessage) => new ContactMessage(contactForm.id, contactForm.date, contactForm.ip, contactForm.name, contactForm.email, contactForm.reason, contactForm.message));
    }

    static async get(id: number) {
        const conn = await connectionPromise;
        // @ts-ignore
        const [[row]] = await conn.execute("SELECT * FROM `contact_form_data` WHERE id = ?", [id]);
        if (!row) {
            return;
        }
        return new ContactMessage(row.id, row.date, row.ip, row.name, row.email, row.reason, row.message);
    }
}
