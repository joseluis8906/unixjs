--[[
    Lua 5.1 Copyright (C) 1994-2006 Lua.org, PUC-Rio
]]

package.path = ngx.var.app.."/?.lua;"..package.path
local Http = require ("contrib/http");
local Crypt = require ("contrib/crypt");
local Sql = require ("contrib/sql");


--GenerateSessionId
function GenUid (PseudoId)
    local Dict = "0X1P2QV4cCUdeAfgMhijEklmnS5OpZ@qrKsWt9vIw7by6zBu-DF3Hx8JaL_NRoTYG";
    local DictLen = string.len (Dict);
    local Index = 0;
    local Pch = 0;
    local SessionId = "";
    local Salt = os.time();
    PseudoId = string.sub(tostring(Salt-64), -3, -1)..PseudoId..string.sub(tostring(Salt+64), -3, -1);
    local Len = string.len (PseudoId);
    for i=1, Len do
        Index = string.find (Dict, string.sub (PseudoId, i, i));
        Index = Index + 13;
        if Index > DictLen then
            Index = Index - DictLen;
        end
        SessionId = SessionId..string.sub(Dict, Index, Index);
    end
    return (SessionId);
end


--Method
local Method = Http.Request ("Method");

--Start
if Method == "Start" then
    local UserName = Http.Request ("UserName");
    local Password = Http.Request ("Password");
    local Q = Sql.Query;
    Q:New ([[SELECT "UserName", "Password" FROM "Auth"."User" WHERE "UserName"=? LIMIT 1;]]);
    Q:SetString (UserName);
    local pgmoon = require ("pgmoon");
    local db = pgmoon.new(Sql.Conf);
    assert(db:connect());
    local Res, Err = db:query (Q.Stm);
    if table.getn(Res) == 0 then
        Http.Response ({Result = 0});
        db:keepalive();
        return;
    end
    if not Crypt.CheckPassw(Password, Res[1].Password) then
        Http.Response ({Result = 0});
        return;
    end
    db:keepalive();
    local Session = require ("resty.session").start();
    --Session.cookie.lifetime = 60;
    Session.cookie.persistent = true;
    Session.data.uid = UserName;
    Session:save ();
    Http.Response ({Result = 1});
    return;
end

--Renew
if Method == "Renew" then
    local Session = require ("resty.session").open();
    if not Session.data.uid then
        Http.Response ({Result = 0});
        return false;
    end
    --Session.cookie.lifetime = 60;
    --Session:save ();
    Http.Response ({Result = 1});
    return;
end

--Terminate
if Method == "Terminate" then
    local Session = require ("resty.session").start();
    Session:destroy ();
    Http.Response ({Result = 1});
    return;
end


--LoginRequired
function LoginRequired ()
    local Session = require ("resty.session").open();
    if not Session.data.uid then
        return false;
    end
    --Session.cookie.lifetime = 60;
    --Session:save ();
    return true;
end


--GetUser
function GetUser ()
    local Session = require ("resty.session").open();
    if not Session.data.uid then
        return "";
    end
    return Session.data.uid;
end

return {LoginRequired = LoginRequired, GetUser = GetUser}
