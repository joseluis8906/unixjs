local Http = require ("./sbin/http");
local Sql = require ("./sbin/sql");
local Session = require ("./sbin/session");

--GenerateUid
function GenUid (PseudoId)
    PseudoId = PseudoId:gsub("%.", "");
    local Dict = "0X1P2QV4cCUdeAfgMhijEklmnS5OpZ@qrKsWt9vIw7by6zBu-DF3Hx8JaL_NRoTYG";
    local DictLen = string.len (Dict);
    local Index = 0;
    local Pch = 0;
    local Uid = "";
    local Salt = os.time();
    PseudoId = tostring(Salt-256):sub(-8, -1)..PseudoId..tostring(Salt+256):sub(-8, -1);
    local Len = string.len (PseudoId);
    for i=1, Len do
        Index = string.find (Dict, string.sub (PseudoId, i, i));
        Index = Index + 13;
        if Index > DictLen then
            Index = Index - DictLen;
        end
        Uid = Uid..string.sub(Dict, Index, Index);
    end
    return (Uid);
end


local Pass = Session.LoginRequired ();
if not Pass then
    Http.Response ({Result = "Login required"});
    return;
end

local pgmoon = require("pgmoon");
local db = pgmoon.new(Sql.Conf);
assert(db:connect());

local Method = Http.Request ("Method");

if Method == "Select" then
    local UserName = Http.Request ("UserName");
    local Q = Sql.Query;
    Q:New ([[SELECT "Name", "Type", "FileName" FROM "Media" INNER JOIN "AuthUser" ON "AuthUser"."Id"="Media"."UserId" AND "AuthUser"."UserName"=?;]]);
    Q:SetString (UserName);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end    

if Method == "Insert" then
    local UserName = Http.Request ("UserName");
    local FileName = Http.Request ("FileName");
    local Name = GenUid(UserName.."-"..FileName);
    local Type = Http.Request ("Type");
    local Q = Sql.Query;
    Q:New ([[INSERT INTO "Media" ("Name", "Type", "FileName", "UserId") SELECT ?, ?, ?, "Id" FROM "AuthUser" WHERE "AuthUser"."UserName"=?;]]);
    Q:SetString (Name);
    Q:SetString (Type);
    Q:SetString (FileName);
    Q:SetString (UserName);
    local R, Err = db:query (Q.Stm);
    if not R then
        Http.Response ({Error = Err});
        return;
    end
    Http.Response ({Result = 1, Name = Name, Type = Type});
    return;
end

--[[
if Method == "Update" then
    local Code = Http.Request ("Code");
    local Name = Http.Request ("Name");
    local Q = Sql.Query;
    Q:New ([[UPDATE "AccountingAccount" SET "Name"=? WHERE "Code"=?;\]\]);
    Q:SetString (Name);
    Q:SetString (Code);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end
]]

if Method == "Delete" then
    local Name = Http.Request ("Name");
    local Type = Http.Request ("Type");
    local Q = Sql.Query;
    Q:New ([[DELETE FROM "Media" WHERE "Name"=? AND "Type"=?;]]);
    Q:SetString (Name);
    Q:SetString (Type);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end


db:keepalive ();