/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  joseluis
 * Created: Jan 2, 2017
 */

CREATE TABLE IF NOT EXISTS "AuthUser"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "DocumentType" VARCHAR(8) NOT NULL,    
    "DocumentNum" VARCHAR(16) NOT NULL,
    "Password" VARCHAR(256) NOT NULL
    UNIQUE ("DocumentType", "DocumentNum")
);

CREATE TABLE IF NOT EXISTS "AuthUserInfo"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "UserId" BIGINT NOT NULL REFERENCES "AuthUser" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "Name" VARCHAR(64) NOT NULL,
    "LastName" VARCHAR(64) NOT NULL,
    "Phone" VARCHAR(24) NOT NULL,
    "Email" VARCHAR(24) NOT NULL,
    "Address" VARCHAR(64) NOT NULL,
);
        
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

INSERT INTO "AuthUser" ("DocumentType", "DocumentNum", "Pasword") VALUES ('root', 'root', );
INSERT INTO "AuthGroup" ("Name") VALUES ('root');
INSERT INTO "AuthGroup" ("Name") VALUES ('users');