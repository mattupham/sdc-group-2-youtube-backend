var CronJob = require('cron').CronJob;
//15 min: '*/15 * * * *'

//15 minutes
//send and reset arrays
let cronStorage = {
  updatedVideoViews: [], //to S&B
  updatedVideos: [],     //to S&B
  createdVideos: [],     //to S&B
  deletedVideos: [],     //to S&B/Trending
}

//S&B ->        views update         (MB)
  //list of ids/updatedViewCounts
//S&B ->        update video update  (MB)
  //list of ids/updatedInformation
//S&B ->        create video update  (MB)
  //list of summary video objects

//S&B ->        delete video update  (MB)
  //list of videoIds
  //delete request comes in
  //ads id object to cronStorage
  //every 15 minutes, shoots videos into S&B

//Trending ->  delete video update   (MB)

let updateServicesCronJob = new CronJob('*/5 * * * * *', function() {
  //dump whole cronStorage object into SQS avenues
  console.log('You will see this message every 5 seconds');
  console.log('deleted videos: ', cronStorage.deletedVideos);
}, null, true, 'America/Los_Angeles');

module.exports = {
  cronStorage,
  updateServicesCronJob
}