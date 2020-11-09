import mailgun from 'mailgun-js';
import config from "../config";
import {ContactMessage} from "../model/ContactMessage";

const mg = mailgun(config.mailgun);

export class ContactMessageService {
    static async addContactMessage(ip: string, name: string, email: string, message: string) {
        await ContactMessage.insert(ip, name, email, message);
        await mg.messages().send({
            from: `${email.match(/[\w._@]+/g)} <API@joshbrown.info>`,
            to: 'josh9051@gmail.com',
            subject: `${name.match(/\w+/g)?.join('') || "Error"} - Contact Form Submission - ${ip}`,
            text: `${name} <${email}>\n\n${message}`
        });
    }

    static getAll() {
        return ContactMessage.getAll();
    }

    static get(id: number) {
        return ContactMessage.get(id)
    }
}
