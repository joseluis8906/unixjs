local cjson = require ("cjson");
local Sql = require ("sql");
local Crypt = require ("crypt");

local cedegjson = [[{
    "number": 1092,
    "holder": "jose luis",
    "records": [{"code": "023", "name": "cuentas por pagar"},{"code": "024", "name": "cuentas por cobrar"}]
}]];

local cedeg = cjson.decode (cedegjson);

--[[
for i, o in ipairs(cedeg.records) do
    print (cedeg.records[i].code);
end

local pgmoon = require("pgmoon");
local db = pgmoon.new({
        host = "127.0.0.1",
        port = "5432",
        database = "unixjs",
        user = "unixjs",
        password = "K3J9 8LMN 02F3 B3LW"
});
assert(db:connect());

local Q = Sql.Query;
Q:New (\[\[SELECT "Number" FROM "AccountingDisbVou" ORDER BY "Number" DESC LIMIT 1;\]\]);
local R = db:query (Q.Stm);
for i,o in ipairs(R) do
    print (cjson.encode(R));
end
]]

--db:keepalive ();

function split(inputstr, sep)
        if sep == nil then
                sep = "%s"
        end
        local t={} ; i=1
        for str in string.gmatch(inputstr, "([^"..sep.."]+)") do
                t[i] = str
                i = i + 1
        end
        return t
end

local str = [[form-data; name="Avatar"; filename="avatar.webm"]];

local name = split(split(str, ";")[2], "=")[2]:gsub("\"", "");
local filename = split(split(str, ";")[3], "=")[2]:gsub("\"", "");


function FindExt (Table, Str)
    for K, V in ipairs (Table) do
        if Str:sub(-5, -1):find("."..V) then
            return true;
        end
    end
    return false;
end

local DocumentsExt = {"txt", "pdf", "ps", "rtf", "wps", "xml", "xps", "odt", "doc", "docm", "docx", "dot", "dotm", "dotx", "csv", "dbf", "DIF", "ods", "prn", "xla", "xlam", "xls", "xlsb", "xlsm", "xlsl", "xlsx", "xlt", "xltm", "xltx", "xlw", "xps", "pot", "potm", "potx", "ppa", "ppam", "pps", "ppsm", "ppsx", "ppt", "pptm", "pptx"};
local MusicExt = {"mp3", "ogg", "wav", "flac", "pcm", "aiff", "au", "raw", "aac", "mp4a", "wma"};
local PicturesExt = {"jpg", "jpeg", "bmp", "gif", "pcx", "png", "tga", "tiff", "wmp"};
local VideosExt = {"mpeg", "vob", "3gp", "mov", "mp4", "webm", "flv", "mkv", "avi", "ogm"};

local c = "av.de.lasds";
--print (c:gsub("%.", ""));

--print (Sha2.hash224(Sha2.hash256 ("joseluis8906")) == "5f8b849742641d6c7526a46ee82ad8b836ed5137bf94de34151036c2");

--local Salt1 = os.date("%x_%X"):gsub("/",""):gsub(":", ""):gsub("_", "");
--local Salt2 = os.time();
print (Crypt.CryptPassw("7297"));