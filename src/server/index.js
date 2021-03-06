//data collection
const nr = require('newrelic');

//sqs
const awsMessageBus = require(__dirname + '/sqs/index.js');

//redis
const redis = require('./redisHelper.js');

//requre koa
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const indexRoutes = require('./routes/index');
const videoRoutes = require('./routes/videos');
const app = new Koa();
const PORT = process.env.PORT || 3000;

//koa middleware
app.use(bodyParser());
app.use(indexRoutes.routes());
app.use(videoRoutes.routes());

const cronService = require('./cronService.js');
//runs cronJob
cronService.updateServicesCronJob.start();

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;