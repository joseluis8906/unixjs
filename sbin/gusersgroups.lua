
--[[
    Lua 5.1 Copyright (C) 1994-2006 Lua.org, PUC-Rio
]]

local App = ngx.var.app;
local Http = require (App.."/contrib/http");
local Sql = require (App.."/contrib/sql");
local Session = require (App.."/contrib/session");

local pgmoon = require("pgmoon");
local db = pgmoon.new(Sql.Conf);
assert(db:connect());

local Pass = Session.LoginRequired ();
if not Pass then
    Http.Response ({Result = "Login required"});
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
    Q:New ([[INSERT INTO "AuthUserGroup"("UserId", "GroupId") SELECT "AuthUser"."Id" AS "UserId", "AuthGroup"."Id" AS "GroupId" FROM "AuthUser" INNER JOIN "AuthGroup" ON "AuthUser"."UserName"=? AND "AuthGroup"."Name"=? LIMIT 1);]]);
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
    Q:New ([[DELETE FROM "AuthUserGroup" WHERE "UserId"=(SELECT "Id" FROM "AuthUser" WHERE "UserName"=?) AND "GroupId"=(SELECT "Id" FROM "AuthGroup" WHERE "Name"=?);]]);
    Q:SetString (UserName);
    Q:SetString (GroupName);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end

db:keepalive ();