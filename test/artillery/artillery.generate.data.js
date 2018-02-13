module.exports = {
  generateRandomIds
};

// Make sure to "npm install faker" first.
const Faker = require('faker');

function generateRandomIds(userContext, events, done) {
  // generate data with Faker:

  const video_id = `${Faker.random.number({
    'min': 1,
    'max': 10000000
  })}`;
  // add variables to virtual user's context:
  userContext.vars.video_id = video_id;
  // continue with executing the scenario:
  return done();
}