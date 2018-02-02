const knex = require('../connection');

function getAllVideos() {
  return knex('videos')
  .select('*');
}

function getSingleVideo(videoID) {
  return knex('videos')
  .select('*')
  .where({ videoID: videoID });
}

function addVideo(video) {
  return knex('videos')
  .insert(video)
  .returning('*');
}

function updateVideo(videoID, video) {
  return knex('videos')
  .update(video)
  .where({ videoID: videoID })
  .returning('*');
}

function deleteVideo(videoID) {
  return knex('videos')
  .del()
  .where({ videoID: videoID })
  .returning('*');
}

module.exports = {
  getAllVideos,
  getSingleVideo,
  addVideo,
  updateVideo,
  deleteVideo
};