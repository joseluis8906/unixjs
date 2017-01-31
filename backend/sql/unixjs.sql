/*
 * Author:  joseluis
 * Created: Jan 2, 2017
 */

CREATE TABLE IF NOT EXISTS "Media"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "Name" VARCHAR(256) NOT NULL,
    "Type" VARCHAR(8) NOT NULL,
    UNIQUE ("Name", "Type")
);

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
    "Avatar" BIGINT REFERENCES "Media" ("Id") UNIQUE,
    "Phone" VARCHAR(24),
    "Email" VARCHAR(24),
    "Address" VARCHAR(64)
);

CREATE VIEW "AuthUserAll" AS SELECT "UserName", "Password", "DocumentType", "DocumentNum", "Country", "AuthUserBasicInfo"."Name" AS "Name", "LastName", "Media"."Name" AS "AvatarName", "Media"."Type" AS "AvatarType", "Phone", "Email", "Address" FROM "AuthUser" INNER JOIN "AuthUserBasicInfo" ON "AuthUser"."Id" = "AuthUserBasicInfo"."UserId" INNER JOIN "AuthUserComplementaryInfo" ON "AuthUser"."Id" = "AuthUserComplementaryInfo"."UserId" INNER JOIN "Media" ON "Media"."Id" = "AuthUserComplementaryInfo"."Avatar";
       
CREATE TABLE IF NOT EXISTS "AuthGroup"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "Name" VARCHAR(32) UNIQUE NOT NULL
);
        
CREATE TABLE IF NOT EXISTS "AuthUserGroup"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "UserId" BIGINT NOT NULL REFERENCES "AuthUser" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "GroupId" BIGINT NOT NULL REFERENCES "AuthGroup" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    UNIQUE ("UserId", "GroupId")
);

INSERT INTO "AuthGroup" ("Name") VALUES ('root');
INSERT INTO "AuthGroup" ("Name") VALUES ('users');

WITH "Ins1" AS (INSERT INTO "Media"("Name", "Type") VALUES ('cm9vdF8xMjczNjQ4NTc0XzBfCg==', 'png') RETURNING "Id" AS "MediaId"), "Ins2" AS (INSERT INTO "AuthUser"("UserName", "Password") VALUES('root', 'sha256$72dfcfL0c470ac25$b0ac6336ed6d81567abb146ffeb69b834c2552cab77043398cab9bced376337d') RETURNING "Id" AS "UserId"), "Ins3" AS (INSERT INTO "AuthUserBasicInfo"("UserId", "DocumentType", "DocumentNum", "Country", "Name", "LastName") SELECT "UserId", 'XX', 'XXXXXXXXXX', 'XXXXXX', 'XXX', 'XXX' FROM "Ins2" RETURNING "UserId") INSERT INTO "AuthUserComplementaryInfo"("UserId", "Avatar", "Phone", "Email", "Address") SELECT "UserId", "MediaId", 'XXX', 'XXX', 'XXX' FROM "Ins2", "Ins1";

INSERT INTO "AuthUserGroup" ("UserId", "GroupId") SELECT "AuthUser"."Id" AS "UserId", "AuthGroup"."Id" AS "GroupId" FROM "AuthUser" INNER JOIN "AuthGroup" ON "AuthUser"."UserName"='root' AND "AuthGroup"."Name"='root' LIMIT 1;
