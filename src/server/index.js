//data collection
const nr = require('newrelic');

//sqs
const sqs = require(__dirname + '/sqs');

//requre koa
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const indexRoutes = require('./routes/index');
const videoRoutes = require('./routes/videos');
const app = new Koa();
const PORT = process.env.PORT || 1337;

//koa middleware
app.use(bodyParser());
app.use(indexRoutes.routes());
app.use(videoRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;