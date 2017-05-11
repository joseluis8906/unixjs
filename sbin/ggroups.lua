--[[
    Lua 5.1 Copyright (C) 1994-2006 Lua.org, PUC-Rio
]]

local Http = require ("contrib/http");
local Sql = require ("contrib/sql");
local Session =  require ("contrib/session");

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
    local Name = Http.Request ("Name");
    local Q = Sql.Query;
    Q:New ([[SELECT "Name" FROM "Auth"."Group" WHERE "Name"=?;]]);
    Q:SetString (Name);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end


--insert
if Method == "Insert" then
    local Name = Http.Request ("Name");
    local Q = Sql.Query;
    Q:New ([[INSERT INTO "Auth"."Group" ("Name") VALUES (?);]]);
    Q:SetString (Name);
    local R, Err = db:query (Q.Stm);
    if not R then
        Http.Response ({Error = Err});
        return;
    end
    Http.Response (R);
    return;
end


--delete
if Method == "Delete" then
    local Name = Http.Request ("Name");
    local Q = Sql.Query;
    Q:New ([[DELETE FROM "Auth"."Group" WHERE "Name"=?;]]);
    Q:SetString (Name);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end

db:keepalive ();
