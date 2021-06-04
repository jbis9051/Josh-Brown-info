import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('users', (table) => {
            table.increments('id');
            table.string('username', 255);
            table.string('password', 255);
            table.timestamp('created').defaultTo(knex.fn.now());
        })
        .createTable('tokens', (table) => {
            table.increments('id');
            table.string('token', 255);
            table.integer('user_id');
            table.foreign('user_id').references('users.id');
            table.timestamp('created').defaultTo(knex.fn.now());
        })
        .createTable('messages', (table) => {
            table.increments('id');
            table.string('name', 255);
            table.string('email', 255);
            table.string('ip', 255);
            table.text('message');
            table.timestamp('created').defaultTo(knex.fn.now());
        });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('user').dropTable('message');
}
