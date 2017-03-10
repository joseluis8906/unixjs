local pgmoon_module = require ("pgmoon");
local cjson = require ("cjson");
ngx.header.content_type = "application/json; charset=utf-8";


local pgmoon = pgmoon_module.new({
  host = "127.0.0.1",
  port = "5432",
  database = "unixjs",
  user = "unixjs",
  password = "K3J9 8LMN 02F3 B3LW"
});
assert(pgmoon:connect());

ngx.req.read_body();

local args, err = ngx.req.get_post_args();
if not args then
    ngx.say(cjson.encode({Error = "failed to get post args: "..err}))
    return
end

for key, val in pairs(args) do
    if key == "Query" then
        local result, err, partial, num_queries = pgmoon:query (val);
        if not result then
            ngx.say(cjson.encode ({Error = err}));
            return;
        end
        
        ngx.say (cjson.encode (result));
        return;
    end
end

pgmoon:keepalive();

ngx.say(cjson.encode ({Error = "key Query not found"}));