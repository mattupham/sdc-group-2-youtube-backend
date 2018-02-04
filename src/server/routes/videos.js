const Router = require('koa-router');
const queries = require('../db/queries/videos');

const router = new Router();

const BASE_URL = `/videos`;

router.post(`${BASE_URL}/client/upload`, async (ctx) => {
  try {
    console.log(ctx.req)
    const video = await queries.addVideo(ctx.request.body);
    
    if (video.length) {
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

router.delete(`${BASE_URL}/client/delete/:videoID`, async (ctx) => {
  try {
    const videos = await queries.deleteVideo(ctx.params.videoID);
    if (videos.length) {
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
    if (video.length) {
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
  try {
    const video = await queries.getSingleVideo(ctx.params.videoID);
    if (video.length) {
      ctx.body = {
        status: 'success',
        data: queries.mapVideoObject(video[0], "full")
        //queries.mapVideoObject(video, "full")
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

























/*
router.get(BASE_URL, async (ctx) => {
  try {
    const videos = await queries.getAllVideos();
    ctx.body = {
      status: 'success',
      data: videos
    };
  } catch (err) {
    console.log(err)
  }
})

router.get(`${BASE_URL}/:videoID`, async (ctx) => {
  try {
    const video = await queries.getSingleVideo(ctx.params.videoID);
    if (video.length) {
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
    console.log(err)
  }
})

router.get(`${BASE_URL}/:videoID`, async (ctx) => {
  try {
    const video = await queries.getSingleVideo(ctx.params.videoID);
    if (video.length) {
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
    console.log(err)
  }
})
*/

router.post(`${BASE_URL}`, async (ctx) => {
  try {
    const video = await queries.addVideo(ctx.request.body);
    if (video.length) {
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

router.put(`${BASE_URL}/:videoID`, async (ctx) => {
  try {
    const video = await queries.updateVideo(ctx.params.videoID, ctx.request.body);
    if (video.length) {
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

router.delete(`${BASE_URL}/:videoID`, async (ctx) => {
  try {
    const videos = await queries.deleteVideo(ctx.params.videoID);
    if (videos.length) {
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

module.exports = router;





