process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/server/index');
const knex = require('../src/server/db/connection');

describe('routes : videos', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('[CLIENT] POST /videos/client/upload', () => {
    it('should return the video that was uploaded', (done) => {
      chai.request(server)
      .post('/videos/client/upload')
      .send({
        video_id: 4,
        published_at: '2016-02-09T00:05:00.000Z',
        title: 'AngularJS Tutorial',
        description: 'Get the Code Here',
        duration: 1233,
        views: 1231232,
        video_url: 'https://www.youtube.com/watch?v=4',
        thumbnail_1: 'https://i.ytimg.com/vi/4/default1.jpg',
        thumbnail_2: 'https://i.ytimg.com/vi/4/default2.jpg',
        thumbnail_3: 'https://i.ytimg.com/vi/4/default3.jpg'
      })
      .end((err, res) => {
        // there should be no errors
        should.not.exist(err);
        // there should be a 201 status code
        // (indicating that something was "created")
        res.status.should.equal(201);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql('success');
        // the JSON response body should have a
        // key-value pair of {"data": 1 video object}
        res.body.data[0].should.include.keys(
          'video_id', 'published_at', 'title', 'description', 'duration', 'views', 'video_url', 'thumbnail_1', 'thumbnail_2', 'thumbnail_3'
        );
        done();
      });
    });
    it('should throw an error if the payload is malformed', (done) => {
      chai.request(server)
      .post('/videos/client/upload')
      .send({
        title: 'Invalid Video'
      })
      .end((err, res) => {
        // there should an error
        should.exist(err);
        // there should be a 400 status code
        res.status.should.equal(400);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "error"}
        res.body.status.should.eql('error');
        // the JSON response body should have a message key
        should.exist(res.body.message);
        done();
      });
    });
  });

  

  
  describe('[CLIENT] DELETE videos/client/delete/:video_id', () => {
    it('should return the video that was deleted', (done) => {
      knex('video_info')
      .select('*')
      .then((videos) => {
        const videoObject = videos[0];
        const lengthBeforeDelete = videos.length;
        chai.request(server)
        .delete(`/videos/client/delete/${videoObject.video_id}`)
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": 1 video object}
          res.body.data[0].should.include.keys(
            'video_id', 'published_at', 'title', 'description', 'duration', 'views', 'video_url', 'thumbnail_1', 'thumbnail_2', 'thumbnail_3'
          );
          // ensure the video was in fact deleted
          knex('video_info').select('*')
          .then((updatedVideos) => {
            updatedVideos.length.should.eql(lengthBeforeDelete - 1);
            done();
          });
        });
      });
    });
    it('should throw an error if the video does not exist', (done) => {
      chai.request(server)
      .delete('/videos/client/delete/9999999')
      .end((err, res) => {
        // there should an error
        should.exist(err);
        // there should be a 404 status code
        res.status.should.equal(404);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "error"}
        res.body.status.should.eql('error');
        // the JSON response body should have a
        // key-value pair of {"message": "That video does not exist."}
        res.body.message.should.eql('That video does not exist.');
        done();
      });
    });
  });

  
  describe('[CLIENT] PUT /videos/client/update/', () => {
    it('should return the video that was updated', (done) => {
      knex('video_info')
      .select('*')
      .then((video) => {
        const videoObject = video[0];
        chai.request(server)
        .put(`/videos/client/update/${videoObject.video_id}`)
        .send({
          title: 'Updated title'
        })
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": 1 video object}
          res.body.data[0].should.include.keys(
            'video_id', 'published_at', 'title', 'description', 'duration', 'views', 'video_url', 'thumbnail_1', 'thumbnail_2', 'thumbnail_3'
          );
          // ensure the video was in fact updated
          const newVideoObject = res.body.data[0];
          newVideoObject.title.should.not.eql(videoObject.title);
          newVideoObject.title.should.eql('Updated title');
          done();
        });
      });
    });
    it('should throw an error if the video does not exist', (done) => {
      chai.request(server)
      .put('/videos/client/update/99999999999')
      .send({
        title: 'This update will fail'
      })
      .end((err, res) => {
        // there should an error
        should.exist(err);
        // there should be a 404 status code
        res.status.should.equal(404);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "error"}
        res.body.status.should.eql('error');
        // the JSON response body should have a
        // key-value pair of {"message": "That video does not exist."}
        res.body.message.should.eql('That video does not exist.');
        done();
      });
    });
  });
  
  describe('[S&B] GET /videos/search/:video_id ', () => {
    it('should respond with a single video', (done) => {
      chai.request(server)
      .get('/videos/search/1')
      .end((err, res) => {
        // there should be no errors
        should.not.exist(err);
        // there should be a 200 status code
        res.status.should.equal(200);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql('success');
        // the JSON response body should have a
        // key-value pair of {"data": 1 video object}
        res.body.data.should.include.keys(
          'video_id', 'publishedAt', 'title', 'description', 'duration', 'views', 'videoUrl'
        );
        done();
      });
    });
  });

  
  describe('[TRENDING] GET /videos/search/:video_id ', () => {
    it('should respond with a single video', (done) => {
      chai.request(server)
      .get('/videos/trending/1')
      .end((err, res) => {
        // there should be no errors
        should.not.exist(err);
        // there should be a 200 status code
        res.status.should.equal(200);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql('success');
        // the JSON response body should have a
        // key-value pair of {"data": 1 video object}
        res.body.data.should.include.keys(
          'video_id', 'publishedAt', 'title', 'description', 'duration', 'views', 'thumbnails'
        );
        done();
      });
    });
  });



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  describe('[TRENDING] Update View Count Query Works', () => {
    it('should update the view count correctly', (done) => {
      knex('video_info')
      .select('*')
      .then((video) => {
        const videoObject = video[0];
        const updateViewAmount = 1;
        const currentVideoViews = +videoObject.views;
        const id = +videoObject.video_id;
        chai.request(server)
        .put(`/videos/trending/updateViewsTest`)
        .send({
          video_id: id,
          updated_views_addition: updateViewAmount
        })
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": 1 video object}
          res.body.data[0].should.include.keys(
            'video_id', 'published_at', 'title', 'description', 'duration', 'views', 'video_url', 'thumbnail_1', 'thumbnail_2', 'thumbnail_3'
          );
          // ensure the video was in fact updated
          const newVideoObject = res.body.data[0];
          const updatedViewAmountString = (+videoObject.views + updateViewAmount).toString();
          newVideoObject.views.should.not.eql(videoObject.views);
          newVideoObject.views.should.eql(updatedViewAmountString);
          done();
        });
      });
    });
    it('should throw an error if the video does not exist', (done) => {
      chai.request(server)
      .put('/videos/trending/updateViewsTest')
      .send({
        video_id: 99999999999,
        updated_views_addition: 1
      })
      .end((err, res) => {
        // there should an error
        should.exist(err);
        // there should be a 404 status code
        res.status.should.equal(404);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "error"}
        res.body.status.should.eql('error');
        // the JSON response body should have a
        // key-value pair of {"message": "That video does not exist."}
        res.body.message.should.eql('That video does not exist.');
        done();
      });
    });
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  /*
  describe('Handling max duration videos (11 hours) [GET, POST, PUT]', () => {
    it('should respond with a single video w/an 11 hour duration', (done) => {
      chai.request(server)
      .get('/videos/search/3')
      .end((err, res) => {
        // there should be no errors
        should.not.exist(err);
        // there should be a 200 status code
        res.status.should.equal(200);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql('success');
        // the JSON response body should have a
        // key-value pair of {"data": 1 video object}
        res.body.data[0].should.include.keys(
          'video_id', 'published_at', 'title', 'description', 'duration', 'views', 'video_url', 'thumbnail_1', 'thumbnail_2', 'thumbnail_3'
        );
        //should be able to support duration of 11 hrs
        res.body.data[0].duration.should.eql('39600000');
        done();
      });
    });
    it('should return the video that was added with an 11 hour duration', (done) => {
      chai.request(server)
      .post('/videos/client/upload')
      .send({
        video_id: 5,
        published_at: '2016-02-09T00:05:00.000Z',
        title: 'AngularJS Tutorial',
        description: 'Get the Code Here',
        duration: 39600000,
        views: 39600000,
        video_url: 'https://www.youtube.com/watch?v=3',
        thumbnail_1: 'https://i.ytimg.com/vi/3/default1.jpg',
        thumbnail_2: 'https://i.ytimg.com/vi/3/default2.jpg',
        thumbnail_3: 'https://i.ytimg.com/vi/3/default3.jpg'
      })
      .end((err, res) => {
        // there should be no errors
        should.not.exist(err);
        // there should be a 201 status code
        // (indicating that something was "created")
        res.status.should.equal(201);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql('success');
        // the JSON response body should have a
        // key-value pair of {"data": 1 video object}
        res.body.data[0].should.include.keys(
          'video_id', 'published_at', 'title', 'description', 'duration', 'views', 'video_url', 'thumbnail_1', 'thumbnail_2', 'thumbnail_3'
        );
        res.body.data[0].duration.should.eql('39600000');
        done();
      });
    });

    
    it('should handle updated duration from <11 hours to 11 hours', (done) => {
      knex('video_info')
      .select('*')
      .then((video) => {
        const videoObject = video[0];
        chai.request(server)
        .put(`/videos/client/update/${videoObject.video_id}`)
        .send({
          duration: 39600000
        })
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": 1 video object}
          res.body.data[0].should.include.keys(
            'video_id', 'published_at', 'title', 'description', 'duration', 'views', 'video_url', 'thumbnail_1', 'thumbnail_2', 'thumbnail_3'
          );
          // ensure the video was in fact updated
          const newVideoObject = res.body.data[0];
          newVideoObject.duration.should.eql('39600000');
          done();
        });
      });
    });

  });
  
  describe('Handling max video views (9223372036854775807) [GET, POST, PUT]', () => {
    it('should respond with a single video w/9223372036854775807 views', (done) => {
      chai.request(server)
      .get('/videos/search/3')
      .end((err, res) => {
        // there should be no errors
        should.not.exist(err);
        // there should be a 200 status code
        res.status.should.equal(200);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql('success');
        // the JSON response body should have a
        // key-value pair of {"data": 1 video object}
        res.body.data[0].should.include.keys(
          'video_id', 'published_at', 'title', 'description', 'duration', 'views', 'video_url', 'thumbnail_1', 'thumbnail_2', 'thumbnail_3'
        );
        //should be able to support duration of 11 hrs
        res.body.data[0].views.should.eql('922337203685478000');
        done();
      });
    });
    
    it('should return the video that was added with 922337203685478000 views', (done) => {
      chai.request(server)
      .post('/videos/client/upload')
      .send({
        video_id: 5,
        published_at: '2016-02-09T00:05:00.000Z',
        title: 'AngularJS Tutorial',
        description: 'Get the Code Here',
        duration: 1233,
        views: 922337203685478000,
        video_url: 'https://www.youtube.com/watch?v=2',
        thumbnail_1: 'https://i.ytimg.com/vi/5/default1.jpg',
        thumbnail_2: 'https://i.ytimg.com/vi/5/default2.jpg',
        thumbnail_3: 'https://i.ytimg.com/vi/5/default3.jpg'
      })
      .end((err, res) => {
        // there should be no errors
        should.not.exist(err);
        // there should be a 201 status code
        // (indicating that something was "created")
        res.status.should.equal(201);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql('success');
        // the JSON response body should have a
        // key-value pair of {"data": 1 video object}
        res.body.data[0].should.include.keys(
          'video_id', 'published_at', 'title', 'description', 'duration', 'views', 'video_url', 'thumbnail_1', 'thumbnail_2', 'thumbnail_3'
        );
        res.body.data[0].views.should.eql('922337203685478000');
        done();
      });
    });

    it('should handle updated duration from <922337203685478000 views to 922337203685478000 views', (done) => {
      knex('video_info')
      .select('*')
      .then((video) => {
        const videoObject = video[0];
        chai.request(server)
        .put(`/videos/client/update/${videoObject.video_id}`)
        .send({
          views: 922337203685478000
        })
        .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('application/json');
          // the JSON response body should have a
          // key-value pair of {"status": "success"}
          res.body.status.should.eql('success');
          // the JSON response body should have a
          // key-value pair of {"data": 1 video object}
          res.body.data[0].should.include.keys(
            'video_id', 'published_at', 'title', 'description', 'duration', 'views', 'video_url', 'thumbnail_1', 'thumbnail_2', 'thumbnail_3'
          );
          // ensure the video was in fact updated
          const newVideoObject = res.body.data[0];
          newVideoObject.views.should.eql('922337203685478000');
          console.log(newVideoObject.views)
          done();
        });
      });
    });
    
  });
  */
  
});