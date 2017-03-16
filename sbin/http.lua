local cjson = require ("cjson");

function Request (Name)
    ngx.req.read_body();
    local Args, Err = ngx.req.get_post_args();
    if type(Args) == "table" then
        for k, v in pairs(Args) do
            if k == Name then
                return cjson.decode (v);
            end
        end
    end
end



function Response (Arg)
    ngx.header.content_type = "application/json; charset=utf-8";
    if type(Arg) == "table" then
        ngx.say (cjson.encode (Arg));
        return true;
    else
        return false;
    end
end


return {Request = Request, Response = Response}