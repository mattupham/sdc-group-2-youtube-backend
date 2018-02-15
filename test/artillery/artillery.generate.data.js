module.exports = {
  generateRandomIds
};

const Faker = require('faker');


function generateRandomIds(userContext, events, done) {
  // generate data with Faker:
  // redis will store 500 most watched videos (90% of requests will go toward here)

  var video_id = null;
  //95% of time, video_id will be in redis cache
  if (Math.random() < .95){
    video_id = `${Faker.random.number({'min': 1,'max': 500})}`;
  //5% of time, video_id will be in postgres
  } else {
    video_id = `${Faker.random.number({'min': 501,'max': 10000000})}`
  }
  
  // add variables to virtual user's context:
  userContext.vars.video_id = video_id;
  // continue with executing the scenario:
  return done();
}


/*
// let id = 1;
//used to initially fill redis cache
// function generateRandomIds(userContext, events, done) {
//   const video_id = id;
//   // add variables to virtual user's context:
//   userContext.vars.video_id = video_id;
//   // continue with executing the scenario:
//   id++;
//   return done();
// }
*/