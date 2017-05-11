
--[[
    Lua 5.1 Copyright (C) 1994-2006 Lua.org, PUC-Rio
]]

local Http = require ("contrib/http");
local Sql = require ("contrib/sql");
local Session = require ("contrib/session");

local pgmoon = require("pgmoon");
local db = pgmoon.new(Sql.Conf);
assert(db:connect());

local Pass = Session.LoginRequired ();
if not Pass then
    Http.Response ({Result = 0, Error = "Login required"});
    return;
end

local Method = Http.Request ("Method");

--[[
--select
if Method == "Select" then
    local Code = Http.Request ("Code");
    local Q = Sql.Query;
    Q:New ([[SELECT "Name" FROM "AccountingAccount" WHERE "Code"=?;]\]);
    Q:SetString (Code);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end
]]

--insert
if Method == "Insert" then
    local UserName = Http.Request ("UserName");
    local GroupName = Http.Request ("GroupName");
    local Q = Sql.Query;
    Q:New ([[INSERT INTO "Auth"."UserGroup"("UserId", "GroupId") SELECT "Auth"."User"."Id" AS "UserId", "Auth"."Group"."Id" AS "GroupId" FROM "Auth"."User" INNER JOIN "Auth"."Group" ON "Auth"."User"."UserName"=? AND "Auth"."Group"."Name"=? LIMIT 1;]]);
    Q:SetString (UserName);
    Q:SetString (GroupName);
    local R, Err = db:query (Q.Stm);
    if not R then
        Http.Response ({Error = Err});
        return;
    end
    Http.Response (R);
    return;
end

--[[
--update
if Method == "Update" then
    local Code = Http.Request ("Code");
    local Name = Http.Request ("Name");
    local Q = Sql.Query;
    Q:New ([[UPDATE "AccountingAccount" SET "Name"=? WHERE "Code"=?;]\]);
    Q:SetString (Name);
    Q:SetString (Code);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end
]]

--delete
if Method == "Delete" then
    local UserName = Http.Request ("UserName");
    local GroupName = Http.Request ("GroupName");
    local Q = Sql.Query;
    Q:New ([[DELETE FROM "Auth"."UserGroup" WHERE "UserId"=(SELECT "Id" FROM "Auth"."User" WHERE "UserName"=?) AND "GroupId"=(SELECT "Id" FROM "Auth"."Group" WHERE "Name"=?);]]);
    Q:SetString (UserName);
    Q:SetString (GroupName);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end

db:keepalive ();
