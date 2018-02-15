const redis = require('redis');
const Promise = require('bluebird');
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);
const client = redis.createClient();
var CronJob = require('cron').CronJob;

let redisStore = [];
//loop through redis store, add to cachce every 15 min cron job
// console.log('redis store: ', redisStore);

let insertIntoRedisTimer = new CronJob('*/5 * * * * *', function() {
  redisStore.forEach(function(video){
    // console.log('id: ', JSON.stringify(video.video_id));
    // console.log('video', JSON.stringify(video));
    addToCache( video.video_id, video );
  });
}, null, true, 'America/Los_Angeles');

//generate data
  //100k get requests
  //write to file
  //write to redis cache

//check redis cache on read
  //if video is not present
  //get request from postgres

client.on('error', err => {
  console.log('Error ' + err);
})


const getFromCache = (id) => {
  // return client.getAsync(JSON.stringify(+id))
  const now = Date.now();
  return client.getAsync(id)
  .then(function(res) {
    // console.log('Success time to get from cache ', Date.now() - now)
    // console.log('REDIS RESPONSE: ', res);
    // console.log('Typeof redis Response: ', typeof JSON.parse(res));
    //returns response as an object
    return JSON.parse(res);
    // return res;
  });
}

const addToCache = (id, obj) => {
// const addToCache = (id, obj, expiration) => {
  //custom query will cache for 10 sec
  // expiration = expiration || 1000;
  console.log('Adding cache with key INPUT: ', id);
  console.log('Adding cache with key PARSED: ', id);
  // console.log('Adding cache with value OBJ: ', JSON.parse(JSON.stringify(obj)));
  const now = Date.now();
  // client.setAsync(JSON.stringify(id), JSON.stringify(obj), 'EX', expiration)
  client.setAsync(id, JSON.stringify(obj))
  .then(data => {
    // console.log('Success time to add to cache ', Date.now() - now)
    console.log('CACHE Return:', data);
    // console.log('Successfully cached');
  })
  .error(err => {
    // console.log('Error time to cache ', Date.now() - now)
    console.error('Error in caching', err);
  });
}


//TEST
let obj = {
  video_id: 1,
  publishedAt: "2018-01-29T22:39:08.000Z",
  title: "updated title",
  description: "Aspernatur quod sint qui et sit reprehenderit asperiores nostrum vitae.",
  duration: 8864672,
  views: 9998152,
  videoUrl: "https://www.youtube.com/watch?v=1",
  thumbnail_1: 'https://i.ytimg.com/vi/1/default1.jpg',
  thumbnail_2: 'https://i.ytimg.com/vi/1/default2.jpg',
  thumbnail_3: 'https://i.ytimg.com/vi/1/default3.jpg'
}
// addToCache(1, obj);
// client.del("1");
// getFromCache(1);
getFromCache(8308722);

module.exports = {
  addToCache,
  getFromCache,
  redisStore
}