// const Consumer = require('sqs-consumer');
// const AWS = require('aws-sdk');
// const sqs = new AWS.SQS();

const Router = require('koa-router');
const queries = require('../db/queries/videos');
const sqs = require(__dirname + '/../sqs/index.js');
const router = new Router();
const BASE_URL = `/videos`;
const cronService = require('../cronService.js');
const cronStorage = require('../cronStorage.js');

//DONE
router.post(`${BASE_URL}/client/upload`, async (ctx) => {
  try {
    // console.log(ctx.req)
    const video = await queries.addVideo(ctx.request.body);
    //add to createdVideos
    if (video.length) {
      //turns object into summary object
      let summaryVideoObject = Object.assign({}, video[0]);
      delete summaryVideoObject.video_url;
      cronService.cronStorage.createdVideos.push(summaryVideoObject);
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: video
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})

//DONE
router.delete(`${BASE_URL}/client/delete/:videoID`, async (ctx) => {
  try {
    videoId = +ctx.params.videoID;
    const videos = await queries.deleteVideo(videoId);
    if (videos.length) {
      //push videoID to CronService
      cronService.cronStorage.deletedVideos.push({"videoId": videoId});
      console.log('deleteVideos: ', cronService.cronStorage.deletedVideos);
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: videos
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That video does not exist.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})

router.put(`${BASE_URL}/client/update/:videoID`, async (ctx) => {
  try {
    const video = await queries.updateVideo(ctx.params.videoID, ctx.request.body);
    // console.log('body', ctx.request.body);
    if (video.length) {
      let updatedVideoObject = Object.assign({}, ctx.request.body)
      Object.defineProperty(updatedVideoObject, 'videoId', Object.getOwnPropertyDescriptor(updatedVideoObject, 'video_id'));
      delete updatedVideoObject['video_id'];
      cronService.cronStorage.updatedVideos.push(updatedVideoObject);
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: video
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That video does not exist.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})

router.get(`${BASE_URL}/search/:videoID`, async (ctx) => {
  // console.log(ctx.params.videoID)
  try {
    const video = await queries.getSingleVideo(ctx.params.videoID);
    if (video.length) {
      ctx.body = {
        status: 'success',
        data: queries.mapVideoObject(video[0], "full")
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That video does not exist.'
      };
    }
  } catch (err) {
    console.log(err)
  }
})

router.get(`${BASE_URL}/trending/:videoID`, async (ctx) => {
  try {
    const video = await queries.getSingleVideo(ctx.params.videoID);
    if (video.length) {
      ctx.body = {
        status: 'success',
        data: queries.mapVideoObject(video[0], "summary")
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That video does not exist.'
      };
    }
  } catch (err) {
    console.log(err)
  }
})

//update video views from trending (Message Bus) -> http route for test purposes
router.put(`${BASE_URL}/trending/updateViewsTest`, async (ctx) => {
  let id = ctx.request.body.video_id;
  // console.log('id in route', id)
  let viewCountAddition = ctx.request.body.updated_views_addition;
  try {
    const video = await queries.updateVideoViewCount(id, viewCountAddition);
    console.log('video', video);
    if (video.length) {
      cronService.cronStorage.deletedVideos.push({"videoId": videoId});
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: video
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That video does not exist.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
})

module.exports = router;
