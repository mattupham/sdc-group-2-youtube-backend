var CronJob = require('cron').CronJob;
//15 min: '*/15 * * * *'
const awsMessageBus = require(__dirname + '/sqs/index.js');

//15 minutes
//send and reset arrays
let cronStorage = {
  updatedVideoViews: [], //to S&B
  createdVideos: [],     //to S&B
  updatedVideos: [],     //to S&B
  deletedVideos: [],     //to S&B/Trending
}

//S&B ->        views update         (MB)
  //list of ids/updatedViewCounts
//S&B ->        update video update  (MB)
  //list of ids/updatedInformation
//S&B ->        create video update  (MB)
  //list of summary video objects

//S&B ->        delete video update  (MB)

//Trending ->  delete video update   (MB)

let updateServicesCronJob = new CronJob('*/5 * * * * *', function() {
  //dump whole cronStorage object into SQS avenues
  console.log('You will see this message every 5 seconds');
  //updatedVideoViews
  awsMessageBus.sendToSearchAndBrowse({videoList: cronStorage.updatedVideoViews});
  //createdVideos
  // awsMessageBus.sendToSearchAndBrowse({videoList: cronStorage.createdVideos});
  //updatedVideos
  awsMessageBus.sendToSearchAndBrowse({videoList: cronStorage.updatedVideos});
  //deletedVideos
  // awsMessageBus.sendToSearchAndBrowse({videoList: cronStorage.deletedVideos});
  // awsMessageBus.sendToTrending({videoList: cronStorage.deletedVideos});

  //reset cron storage
  /*
  let cronStorage = {
    updatedVideoViews: [], //to S&B
    createdVideos: [],     //to S&B
    updatedVideos: [],     //to S&B
    deletedVideos: [],     //to S&B/Trending
  }
  */
  

  
}, null, true, 'America/Los_Angeles');

module.exports = {
  cronStorage,
  updateServicesCronJob
}