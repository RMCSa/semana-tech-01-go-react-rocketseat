CREATE TABLE IF NOT EXISTS rooms (
    "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "theme" VARCHAR(255) NOT NULL
);

---- create above / drop below ----

DROP TABLE IF EXISTS rooms;
