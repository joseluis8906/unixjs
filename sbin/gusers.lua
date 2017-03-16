local Http = require ("./sbin/http");
local Sql = require ("./sbin/sql");
local Session = require ("./sbin/session");

local pgmoon = require("pgmoon");
local db = pgmoon.new(Sql.Conf);
assert(db:connect());

local Pass = Session.LoginRequired ();
if not Pass then
    Http.Response ({Result = "Login required"});
    return;
end

local Method = Http.Request ("Method");

if Method == "Select" then
    local UserName = Http.Request ("UserName");
    local Q = Sql.Query;
    Q:New ([[SELECT "DocumentType", "DocumentNum", "Country", "Name", "LastName", "AvatarName", "AvatarType", "Phone", "Email", "Address" FROM "AuthUserAll" WHERE "UserName"=?;]]);
    Q:SetString (UserName);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end    

if Method == "Insert" then
    local Code = Http.Request ("Code");
    local Name = Http.Request ("Name");
    local Q = Sql.Query;
    Q:New ([[INSERT INTO "AccountingAccount" ("Code", "Name") VALUES (?, ?)]]);
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
    Q:New ([[UPDATE "AccountingAccount" SET "Name"=? WHERE "Code"=?;]]);
    Q:SetString (Name);
    Q:SetString (Code);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end

if Method == "Delete" then
    local Code = Http.Request ("Code");
    local Q = Sql.Query;
    Q:New ([[DELETE FROM "AccountingAccount" WHERE "Code"=?;]]);
    Q:SetString (Code);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end

db:keepalive ();