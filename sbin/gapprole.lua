--[[
    Lua 5.1 Copyright (C) 1994-2006 Lua.org, PUC-Rio
]]

local Http = require ("contrib/http");
local Sql = require ("contrib/sql");
local Session = require ("contrib/session");

local Pass = Session.LoginRequired ();
if not Pass then
    Http.Response ({Result = 0, Error = "Login required"});
    return;
end

local pgmoon = require("pgmoon");
local db = pgmoon.new(Sql.Conf);
assert(db:connect());

local Method = Http.Request ("Method");

--Select
if Method == "Select" then
    local Name = Http.Request ("Name");
    local Q = Sql.Query;
    Q:New ([[SELECT "Name", "Label", "Image", "Group" FROM "Auth"."AppRoleAll" WHERE "Name"=?;]]);
    Q:SetString (Name);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end

--Insert
if Method == "Insert" then
    local Name = Http.Request ("Name");
    local Label = Http.Request ("Label");
    local Image = Http.Request ("Image");
    local Group = Http.Request ("Group");
    local Q = Sql.Query;
    Q:New ([[INSERT INTO "Auth"."AppRole"("Name", "Label", "Image", "GroupId") SELECT ?, ?, ?, "Id" FROM "Auth"."Group" WHERE "Auth"."Group"."Name"=?;]]);
    Q:SetString (Name);
    Q:SetString (Label);
    Q:SetString (Image);
    Q:SetString (Group);
    local R, Err = db:query (Q.Stm);
    if not R then
        Http.Response ({Error = Err});
        return;
    end
    Http.Response (R);
    return;
end


--Update
if Method == "Update" then
    local Name = Http.Request ("Name");
    local Label = Http.Request ("Label");
    local Image = Http.Request ("Image");
    local Group = Http.Request ("Group");
    local Q = Sql.Query;
    Q:New ([[UPDATE "Auth"."AppRole" SET "Label"=?, "Image"=?, "GroupId"="Auth"."Group"."Id" FROM (SELECT "Id" FROM "Auth"."Group" WHERE "Auth"."Group"."Name"=?) AS "Auth"."Group" WHERE "Auth"."AppRole"."Name"=?;]]);
    Q:SetString (Label);
    Q:SetString (Image);
    Q:SetString (Group);
    Q:SetString (Name);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end


--Delete
if Method == "Delete" then
    local Name = Http.Request ("Name");
    local Q = Sql.Query;
    Q:New ([[DELETE FROM "Auth"."AppRole" WHERE "Name"=?;]]);
    Q:SetString (Name);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end


db:keepalive ();
