var faker = require("faker");

var fs = require('fs');  // file system

for (var i = 1; i <= 10; i++){

  var file = fs.createWriteStream(`./data${i}.csv`);
  writeData(0, 1000000);
  
  function writeData(bound1, bound2){
  //import fs
  var header = 'videoID|publishedAt|title|description|duration|views|thumbnails|videoUrl\n';
  file.write(header);

  for (var i = bound1; i < bound2; i++){
    var videoID = i.toString();
    var publishedAt = "2018-01-29T22:39:08+00:00"
    var title = faker.lorem.sentence();
    var description = faker.lorem.sentence();
    var duration = faker.random.number(10000000);
    var views = faker.random.number(10000000);
    var thumbnails = {};
    var videoUrl = `https://www.youtube.com/watch?v=${videoID}`;
    var csvString = `${videoID}|${publishedAt}|${title}|${description}|${duration}|${views}|`
    var csvString2 = thumbnails;
    var csvString3 = `|${videoUrl}\n`;
    file.write(csvString);
    file.write(JSON.stringify(csvString2));
    file.write(csvString3);
  }

  file.end(function(){console.log('done')});

  }
}

// file.write(videoID);
// file.write('|');
// file.write(publishedAt);
// file.write('|');
// file.write(title);
// file.write('|');
// file.write(description);
// file.write('|');
// file.write(duration);
// file.write('|');
// file.write(views);
// file.write('|');
// file.write(thumbnails);
// file.write('|');
// file.write(videoUrl);
// var string1 = 'hi';
// var string2 = '|';
// var string3 = 'hi2';
// file.write(string1);
// file.write(string2);
// file.write(string3);

/*
var thumbnails = {
  default: {
    url: 'https://i.ytimg.com/vi/0ByoQm-vnYw/default.jpg',
    width: 120,
    height: 90
  },
  medium: {
    url: 'https://i.ytimg.com/vi/0ByoQm-vnYw/mqdefault.jpg',
    width: 320,
    height: 180
  },
  high: {
    url: 'https://i.ytimg.com/vi/0ByoQm-vnYw/hqdefault.jpg',
    width: 480,
    height: 360
  }
};
*/