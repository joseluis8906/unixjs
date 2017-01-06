/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  joseluis
 * Created: Jan 2, 2017
 */

CREATE TABLE IF NOT EXISTS "auth_user"
(
    "id" BIGSERIAL PRIMARY KEY,
    "document" VARCHAR(16) NOT NULL,
    "document_type" VARCHAR(8) NOT NULL,
    UNIQUE ("document", "document_type")
);
        
CREATE TABLE IF NOT EXISTS "auth_password"
(
    "id" BIGSERIAL PRIMARY KEY,
    "auth_user_id" BIGINT NOT NULL REFERENCES "auth_user" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
    "password" VARCHAR(256) NOT NULL
);
        
CREATE TABLE IF NOT EXISTS "auth_group"
(
    "id" BIGSERIAL PRIMARY KEY,
    "name" VARCHAR(32) UNIQUE NOT NULL
);
        
CREATE TABLE IF NOT EXISTS "auth_user_group"
(
    "user_id" BIGINT NOT NULL REFERENCES "auth_user" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
    "group_id" BIGINT NOT NULL REFERENCES "auth_group" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
    UNIQUE ("user_id", "group_id")
);

INSERT INTO "auth_user" ("document", "document_type") VALUES ('root', 'xxxxxxxx');
INSERT INTO "auth_group" ("name") VALUES ('root');
INSERT INTO "auth_group" ("name") VALUES ('user');