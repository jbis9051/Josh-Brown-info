import { Model } from 'objection';
import Knex from 'knex';
import knexfile from '../../knexfile';
import config from '../../config';

const knex = Knex(knexfile[config.environment]);

Model.knex(knex);

// eslint-disable-next-line import/prefer-default-export
export const destroy = () => knex.destroy();
