import './setup';
import {Model} from "objection";

export default class Message extends Model {
    id!: number;
    name!: string;
    email!: string;
    ip!: string;
    message!: string;
    created!: Date;
    static tableName = 'messages'
}
