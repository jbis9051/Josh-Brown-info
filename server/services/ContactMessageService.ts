import mailgun from 'mailgun-js';
import config from '../../config';
import Message from '../models/Message';

const mg = mailgun(config.mailgun);

export default class ContactMessageService {
    static async addContactMessage(
        ip: string,
        name: string,
        email: string,
        message: string
    ) {
        await Message.query().insert({ ip, name, email, message });
        await mg.messages().send({
            from: `${email.match(/[\w._@]+/g)} <API@joshbrown.info>`,
            to: 'josh9051@gmail.com',
            subject: `${
                name.match(/\w+/g)?.join('') || 'Error'
            } - Contact Form Submission - ${ip}`,
            text: `${name} <${email}>\n\n${message}`,
        });
    }
}
