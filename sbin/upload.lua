--[[
    Lua 5.1 Copyright (C) 1994-2006 Lua.org, PUC-Rio
]]

local upload = require ("resty.upload");
local Http = require ("contrib/http");


function split(inputstr, sep)
    if sep == nil then
        sep = "%s";
    end
    
    local t={}; i=1;
    
    for str in string.gmatch(inputstr, "([^"..sep.."]+)") do
        t[i] = str;
        i = i + 1;
    end
    return t;
end

function FindExt (Table, Str)
    for K, V in ipairs (Table) do
        if Str:sub(-5, -1):find("."..V) then
            return true, V;
        end
    end
    return false;
end

local DocumentsExt = {"txt", "pdf", "ps", "rtf", "wps", "xml", "xps", "odt", "doc", "docm", "docx", "dot", "dotm", "dotx", "csv", "dbf", "DIF", "ods", "prn", "xla", "xlam", "xls", "xlsb", "xlsm", "xlsl", "xlsx", "xlt", "xltm", "xltx", "xlw", "xps", "pot", "potm", "potx", "ppa", "ppam", "pps", "ppsm", "ppsx", "ppt", "pptm", "pptx"};
local AudiosExt = {"mp3", "ogg", "wav", "flac", "pcm", "aiff", "au", "raw", "aac", "mp4a", "wma"};
local ImagesExt = {"jpg", "jpeg", "bmp", "gif", "pcx", "png", "tga", "tiff", "wmp"};
local VideosExt = {"mpeg", "vob", "3gp", "mov", "mp4", "webm", "flv", "mkv", "avi", "ogm"};

local chunk_size = 4096;
local form = upload:new(chunk_size);

local file;
local name; 
local filename;
local path = ngx.var.unixjs.."/share";
local subpath;
local yes, ext;

while true do

    local typ, res, err = form:read();
    
    if not typ then
        ngx.log (ngx.ERR, "failed to read: "..err);
        return;
    end
    
    if typ == "header" and not filename then
        if res[1] == "Content-Disposition" then
            name = split(split(res[2], ";")[2], "=")[2]:gsub("\"", "");
            filename = split(split(res[2], ";")[3], "=")[2]:gsub("\"", "");
            
            yes, ext = FindExt (DocumentsExt, filename);
            subpath="/documents/";
            if not yes then yes, ext = FindExt (AudiosExt, filename);  subpath = "/audios/"; end
            if not yes then yes, ext = FindExt (ImagesExt, filename); subpath = "/images/"; end
            if not yes then yes, ext = FindExt FindExt (VideosExt, filename); subpath = "/videos/"; end
            if not yes then subpath=nil; end
            if subpath then path = path..subpath; end
        end
    end
    
    if typ == "header" and filename then
        if not subpath then
            Http.Response ({Error = "File not supported"});
            return;
        end

        local err=nil;
        file, err = io.open(path..name.."."..ext, "w+");
        if not file then
            ngx.log (ngx.ERR, err);
            return;
        end
    end
        
    if typ == "body" then
        if file then
            file:write(res);
        end

    elseif typ == "part_end" then
        file:close()
        file = nil
    
    elseif typ == "eof" then
        break

    else
        --ngx.log (ngx.ERR, "Unknow error");
    end
    
end
Http.Response ({Result = 1});
