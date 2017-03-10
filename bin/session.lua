local pgmoon_module = require("pgmoon");
local redis_module = require ("resty.redis");
local cookie_module = require ("resty.cookie");
local cjson = require ("cjson");

--content type
ngx.header.content_type = "application/json; charset=utf-8";


function GenerateSessionId (PseudoId)
    local Dict = "0X1P2QV4cCUdeAfgMhijEklmnS5OpZ@qrKsWt9vIw7by6zBu-DF3H.x8JaL_NRoTYG";
    local DictLen = string.len (Dict);
    local Index = 0;
    local Pch = 0;
    local SessionId = "";
    local Salt = os.time();
    PseudoId = string.sub(tostring(Salt-64), -3, -1)..PseudoId..string.sub(tostring(Salt+64), -3, -1);
    local Len = string.len (PseudoId);
    print (PseudoId);

    for i=1, Len do
        Index = string.find (Dict, string.sub (PseudoId, i, i));
        Index = Index + 13;
        
        if Index > DictLen then
            Index = Index - DictLen;
        end
        
        SessionId = SessionId..string.sub(Dict, Index, Index);
    end

    return SessionId;
end


--pgmoon
local pgmoon = pgmoon_module.new({
  host = "127.0.0.1",
  port = "5432",
  database = "unixjs",
  user = "unixjs",
  password = "K3J9 8LMN 02F3 B3LW"
});
assert(pgmoon:connect());

--redis
local redis = redis_module:new();
--redis:set_timeout(1000);
local redis_res, err = redis:connect("127.0.0.1", 6379);
if not redis_res then
    ngx.say(cjson.encode({Error = "failed to connect: "..err}));
    return
end

redis_res, err = redis:auth("K3J9 8LMN 02F3 B3LW");
if not redis_res then
    ngx.say(cjson.encode({Error = err}));
    return
end

--cookie
local cookie, err = cookie_module:new()
if not cookie then
    ngx.say(cjson.encode({Error = err}));
    return
end

--post args
ngx.req.read_body();
local args, err = ngx.req.get_post_args();
if not args then
    ngx.say(cjson.encode({Error = "failed to get post args: "..err}));
    return;
end


local username;
local password;
--looking for UserName and Password in post
for key, val in pairs(args) do
    if key == "UserName" then
        username = val;
    end
    if key == "Password" then
        password = val;
    end
end

if not username and not password then
    ngx.say(cjson.encode ({Error = "keys UserName and Password not found"}));
    return;
end

--select user from post args
local Q = ("SELECT \"UserName\" FROM \"AuthUser\" WHERE \"UserName\"='%s' AND \"Password\"='%s';"):format (username, password);
local result, err, partial, num_queries = pgmoon:query (Q);
if not result then
    ngx.say(cjson.encode ({Error = err}));
    return;
end

if table.getn(result) == 0 then
    ngx.say(cjson.encode ({Error = "No users found"}));
    return;
end


local SessionId = "";
--foreach username value
for i, o in ipairs (result) do
    for k, v in pairs (o) do
        if k == "UserName" then
            SessionId = GenerateSessionId (v);
            break;
        end
    end
end


redis_res, err = redis:hmset(("SessionId:%s"):format(SessionId), "UserName", username);
if not redis_res then
    ngx.say(cjson.encode ({Error = err}));
    return;
end

redis_res, err = redis:expire(("SessionId:%s"):format(SessionId), 300);
if not redis_res then
    ngx.say(cjson.encode ({Error = err}));
    return
end

local ok, err = cookie:set({
    key = "SessionId", 
    value = SessionId,
    max_age = 300,
    path = "/",
    secure = false, 
    httponly = false,
});

if not ok then
    ngx.say(cjson.encode({Error = err}));
    return
end

redis_res, err = redis:set_keepalive(10000, 100)
if not redis_res then
    ngx.say(cjson.encode ({Error = err}));
    return
end

pgmoon:keepalive();

ngx.say (cjson.encode ({Result = true}));