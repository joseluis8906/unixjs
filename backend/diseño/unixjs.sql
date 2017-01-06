CREATE TABLE IF NOT EXISTS "variable"
(
    "name" VARCHAR(32) UNIQUE NOT NULL,
    "val_int" BIGINT,
    "val_text" VARCHAR(256)
);
        
CREATE TABLE IF NOT EXISTS "media"
(
    "id" BIGSERIAL PRIMARY KEY,
    "name" VARCHAR(32) NOT NULL,
    "type" VARCHAR(8) NOT NULL,
    UNIQUE ("name", "type")
);
        

