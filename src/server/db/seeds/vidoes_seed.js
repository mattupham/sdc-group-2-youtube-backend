exports.seed = (knex, Promise) => {
  return knex('video_info').del()
  .then(() => {
    return knex('video_info').insert({
      video_id: 1,
      published_at: '2016-02-09T00:05:00.000Z',
      title: 'AngularJS Tutorial',
      description: 'Get the Code Here',
      duration: 1233,
      views: 1231232,
      video_url: 'https://www.youtube.com/watch?v=1',
      thumbnail_1: 'https://i.ytimg.com/vi/1/default1.jpg',
      thumbnail_2: 'https://i.ytimg.com/vi/1/default2.jpg',
      thumbnail_3: 'https://i.ytimg.com/vi/1/default3.jpg'
    });
  })
  .then(() => {
    return knex('video_info').insert({
      video_id: 2,
      published_at: '2016-02-09T00:05:00.000Z',
      title: 'AngularJS Tutorial',
      description: 'Get the Code Here',
      duration: 1233,
      views: 1231232,
      video_url: 'https://www.youtube.com/watch?v=2',
      thumbnail_1: 'https://i.ytimg.com/vi/2/default1.jpg',
      thumbnail_2: 'https://i.ytimg.com/vi/2/default2.jpg',
      thumbnail_3: 'https://i.ytimg.com/vi/2/default3.jpg'
    });
  })
  .then(() => {
    return knex('video_info').insert({
      video_id: 3,
      published_at: '2016-02-09T00:05:00.000Z',
      title: 'AngularJS Tutorial',
      description: 'Get the Code Here',
      duration: 39600000,
      views: 922337203685478000,
      video_url: 'https://www.youtube.com/watch?v=3',
      thumbnail_1: 'https://i.ytimg.com/vi/3/default1.jpg',
      thumbnail_2: 'https://i.ytimg.com/vi/3/default2.jpg',
      thumbnail_3: 'https://i.ytimg.com/vi/3/default3.jpg'
    });
  })
};