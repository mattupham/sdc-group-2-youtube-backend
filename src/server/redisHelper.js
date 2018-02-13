const redis = require('redis');
const Promise = require('bluebird');
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);
const client = redis.createClient();

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
  return client.getAsync(JSON.stringify(+id))
  .then(function(res) {
    console.log('Redis Response: ', res);
    return res;
  });
}

const addToCache = (id, obj) => {
// const addToCache = (id, obj, expiration) => {
  //custom query will cache for 10 sec
  // expiration = expiration || 1000;
  console.log('Adding cache with key: ', JSON.stringify(id));
  console.log('Adding cache with value: ', JSON.stringify(obj));
  // client.setAsync(JSON.stringify(id), JSON.stringify(obj), 'EX', expiration)
  client.setAsync(JSON.stringify(id), JSON.stringify(obj))
  .then(data => {
    console.log('CACHE Return:', data);
    console.log('Successfully cached');
  })
  .error(err => {
    console.error('Error in caching', err);
  });
}

let obj = {
  "video_id": 1,
  "publishedAt": "2018-01-29T22:39:08.000Z",
  "title": "updated title",
  "description": "Aspernatur quod sint qui et sit reprehenderit asperiores nostrum vitae.",
  "duration": 8864672,
  "views": 9998152,
  "videoUrl": "https://www.youtube.com/watch?v=1"
}

// addToCache(1, {id: 1, val: 'hello'});
// getFromCache(1);

//if in redis, return data
//if redis response is null
	//retrieve from Postgres
	//store in redis for the future

module.exports = {
  addToCache,
  getFromCache
}