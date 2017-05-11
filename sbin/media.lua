--[[
    Lua 5.1 Copyright (C) 1994-2006 Lua.org, PUC-Rio
]]

local Http = require ("contrib/http");
local Sql = require ("contrib/sql");
local Session = require ("contrib/session");

local DocumentsExt = {"txt", "pdf", "ps", "rtf", "wps", "xml", "xps", "odt", "doc", "docm", "docx", "dot", "dotm", "dotx", "csv", "dbf", "DIF", "ods", "prn", "xla", "xlam", "xls", "xlsb", "xlsm", "xlsl", "xlsx", "xlt", "xltm", "xltx", "xlw", "xps", "pot", "potm", "potx", "ppa", "ppam", "pps", "ppsm", "ppsx", "ppt", "pptm", "pptx"};
local AudiosExt = {"mp3", "ogg", "wav", "flac", "pcm", "aiff", "au", "raw", "aac", "mp4a", "wma"};
local ImagesExt = {"jpg", "jpeg", "bmp", "gif", "pcx", "png", "tga", "tiff", "wmp"};
local VideosExt = {"mpeg", "vob", "3gp", "mov", "mp4", "webm", "flv", "mkv", "avi", "ogm"};
local Subpath = ngx.var.unixjs.."/share";

--FindExt
function FindExt (Table, Str)
    for K, V in ipairs (Table) do
        if Str == V then
            return true;
        end
    end
    return false;
end

--GenerateUid
function GenUid (PseudoId)
    PseudoId = PseudoId:gsub("%.", "");
    local Dict = "0X1P2QV4cCUdeAfgMhijEklmnS5OpZ@qrKsWt9vIw7by6zBu-DF3Hx8JaL_NRoTYG";
    local DictLen = string.len (Dict);
    local Index = 0;
    local Pch = 0;
    local Uid = "";
    local Salt1 = os.date("%x_%X"):gsub("/",""):gsub(":", ""):gsub("_", "");
    local Salt2 = os.time();
    PseudoId = Salt1..PseudoId..Salt2;
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
    Http.Response ({Result = 0, Error = "Login required"});
    return;
end

local pgmoon = require("pgmoon");
local db = pgmoon.new(Sql.Conf);
assert(db:connect());

local Method = Http.Request ("Method");

--select
if Method == "Select" then
    local UserName = Http.Request ("UserName");
    local Q = Sql.Query;
    Q:New ([[SELECT "Name", "Type", "FileName" FROM "public"."Media" INNER JOIN "Auth"."User" ON "Auth"."User"."Id"="Media"."UserId" AND "Auth"."User"."UserName"=?;]]);
    Q:SetString (UserName);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end

--insert
if Method == "Insert" then
    local UserName = Http.Request ("UserName");
    local FileName = Http.Request ("FileName");
    local Name = GenUid(UserName.."-"..FileName);
    local Type = Http.Request ("Type");
    local Q = Sql.Query;
    Q:New ([[INSERT INTO "public"."Media" ("Name", "Type", "FileName", "UserId") SELECT ?, ?, ?, "Id" FROM "Auth"."User" WHERE "Auth"."User"."UserName"=?;]]);
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


--update
if Method == "Update" then
    local UserName = Http.Request ("UserName");
    local Name = Http.Request ("Name");
    local Type = Http.Request ("Type");
    local Q = Sql.Query;
    Q:New ([[UPDATE "public"."Media" SET "UserId"="User"."Id" FROM (SELECT "Id" FROM "Auth"."User" WHERE "UserName"=?) AS "User" WHERE "Name"=? AND "Type"=?;]]);
    Q:SetString (UserName);
    Q:SetString (Name);
    Q:SetString (Type);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end


--delete
if Method == "Delete" then
    local Name = Http.Request ("Name");
    local Type = Http.Request ("Type");
    local Q = Sql.Query;
    Q:New ([[DELETE FROM "public"."Media" WHERE "Name"=? AND "Type"=?;]]);
    Q:SetString (Name);
    Q:SetString (Type);
    local R, Err = db:query (Q.Stm);
    if not R then
        Http.Response ({Error = Err});
        return;
    end

    if FindExt(DocumentsExt, Type) then
        os.remove(Subpath.."/documents/"..Name.."."..Type);
    elseif FindExt(AudiosExt, Type) then
        os.remove(Subpath.."/audios/"..Name.."."..Type);
    elseif FindExt(ImagesExt, Type) then
        os.remove(Subpath.."/images/"..Name.."."..Type);
    elseif FindExt(VideosExt, Type) then
        os.remove(Subpath.."/videos/"..Name.."."..Type);
    else

    end

    Http.Response (R);
    return;
end


db:keepalive ();
