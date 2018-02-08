const knex = require('../connection');

function mapVideoObject(queryReturn, summaryOrFull){
  // console.log('query return', queryReturn)
  let videoObject =  {
    videoId: +queryReturn["video_id"],
    publishedAt: queryReturn["published_at"],
    title: queryReturn["title"],
    description:queryReturn["description"],
    duration: +queryReturn["duration"],
    views: +queryReturn["views"],
  }
  if (summaryOrFull === "summary"){
    videoObject["thumbnails"] = createThumbnailObject(queryReturn);
  }
  if (summaryOrFull === "full"){
    videoObject["videoUrl"] = queryReturn["video_url"];
  }
  return videoObject;
}

function createThumbnailObject(queryReturn){
  return {
    default: {
      url: queryReturn["thumbnail_1"],
      width: 120,
      height: 90
    },
    medium: {
      url: queryReturn["thumbnail_2"],
      width: 320,
      height: 180
    },
    high: {
      url: queryReturn["thumbnail_3"],
      width: 480,
      height: 360
    }
  }
}

function getAllVideos() {
  return knex('video_info')
  .select('*');
}

function getSingleVideo(video_id) {
  return knex('video_info')
  .select('*')
  .where({ video_id: video_id });
}

function addVideo(video) {
  return knex('video_info')
  .insert(video)
  .returning('*');
}

function updateVideo(video_id, video) {
  return knex('video_info')
  .update(video)
  .where({ video_id: video_id })
  .returning('*');
}

function deleteVideo(video_id) {
  return knex('video_info')
  .del()
  .where({ video_id: video_id })
  .returning('*');
}

//update video view count from trending service
function updateVideoViewCount(video_id, viewCountAddition){
  console.log('video id in db', video_id)
  console.log('view count addition in db', viewCountAddition)
  return knex('video_info')
  .update({views: knex.raw('?? + ?', ['views', viewCountAddition]) })
  .where(knex.raw(`video_id = ?`, [video_id]))
  .returning('*');
}

// 'UPDATE video_info SET views = views + 1 WHERE video_id = 1'

// function updateMovies(arr) {
//   return knex('movies')
//   .update({recent_views: parseInt(newViews)})
//   .update({total_views: knex.raw('?? + ?', ['total_views', newViews])})
//   .where(knex.raw('video_id = ?', [id]))
//   .returning('*');
// }

module.exports = {
  getAllVideos,
  getSingleVideo,
  addVideo,
  updateVideo,
  deleteVideo,
  mapVideoObject,
  createThumbnailObject,
  updateVideoViewCount
};