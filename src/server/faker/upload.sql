/*
\copy video_info FROM 'faker/data1.csv' WITH (FORMAT CSV, HEADER, DELIMITER('|'));
\copy video_info FROM 'faker/data2.csv' WITH (FORMAT CSV, HEADER, DELIMITER('|'));
\copy video_info FROM 'faker/data3.csv' WITH (FORMAT CSV, HEADER, DELIMITER('|'));
\copy video_info FROM 'faker/data4.csv' WITH (FORMAT CSV, HEADER, DELIMITER('|'));
\copy video_info FROM 'faker/data5.csv' WITH (FORMAT CSV, HEADER, DELIMITER('|'));
\copy video_info FROM 'faker/data6.csv' WITH (FORMAT CSV, HEADER, DELIMITER('|'));
\copy video_info FROM 'faker/data7.csv' WITH (FORMAT CSV, HEADER, DELIMITER('|'));
\copy video_info FROM 'faker/data8.csv' WITH (FORMAT CSV, HEADER, DELIMITER('|'));
\copy video_info FROM 'faker/data9.csv' WITH (FORMAT CSV, HEADER, DELIMITER('|'));
\copy video_info FROM 'faker/data10.csv' WITH (FORMAT CSV, HEADER, DELIMITER('|'));

-- SELECT COUNT(*) FROM videos;
-- SELECT videos FROM videos WHERE videos.video_id = '1';
-- CREATE INDEX video_id ON videos;

INSERT INTO video_info VALUES (10000001, '"2018-01-29T22:39:08+00:00"', 'Title', 'Description', 10, 20, 'https://www.youtube.com/watch?v=1', 'https://i.ytimg.com/vi/1/default1.jpg', 'https://i.ytimg.com/vi/2/default2.jpg', 'https://i.ytimg.com/vi/3/default3.jpg');
*/