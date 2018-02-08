//sqs-consumer (for retrieving messages from trending service)
const Consumer = require('sqs-consumer');
const AWS = require('aws-sdk');
const sqs = new AWS.SQS();
AWS.config.loadFromPath(__dirname + '/config.json');

const appConsumer = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/874598638646/trending_views',
  handleMessage: (message, done) => {
    // do some work with `message`
    console.log('message', message.Body);
    //call update funciton
    done();
  },
  sqs: new AWS.SQS()
});

appConsumer.on('error', (err) => {
  console.log(err.message);
});

appConsumer.start();