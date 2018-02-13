const redis = require('redis');
const Promise = require('bluebird');
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);
const client = redis.createClient();

//generate data
  //100M get requests
  //write to file
  //write to redis cache

//check redis cache on read
  //if video is not present
  //get request from postgres

client.on('error', err => {
  console.log('Error ' + err);
})

const getFromCache = (id) => {
  return client.getAsync(JSON.stringify(id));
}

const addToCache = (query, result, expiration) => {
  //custom query will cache for 10 sec
  expiration = expiration || 1000;
  console.log('Adding cache with key: ', JSON.stringify(query));
  console.log('Adding cache with value: ', JSON.stringify(result));
  client.setAsync(JSON.stringify(query), JSON.stringify(result), 'EX', expiration)
  .then(data => {
    console.log('CACHE Return:', data);
    console.log('Successfully cached');
  })
  .error(err => {
    console.error('Error in caching', err);
  });
}

module.exports = {
  addToCache,
  getFromCache
}