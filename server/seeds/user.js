/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').where({'name': 'testUser'}).del()
  await knex('users').insert([
    {name: 'testUser', email: 'testUser@techchallenge.test'}
  ]);
};