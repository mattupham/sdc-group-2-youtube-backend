const nr = require('newrelic');

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const indexRoutes = require('./routes/index');
const videoRoutes = require('./routes/videos');

const app = new Koa();
const PORT = process.env.PORT || 1337;

app.use(bodyParser());
app.use(indexRoutes.routes());
app.use(videoRoutes.routes());

//sqs-consumer
const Consumer = require('sqs-consumer');
const AWS = require('aws-sdk');

AWS.config.loadFromPath(__dirname + '/config.json');

const appConsumer = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/874598638646/trending_views',
  handleMessage: (message, done) => {
    // do some work with `message`
    console.log('message', message.Body);
    done();
  },
  sqs: new AWS.SQS()
});

appConsumer.on('error', (err) => {
  console.log(err.message);
});

appConsumer.start();



const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;