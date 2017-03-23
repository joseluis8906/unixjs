--[[
    Lua 5.1 Copyright (C) 1994-2006 Lua.org, PUC-Rio
]]

package.path = ngx.var.app.."/?.lua;"..package.path;
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

--CheckCode
if Method == "Select" then
    local Q = Sql.Query;
    Q:New ([[SELECT "Name", "Label", "Image" FROM "AppRoleAll" WHERE "User"=?;]]);
    Q:SetString (Session.GetUser());
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end 

db:keepalive ();