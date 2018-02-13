var CronJob = require('cron').CronJob;
//15 min: '*/15 * * * *'
const awsMessageBus = require(__dirname + '/sqs/index.js');
const cronStorage = require('./cronStorage.js')


let updateServicesCronJob = new CronJob('*/5 * * * * *', function() {
  /*
  //sends all information to services
  console.log('You will see this message every 5 seconds');
  //updatedVideoViews
  awsMessageBus.sendToSearchAndBrowse({videoList: cronStorage.cronStorage.updatedVideoViews});
  //createdVideos
  awsMessageBus.sendToSearchAndBrowse({videoList: cronStorage.cronStorage.createdVideos});
  //updatedVideos
  awsMessageBus.sendToSearchAndBrowse({videoList: cronStorage.cronStorage.updatedVideos});
  //deletedVideos
  awsMessageBus.sendToSearchAndBrowse({videoList: cronStorage.cronStorage.deletedVideos});
  awsMessageBus.sendToTrending({videoList: cronStorage.cronStorage.deletedVideos});

  //reset cron storage
  cronStorage.cronStorage.updatedVideoViews = []; //to S&B
  cronStorage.cronStorage.createdVideos = [];     //to S&B
  cronStorage.cronStorage.updatedVideos = [];     //to S&B
  cronStorage.cronStorage.deletedVideos = [];     //to S&B/Trending
  */
}, null, true, 'America/Los_Angeles');


module.exports = {
  updateServicesCronJob
}