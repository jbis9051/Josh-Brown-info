import './setup';
import { Model } from 'objection';
import UserToken from './UserToken';

export default class User extends Model {
    id!: number;

    username!: string;

    password!: string;

    created!: Date;

    static tableName = 'users';

    static relationMappings = {
        tokens: {
            relation: Model.HasManyRelation,
            modelClass: UserToken,
            join: {
                from: 'users.id',
                to: 'tokens.user_id',
            },
        },
    };
}
