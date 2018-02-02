exports.up = (knex, Promise) => {
  return knex.schema.createTable('videos', (table) => {
    // table.increments();
    table.string('videoID').notNullable().unique();
    table.timestamp('publishedAt').notNullable();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.bigInteger('duration').notNullable();
    table.bigInteger('views').notNullable();
    table.jsonb('thumbnails').notNullable();
    table.string('videoUrl').notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('videos');
};

/*
COPY videos FROM 'faker/data.csv' DELIMITER '|'
*/

/*
\copy videos from 'faker/data.csv' DELIMITER '|';
*/