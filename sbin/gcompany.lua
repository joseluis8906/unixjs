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
    local Nit = Http.Request ("Nit");
    local Q = Sql.Query;
    Q:New ([[SELECT "Nit", "Name", "Phone", "Movil", "Address" FROM "Accounting"."Company" WHERE "Nit"=?;]]);
    Q:SetString (Code);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end

if Method == "Insert" then
    local Nit = Http.Request ("Nit");
    local Name = Http.Request ("Name");
    local Phone = Http.Request ("Phone");
    local Movil = Http.Request ("Movil");
    local Address = Http.Request ("Address");
    local Q = Sql.Query;
    Q:New ([[INSERT INTO "Accounting"."Company" ("Nit", "Name", "Phone", "Movil", "Address") VALUES (?, ?, ?, ?, ?)]]);
    Q:SetString (Nit);
    Q:SetString (Name);
    Q:SetString (Phone);
    Q:SetString (Movil);
    Q:SetString (Address);

    local R, Err = db:query (Q.Stm);
    if not R then
        Http.Response ({Error = Err});
        return;
    end
    Http.Response (R);
    return;
end

if Method == "Update" then
    local Nit = Http.Request ("Nit");
    local Name = Http.Request ("Name");
    local Phone = Http.Request ("Phone");
    local Movil = Http.Request ("Movil");
    local Address = Http.Request ("Address");
    local Q = Sql.Query;
    Q:New ([[UPDATE "Accounting"."Company" SET "Nit"=?, "Name"=?, "Phone"=?, "Movil"=?, "Address"=? WHERE "Nit"=?;]]);
    Q:SetString (Nit);
    Q:SetString (Name);
    Q:SetString (Phone);
    Q:SetString (Movil);
    Q:SetString (Address);
    Q:SetString (Nit);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end

db:keepalive ();
