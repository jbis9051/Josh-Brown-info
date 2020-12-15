import './setup';
import {Model} from "objection";
import Knex from "knex";
import knexfile from "../../knexfile";
import config from "../../config";

const knex = Knex(knexfile[config.environment]);

Model.knex(knex);

export const destroy = () => knex.destroy()
