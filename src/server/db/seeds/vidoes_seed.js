exports.seed = (knex, Promise) => {
  return knex('videos').del()
  .then(() => {
    return knex('videos').insert({
      videoID: 'OPxeCiy0RdX',
      publishedAt: '2016-02-09T00:05:00.000Z',
      title: 'AngularJS Tutorial',
      description: 'Get the Code Here',
      duration: 1233,
      views: 1231232,
      thumbnails: JSON.stringify({
        default: {},
        medium: {},
        high: {},
      }),
      videoUrl: "https://i.ytimg.com/vi/OPxeCiy0RdY/hqdefault.jpg"
    });
  })
  .then(() => {
    return knex('videos').insert({
      videoID: 'OPxeCiy0RdY',
      publishedAt: '2016-02-09T00:05:00.000Z',
      title: 'AngularJS Tutorial',
      description: 'Get the Code Here',
      duration: 1233,
      views: 1231232,
      thumbnails: JSON.stringify({
        default: {},
        medium: {},
        high: {},
      }),
      videoUrl: "https://i.ytimg.com/vi/OPxeCiy0RdY/hqdefault.jpg"
    });
  })
  .then(() => {
    return knex('videos').insert({
      videoID: 'OPxeCiy0RdZs11hrs',
      publishedAt: '2016-02-09T00:05:00.000Z',
      title: '11 hour AngularJS Tutorial',
      description: 'Get the Code Here',
      duration: 39600000,
      views: 922337203685477999,
      thumbnails: JSON.stringify({
        default: {},
        medium: {},
        high: {},
      }),
      videoUrl: "https://i.ytimg.com/vi/OPxeCiy0RdY/hqdefault.jpg"
    });
  })
};