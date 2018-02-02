`COPY videos FROM 'faker/data.csv' DELIMITER '|' HEADER true`;


`\copy videos FROM 'faker/data.csv' DELIMITER '|' HEADER true`;

`\copy videos FROM 'faker/data.csv' WITH (FORMAT CSV, HEADER, DELIMITER('|'))`;


\copy videos FROM 'faker/data.csv' WITH (FORMAT CSV, HEADER, DELIMITER('|'));