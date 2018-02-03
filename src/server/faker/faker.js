var faker = require("faker");
var fs = require('fs');

// var one_million = 1;
var one_million = 1000000;
var start = 1;
var stop = one_million;

for (var i = 1; i <= 10; i++){
  writeVideoInfoData(start, stop);
  function writeVideoInfoData(start, stop){
    var header = 'video_id|published_at|title|description|duration|views|video_url|thumbnail_1|thumbnail_2|thumbnail_3|\n';
    var data = header;
    for (var j = start; j <= stop; j++){
      if (j % 100000 === 0) { console.log('j: ', j) }
      var video_id = j;
      var published_at = "2018-01-29T22:39:08+00:00"
      var title = faker.lorem.sentence();
      var description = faker.lorem.sentence();
      var duration = faker.random.number(10000000);
      var views = faker.random.number(10000000);
      var video_url = `https://www.youtube.com/watch?v=${video_id}`;
      var thumbnail_1 = `https://i.ytimg.com/vi/${video_id}/default1.jpg`
      var thumbnail_2 = `https://i.ytimg.com/vi/${video_id}/default2.jpg`
      var thumbnail_3 = `https://i.ytimg.com/vi/${video_id}/default3.jpg`
      var csvString = `${video_id}|${published_at}|${title}|${description}|${duration}|${views}|${video_url}|${thumbnail_1}|${thumbnail_2}|${thumbnail_3}\n`;
      data += csvString;
    }
    console.log(`now writing file ${i}`)
    fs.writeFileSync(`./data${i}.csv`, data);
    console.log(`done writing file ${i}, ${stop - start} lines`)
  }
  start += one_million;
  stop += one_million;
};