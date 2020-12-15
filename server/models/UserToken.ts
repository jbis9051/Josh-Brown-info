import './setup';
import {Model} from "objection";
import User from "./User";

export default class UserToken extends Model {
    id!: number;
    token!: string;
    created!: Date;
    user!: User;
    static tableName = 'tokens';

    static relationMappings = () => ({
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'tokens.user_id',
                to: 'users.id'
            }
        }
    })
}
