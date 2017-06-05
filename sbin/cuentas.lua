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

if Method == "Select" then
    local Code = Http.Request ("Code");
    local Q = Sql.Query;
    Q:New ([[SELECT "Name" FROM "Accounting"."Account" WHERE "Code"=?;]]);
    Q:SetString (Code);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end

if Method == "SelectBase" then
    local Q = Sql.Query;
    Q:New ([[SELECT "Code", "Name" FROM "Accounting"."Account" WHERE char_length("Code")=4 ORDER BY "Code" ASC;]]);
    local R, Err = db:query (Q.Stm);
    ngx.log(ngx.ERR, Err)
    Http.Response (R);
    return;
end

if Method == "Insert" then
    local Code = Http.Request ("Code");
    local Name = Http.Request ("Name");
    local Q = Sql.Query;
    Q:New ([[INSERT INTO "Accounting"."Account" ("Code", "Name") VALUES (?, ?)]]);
    Q:SetString (Code);
    Q:SetString (Name);
    local R, Err = db:query (Q.Stm);
    if not R then
        Http.Response ({Error = Err});
        return;
    end
    Http.Response (R);
    return;
end

if Method == "Update" then
    local Code = Http.Request ("Code");
    local Name = Http.Request ("Name");
    local Q = Sql.Query;
    Q:New ([[UPDATE "Accounting"."Account" SET "Name"=? WHERE "Code"=?;]]);
    Q:SetString (Name);
    Q:SetString (Code);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end

if Method == "Delete" then
    local Code = Http.Request ("Code");
    local Q = Sql.Query;
    Q:New ([[DELETE FROM "Accounting"."Account" WHERE "Code"=?;]]);
    Q:SetString (Code);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end

db:keepalive ();
