/**
 * Author:  joseluis
 * Created: Jan 2, 2017
 */

CREATE TABLE IF NOT EXISTS "AuthUser"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "UserName" VARCHAR(32) UNIQUE NOT NULL,
    "Password" VARCHAR(256) NOT NULL
);

CREATE TABLE IF NOT EXISTS "AuthUserBasicInfo"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "UserId" BIGINT NOT NULL REFERENCES "AuthUser" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "DocumentType" VARCHAR(8) NOT NULL,
    "DocumentNum" VARCHAR(16) NOT NULL,
    "Country" VARCHAR(64) NOT NULL,
    "Name" VARCHAR(64) NOT NULL,
    "LastName" VARCHAR(64) NOT NULL,
    UNIQUE ("DocumentType", "DocumentNum", "Country")
);

CREATE TABLE IF NOT EXISTS "AuthUserComplementaryInfo"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "UserId" BIGINT NOT NULL REFERENCES "AuthUser" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "Avatar" VARCHAR(256) NOT NULL,
    "Phone" VARCHAR(24) NOT NULL,
    "Email" VARCHAR(24) NOT NULL,
    "Address" VARCHAR(64) NOT NULL
);

CREATE VIEW "AllAuthUser" AS SELECT "UserName", "Password", "DocumentType", "DocumentNum", "Country", "Name", "LastName", "Avatar", "Phone", "Email", "Address" FROM "AuthUser" INNER JOIN "AuthUserBasicInfo" ON "AuthUser"."Id" = "AuthUserBasicInfo"."UserId" INNER JOIN "AuthUserComplementaryInfo" ON "AuthUser"."Id" = "AuthUserComplementaryInfo"."UserId";

/*        
CREATE TABLE IF NOT EXISTS "AuthGroup"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "Name" VARCHAR(32) UNIQUE NOT NULL
);
        
CREATE TABLE IF NOT EXISTS "AuthUserGroup"
(
    "UserId" BIGINT NOT NULL REFERENCES "AuthUser" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "GroupId" BIGINT NOT NULL REFERENCES "AuthGroup" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    UNIQUE ("UserId", "GroupId")
);

INSERT INTO "AuthUser" ("DocumentType", "DocumentNum", "Pasword") VALUES ('root', 'sha256$72dfcfL0c470ac25$b0ac6336ed6d81567abb146ffeb69b834c2552cab77043398cab9bced376337d');
INSERT INTO "AuthGroup" ("Name") VALUES ('root');
INSERT INTO "AuthGroup" ("Name") VALUES ('users');
*/
/*CREATE TABLE IF NOT EXISTS "variable"
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
*/