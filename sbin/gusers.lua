--[[
    Lua 5.1 Copyright (C) 1994-2006 Lua.org, PUC-Rio
]]

local Http = require ("contrib/http");
local Sql = require ("contrib/sql");
local Session = require ("contrib/session");
local Crypt = require ("contrib/crypt");

local pgmoon = require("pgmoon");
local db = pgmoon.new(Sql.Conf);
assert(db:connect());

local Pass = Session.LoginRequired ();
if not Pass then
    Http.Response ({Result = 0, Error = "Login required"});
    return;
end

local Method = Http.Request ("Method");


--select
if Method == "Select" then
    local UserName = Http.Request ("UserName");
    local Q = Sql.Query;
    Q:New ([[SELECT "DocumentType", "DocumentNum", "Country", "Name", "LastName", "AvatarName", "AvatarType", "Phone", "Email", "Address" FROM "Auth"."UserAll" WHERE "UserName"=?;]]);
    Q:SetString (UserName);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end


--insert
if Method == "Insert" then
    local UserName = Http.Request ("UserName");
    local Password = Http.Request ("Password");
    local DocumentType = Http.Request ("DocumentType");
    local DocumentNum = Http.Request ("DocumentNum");
    local Country = Http.Request ("Country");
    local Name = Http.Request ("Name");
    local LastName = Http.Request ("LastName");
    local Phone = Http.Request ("Phone");
    local Email = Http.Request ("Email");
    local Address = Http.Request ("Address");
    local AvatarName = Http.Request ("AvatarName");
    local AvatarType = Http.Request ("AvatarType");
    local R, Err = db:query ([[BEGIN;]]);
    local Q = Sql.Query;
    Q:New ([[WITH "Ins1" AS (INSERT INTO "Auth"."User"("UserName", "Password") VALUES(?, ?) RETURNING "Id" AS "UserId"),
        "Ins2" AS (INSERT INTO "Auth"."UserBasicInfo" ("UserId", "DocumentType", "DocumentNum", "Country", "Name", "LastName")
        SELECT "UserId", ?, ?, ?, ?, ? FROM "Ins1" RETURNING "UserId"),
        "Ins3" AS (INSERT INTO "Auth"."UserComplementaryInfo" ("UserId", "Avatar", "Phone", "Email", "Address")
        SELECT "Ins1"."UserId", "Media"."Id", ?, ?, ? FROM "Ins1" INNER JOIN "Media" ON "Media"."Name"=? AND "Media"."Type"=? RETURNING "UserId")
        UPDATE "Media" SET "UserId"="Ins1"."UserId" FROM (SELECT "UserId" FROM "Ins1") AS "Ins1" WHERE "Media"."Name"=? AND "Media"."Type"=?;]]);
    Q:SetString (UserName);
    Q:SetString (Crypt.CryptPassw(Password));
    Q:SetString (DocumentType);
    Q:SetString (DocumentNum);
    Q:SetString (Country);
    Q:SetString (Name);
    Q:SetString (LastName);
    Q:SetString (Phone);
    Q:SetString (Email);
    Q:SetString (Address);
    Q:SetString (AvatarName);
    Q:SetString (AvatarType);
    Q:SetString (AvatarName);
    Q:SetString (AvatarType);
    R, Err = db:query (Q.Stm);
    if not R then
        Http.Response ({Error = Err});
        R, Err = db:query ([[ROLLBACK;]]);
        return;
    end
    R, Err = db:query ([[COMMIT;]]);
    Http.Response ({affected_rows = 1});
    return;
end


--update
if Method == "Update" then
    local UserName = Http.Request ("UserName");
    local Password = Http.Request ("Password");
    local DocumentType = Http.Request ("DocumentType");
    local DocumentNum = Http.Request ("DocumentNum");
    local Country = Http.Request ("Country");
    local Name = Http.Request ("Name");
    local LastName = Http.Request ("LastName");
    local Phone = Http.Request ("Phone");
    local Email = Http.Request ("Email");
    local Address = Http.Request ("Address");
    local AvatarName = Http.Request ("AvatarName");
    local AvatarType = Http.Request ("AvatarType");
    local R, Err = db:query ([[BEGIN;]]);
    local Q = Sql.Query;
    if Password == "" then
        Q:New ([[WITH "Udt1" AS (UPDATE "Auth"."UserBasicInfo" SET "DocumentType"=?, "DocumentNum"=?, "Country"=?, "Name"=?, "LastName"=? FROM (SELECT "Id" FROM "Auth"."User" WHERE "UserName"=?) AS "User" WHERE "Auth"."UserBasicInfo"."UserId"="User"."Id" RETURNING "User"."Id" AS "UserId")
            UPDATE "Auth"."UserComplementaryInfo" SET "Avatar"="All"."Id", "Phone"=?, "Email"=?, "Address"=? FROM (SELECT "Udt1"."UserId", "Id", "Name", "Type" FROM "Media" INNER JOIN "Udt2" ON "Name"=? AND "Type"=?) AS "All" WHERE "Auth"."UserComplementaryInfo"."UserId"="All"."UserId";]]);
    else
        Q:New ([[WITH "Udt1" AS (UPDATE "Auth"."User" SET "Password"=? WHERE "UserName"=? RETURNING "Id" AS "UserId"),
            "Udt2" AS (UPDATE "Auth"."UserBasicInfo" SET "DocumentType"=?, "DocumentNum"=?, "Country"=?, "Name"=?, "LastName"=? FROM (SELECT "UserId" FROM "Udt1") AS "Udt1" WHERE "Auth"."UserBasicInfo"."UserId"="Udt1"."UserId" RETURNING "Udt1"."UserId" AS "UserId")
            UPDATE "Auth"."UserComplementaryInfo" SET "Avatar"="All"."Id", "Phone"=?, "Email"=?, "Address"=? FROM (SELECT "Udt2"."UserId", "Id", "Name", "Type" FROM "Media" INNER JOIN "Udt2" ON "Name"=? AND "Type"=?) AS "All" WHERE "Auth"."UserComplementaryInfo"."UserId"="All"."UserId";]]);
        Q:SetString (Password);
    end
    Q:SetString (UserName);
    Q:SetString (DocumentType);
    Q:SetString (DocumentNum);
    Q:SetString (Country);
    Q:SetString (Name);
    Q:SetString (LastName);
    Q:SetString (Phone);
    Q:SetString (Email);
    Q:SetString (Address);
    Q:SetString (AvatarName);
    Q:SetString (AvatarType);
    R, Err = db:query (Q.Stm);
    if not R then
        Http.Response ({Error = Err});
        R, Err = db:query ([[ROLLBACK;]]);
        return;
    end
    R, Err = db:query ([[COMMIT;]]);
    Http.Response ({affected_rows = 1});
    return;
end


--delete
if Method == "Delete" then
    local UserName = Http.Request ("UserName");
    local Q = Sql.Query;
    Q:New ([[DELETE FROM "Auth"."User" WHERE "UserName"=?;]]);
    Q:SetString (UserName);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end

db:keepalive ();
