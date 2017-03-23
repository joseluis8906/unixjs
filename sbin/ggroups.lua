--[[
    Lua 5.1 Copyright (C) 1994-2006 Lua.org, PUC-Rio
]]

local App = ngx.var.app;
local Http = require (App.."/contrib/http");
local Sql = require (App.."/contrib/sql");
local Session =  require (App.."/contrib/session");

local pgmoon = require("pgmoon");
local db = pgmoon.new(Sql.Conf);
assert(db:connect());

local Pass = Session.LoginRequired ();
if not Pass then
    Http.Response ({Result = "Login required"});
    return;
end

local Method = Http.Request ("Method");


--select
if Method == "Select" then
    local Name = Http.Request ("Name");
    local Q = Sql.Query;
    Q:New ([[SELECT "Name" FROM "AuthGroup" WHERE "Name"=?;]]);
    Q:SetString (Name);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end    


--insert
if Method == "Insert" then
    local Name = Http.Request ("Name");
    local Q = Sql.Query;
    Q:New ([[INSERT INTO "AuthGroup" ("Name") VALUES (?);]]);
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
    Q:New ([[DELETE FROM "AuthGroup" WHERE "Name"=?;]]);
    Q:SetString (Name);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end

db:keepalive ();