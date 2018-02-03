exports.up = (knex, Promise) => {

  return Promise.all([
    knex.schema.createTable('video_info', (table) => {
      // table.increments();
      table.bigInteger('video_id').notNullable().unique();
      table.index(['video_id']);
      table.timestamp('published_at').notNullable();
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.bigInteger('duration').notNullable();
      table.bigInteger('views').notNullable();
      table.string('video_url').notNullable();
      table.string('thumbnail_1').notNullable();
      table.string('thumbnail_2').notNullable();
      table.string('thumbnail_3').notNullable();
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('video_info'),
  ]);
};








/*
exports.up = (knex, Promise) => {
  return knex.schema.createTable('video_info', (table) => {
    // table.increments();
    table.bigInteger('video_id').notNullable().unique();
    table.index(['video_id']);
    table.timestamp('published_at').notNullable();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.bigInteger('duration').notNullable();

    table.string('thumbnail_1').notNullable();
    table.string('thumbnail_2').notNullable();
    table.string('thumbnail_3').notNullable();
    
    table.string('videoUrl').notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('videos');
};
*/