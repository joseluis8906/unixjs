/*
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
    "UserId" BIGINT PRIMARY KEY NOT NULL REFERENCES "AuthUser" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "DocumentType" VARCHAR(8) NOT NULL,
    "DocumentNum" VARCHAR(16) NOT NULL,
    "Country" VARCHAR(64) NOT NULL,
    "Name" VARCHAR(64) NOT NULL,
    "LastName" VARCHAR(64) NOT NULL,
    UNIQUE ("DocumentType", "DocumentNum", "Country")
);

CREATE TABLE IF NOT EXISTS "AuthUserComplementaryInfo"
(
    "UserId" BIGINT PRIMARY KEY NOT NULL REFERENCES "AuthUser" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "Avatar" BIGINT REFERENCES "Media" ("Id") UNIQUE,
    "Phone" VARCHAR(24),
    "Email" VARCHAR(64),
    "Address" VARCHAR(64)
);

CREATE VIEW "AuthUserAll" AS SELECT "UserName", "Password", "DocumentType", "DocumentNum", "Country", "AuthUserBasicInfo"."Name" AS "Name", "LastName", "Media"."Name" AS "AvatarName", "Media"."Type" AS "AvatarType", "Phone", "Email", "Address" FROM "AuthUser" INNER JOIN "AuthUserBasicInfo" ON "AuthUser"."Id" = "AuthUserBasicInfo"."UserId" INNER JOIN "AuthUserComplementaryInfo" ON "AuthUser"."Id" = "AuthUserComplementaryInfo"."UserId" INNER JOIN "Media" ON "Media"."Id" = "AuthUserComplementaryInfo"."Avatar";
       
CREATE TABLE IF NOT EXISTS "AuthGroup"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "Name" VARCHAR(32) UNIQUE NOT NULL
);

INSERT INTO "AuthGroup" ("Name") VALUES ('root');
INSERT INTO "AuthGroup" ("Name") VALUES ('users');        

WITH "Ins1" AS (INSERT INTO "AuthUser"("UserName", "Password") VALUES('root', 'sha256$18ac3e7d43f01689$d50f9743790e7e0ff4cd2dd09ff2e316ae5f8def526da0ee8910db4e941e285b') RETURNING "Id" AS "UserId"), "Ins2" AS (INSERT INTO "AuthUserBasicInfo"("UserId", "DocumentType", "DocumentNum", "Country", "Name", "LastName") SELECT "UserId", 'XX', 'XXXXXXXXXX', 'XXXXXX', 'XXX', 'XXX' FROM "Ins1" RETURNING "UserId") INSERT INTO "AuthUserComplementaryInfo"("UserId", "Phone", "Email", "Address") SELECT "UserId", 'XXX', 'XXX', 'XXX' FROM "Ins1";

CREATE TABLE IF NOT EXISTS "AuthUserGroup"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "UserId" BIGINT NOT NULL REFERENCES "AuthUser" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "GroupId" BIGINT NOT NULL REFERENCES "AuthGroup" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    UNIQUE ("UserId", "GroupId")
);

INSERT INTO "AuthUserGroup" ("UserId", "GroupId") SELECT "AuthUser"."Id" AS "UserId", "AuthGroup"."Id" AS "GroupId" FROM "AuthUser" INNER JOIN "AuthGroup" ON "AuthUser"."UserName"='root' AND "AuthGroup"."Name"='root' LIMIT 1;

CREATE VIEW "AuthUserGroupAll" AS SELECT "AuthUser"."Id" AS "UserId", "AuthUser"."UserName" AS "UserName", "AuthGroup"."Id" AS "GroupId", "AuthGroup"."Name" AS "GroupName" FROM "AuthUserGroup" INNER JOIN "AuthUser" ON "AuthUser"."Id"="AuthUserGroup"."UserId" INNER JOIN "AuthGroup"  ON "AuthGroup"."Id"="AuthUserGroup"."GroupId";


/*AppRole*/
CREATE TABLE IF NOT EXISTS "AppRole"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "Image" VARCHAR(32) NOT NULL,
    "Label" VARCHAR(16) NOT NULL,
    "Name"  VARCHAR(16) UNIQUE NOT NULL,
    "GroupId" BIGINT NOT NULL REFERENCES "AuthGroup" ("Id") ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO "AppRole" ("Image", "Label", "Name", "GroupId") SELECT 'user.png', 'Ususarios', 'gusers', "AuthGroup"."Id" AS "GroupId" FROM "AuthGroup" WHERE "AuthGroup"."Name"='root'; 
INSERT INTO "AppRole" ("Image", "Label", "Name", "GroupId") SELECT 'terminal.png', 'App Y Grupo', 'gapprole', "AuthGroup"."Id" AS "GroupId" FROM "AuthGroup" WHERE "AuthGroup"."Name"='root'; 
INSERT INTO "AppRole" ("Image", "Label", "Name", "GroupId") SELECT 'group.png', 'Grupos', 'ggroups', "AuthGroup"."Id" AS "GroupId" FROM "AuthGroup" WHERE "AuthGroup"."Name"='root'; 
INSERT INTO "AppRole" ("Image", "Label", "Name", "GroupId") SELECT 'usergroup.png', 'Usuario Y Grupo', 'gusersgroups', "AuthGroup"."Id" AS "GroupId" FROM "AuthGroup" WHERE "AuthGroup"."Name"='root'; 

CREATE VIEW "AppRoleAll" AS SELECT "UserName" AS "User", "Image", "Label", "AppRole"."Name" AS "Name", "AuthUserGroupAll"."GroupName" AS "Group" FROM "AppRole" INNER JOIN "AuthUserGroupAll" ON "AppRole"."GroupId"="AuthUserGroupAll"."GroupId" ORDER BY "Label";


CREATE TABLE IF NOT EXISTS "Media"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "Name" VARCHAR(256) NOT NULL,
    "Type" VARCHAR(8) NOT NULL,
    "FileName" VARCHAR(256) NOT NULL,
    "UserId" BIGINT NOT NULL REFERENCES "AuthUser" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    UNIQUE ("Name", "Type")
);

INSERT INTO "Media"("Name", "Type", "FileName", "UserId") SELECT '1cm9vdF8xMjczNjQ4NTc0XzBfCg', 'png', 'user.png', "Id" FROM "AuthUser" WHERE "UserName"='root';
UPDATE "AuthUserComplementayInfo" SET "Avatar"="Media"."Id" FROM (SELECT "Id" FROM "Media" WHERE "Name"='1cm9vdF8xMjczNjQ4NTc0XzBfCg' AND "Type"='png') AS "Media";