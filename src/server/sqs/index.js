//sqs-consumer (for retrieving messages from trending service)
const Consumer = require('sqs-consumer');
const AWS = require('aws-sdk');
AWS.config.update({region: "us-west-2"});
const sqs = new AWS.SQS();

AWS.config.loadFromPath(__dirname + '/config.json');

const queries = require(__dirname + '/../db/queries/videos.js');



// console.log('path: ', __dirname + '/config.json');
const appConsumer = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/874598638646/trending_views',
  handleMessage: async (message, done) => {
    let updateVideoObject = JSON.parse(message.Body);
    let id = updateVideoObject.video_id;
    let viewCountAddition = updateVideoObject.updated_views_addition;
    //call update funciton
    // console.log('id', id);
    // console.log('view count addition', viewCountAddition);
    await queries.updateVideoViewCount(id, viewCountAddition);
    // console.log('updatedVideo', updatedVideo);
    done();
  },
  sqs: new AWS.SQS()
});

const sendToTrending = function(body){
  //turn body into object
  // console.log('body in sqs', JSON.stringify(body));
  body = JSON.stringify(body);
  var params = {
    MessageBody: body,
    //trending url
    QueueUrl: 'https://sqs.us-west-2.amazonaws.com/874598638646/trending_views',
    DelaySeconds: 1,
  };
  sqs.sendMessage(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
}

appConsumer.on('error', (err) => {
  console.log(err.message);
});

appConsumer.start();

module.exports = {
  appConsumer,
  sendToTrending
};