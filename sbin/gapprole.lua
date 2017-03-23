--[[
    Lua 5.1 Copyright (C) 1994-2006 Lua.org, PUC-Rio
]]

local Http = require ("contrib/http");
local Sql = require ("contrib/sql");
local Session = require ("contrib/session");

local Pass = Session.LoginRequired ();
if not Pass then
    Http.Response ({Result = "Login required"});
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
    Q:New ([[SELECT "Name", "Label", "Image", "Group" FROM "AppRoleAll" WHERE "Name"=?;]]);
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
    Q:New ([[INSERT INTO "AppRole"("Name", "Label", "Image", "GroupId") SELECT ?, ?, ?, "Id" FROM "AuthGroup" WHERE "AuthGroup"."Name"=?;]]);
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
    Q:New ([[UPDATE "AppRole" SET "Label"=?, "Image"=?, "GroupId"="AuthGroup"."Id" FROM (SELECT "Id" FROM "AuthGroup" WHERE "AuthGroup"."Name"=?) AS "AuthGroup" WHERE "AppRole"."Name"=?;]]);
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
    Q:New ([[DELETE FROM "AppRole" WHERE "Name"=?;]]);
    Q:SetString (Name);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end


db:keepalive ();