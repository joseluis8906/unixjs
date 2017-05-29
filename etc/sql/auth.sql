/*
 * Author:  joseluis
 * Created: Jan 2, 2017
 */
CREATE SCHEMA IF NOT EXISTS "Auth";

CREATE TABLE IF NOT EXISTS "Auth"."User"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "UserName" VARCHAR(32) UNIQUE NOT NULL,
    "Password" VARCHAR(256) NOT NULL
);

/*Media*/
CREATE TABLE IF NOT EXISTS "public"."Media"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "Name" VARCHAR(256) NOT NULL,
    "Type" VARCHAR(8) NOT NULL,
    "FileName" VARCHAR(256) NOT NULL,
    "UserId" BIGINT NOT NULL REFERENCES "Auth"."User" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    UNIQUE ("Name", "Type")
);


CREATE TABLE IF NOT EXISTS "Auth"."UserBasicInfo"
(
    "UserId" BIGINT PRIMARY KEY NOT NULL REFERENCES "Auth"."User" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "DocumentType" VARCHAR(8) NOT NULL,
    "DocumentNum" VARCHAR(16) NOT NULL,
    "Country" VARCHAR(64) NOT NULL,
    "Name" VARCHAR(64) NOT NULL,
    "LastName" VARCHAR(64) NOT NULL,
    UNIQUE ("DocumentType", "DocumentNum", "Country")
);

CREATE TABLE IF NOT EXISTS "Auth"."UserComplementaryInfo"
(
    "UserId" BIGINT PRIMARY KEY NOT NULL REFERENCES "Auth"."User" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "Avatar" BIGINT REFERENCES "Media" ("Id") UNIQUE,
    "Phone" VARCHAR(24),
    "Email" VARCHAR(64),
    "Address" VARCHAR(64)
);

CREATE VIEW "Auth"."UserAll" AS SELECT "UserName", "Password", "DocumentType", "DocumentNum", "Country", "Auth"."UserBasicInfo"."Name" AS "Name", "LastName", "Media"."Name" AS "AvatarName", "Media"."Type" AS "AvatarType", "Phone", "Email", "Address" FROM "Auth"."User" INNER JOIN "Auth"."UserBasicInfo" ON "Auth"."User"."Id" = "Auth"."UserBasicInfo"."UserId" INNER JOIN "Auth"."UserComplementaryInfo" ON "Auth"."User"."Id" = "Auth"."UserComplementaryInfo"."UserId" INNER JOIN "Media" ON "Media"."Id" = "Auth"."UserComplementaryInfo"."Avatar";

/*authgroup*/
CREATE TABLE IF NOT EXISTS "Auth"."Group"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "Name" VARCHAR(32) UNIQUE NOT NULL
);

/*authusergroup*/
CREATE TABLE IF NOT EXISTS "Auth"."UserGroup"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "UserId" BIGINT NOT NULL REFERENCES "Auth"."User" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "GroupId" BIGINT NOT NULL REFERENCES "Auth"."Group" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    UNIQUE ("UserId", "GroupId")
);

CREATE VIEW "Auth"."UserGroupAll" AS SELECT "Auth"."User"."Id" AS "UserId", "Auth"."User"."UserName" AS "UserName", "Auth"."Group"."Id" AS "GroupId", "Auth"."Group"."Name" AS "GroupName" FROM "Auth"."UserGroup" INNER JOIN "Auth"."User" ON "Auth"."User"."Id"="Auth"."UserGroup"."UserId" INNER JOIN "Auth"."Group"  ON "Auth"."Group"."Id"="Auth"."UserGroup"."GroupId";

/*AppRole*/
CREATE TABLE IF NOT EXISTS "Auth"."AppRole"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "Image" VARCHAR(32) NOT NULL,
    "Label" VARCHAR(16) NOT NULL,
    "Name"  VARCHAR(16) UNIQUE NOT NULL,
    "GroupId" BIGINT NOT NULL REFERENCES "Auth"."Group" ("Id") ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE VIEW "Auth"."AppRoleAll" AS SELECT "UserName" AS "User", "Image", "Label", "AppRole"."Name" AS "Name", "Auth"."UserGroupAll"."GroupName" AS "Group" FROM "Auth"."AppRole" INNER JOIN "Auth"."UserGroupAll" ON "Auth"."AppRole"."GroupId"="Auth"."UserGroupAll"."GroupId" ORDER BY "Label";


WITH "Ins1" AS (INSERT INTO "Auth"."User"("UserName", "Password") VALUES('root', 'sha256$18ac3e7d43f01689$d50f9743790e7e0ff4cd2dd09ff2e316ae5f8def526da0ee8910db4e941e285b') RETURNING "Id" AS "UserId"), "Ins2" AS (INSERT INTO "Auth"."UserBasicInfo"("UserId", "DocumentType", "DocumentNum", "Country", "Name", "LastName") SELECT "UserId", 'XX', 'XXXXXXXXXX', 'XXXXXX', 'XXX', 'XXX' FROM "Ins1" RETURNING "UserId") INSERT INTO "Auth"."UserComplementaryInfo"("UserId", "Phone", "Email", "Address") SELECT "UserId", 'XXX', 'XXX', 'XXX' FROM "Ins1";

INSERT INTO "Auth"."Group" ("Name") VALUES ('root');
INSERT INTO "Auth"."Group" ("Name") VALUES ('users');

INSERT INTO "Auth"."UserGroup" ("UserId", "GroupId") SELECT "Auth"."User"."Id" AS "UserId", "Auth"."Group"."Id" AS "GroupId" FROM "Auth"."User" INNER JOIN "Auth"."Group" ON "Auth"."User"."UserName"='root' AND "Auth"."Group"."Name"='root' LIMIT 1;

INSERT INTO "Auth"."AppRole" ("Image", "Label", "Name", "GroupId") SELECT 'user.png', 'Ususarios', 'gusers', "Auth"."Group"."Id" AS "GroupId" FROM "Auth"."Group" WHERE "Auth"."Group"."Name"='root';
INSERT INTO "Auth"."AppRole" ("Image", "Label", "Name", "GroupId") SELECT 'terminal.png', 'App Y Grupo', 'gapprole', "Auth"."Group"."Id" AS "GroupId" FROM "Auth"."Group" WHERE "Auth"."Group"."Name"='root';
INSERT INTO "Auth"."AppRole" ("Image", "Label", "Name", "GroupId") SELECT 'group.png', 'Grupos', 'ggroups', "Auth"."Group"."Id" AS "GroupId" FROM "Auth"."Group" WHERE "Auth"."Group"."Name"='root';
INSERT INTO "Auth"."AppRole" ("Image", "Label", "Name", "GroupId") SELECT 'usergroup.png', 'Usuario Y Grupo', 'gusersgroups', "Auth"."Group"."Id" AS "GroupId" FROM "Auth"."Group" WHERE "Auth"."Group"."Name"='root';

INSERT INTO "Media"("Name", "Type", "FileName", "UserId") SELECT '1cm9vdF8xMjczNjQ4NTc0XzBfCg', 'png', 'user.png', "Id" FROM "Auth"."User" WHERE "UserName"='root';
UPDATE "Auth"."UserComplementaryInfo" SET "Avatar"="Media"."Id" FROM (SELECT "Id" FROM "Media" WHERE "Name"='1cm9vdF8xMjczNjQ4NTc0XzBfCg' AND "Type"='png') AS "Media";
