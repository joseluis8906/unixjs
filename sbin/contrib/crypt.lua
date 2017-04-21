--[[
    Lua 5.1 Copyright (C) 1994-2006 Lua.org, PUC-Rio
]]

local Sha2 = require ("contrib/sha2");

--crypt
function CryptPassw (Src)
    math.randomseed(os.time());

    local Alpha = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    local Index = math.random(62);

    local Character = Alpha:sub(Index, Index);

    local Salt = Sha2.hash256 (Character);

    Salt = Salt:sub(1, 16);
    Salt = Salt:sub(1,7)..Character..Salt:sub(9,16);

    Src = Src..Character;

    local Crypted = Sha2.hash256 (Src);

    local Result = "sha256$"..Salt.."$"..Crypted;

    return Result;

end


--check
function CheckPassw (Src, Dest)
    local Character = Dest:sub(15,15);

    local Salt = Sha2.hash256 (Character);

    Salt = Salt:sub(1, 16);
    Salt = Salt:sub(1,7)..Character..Salt:sub(9,16);

    Src = Src..Character;

    local Crypted = Sha2.hash256 (Src);

    local Result = "sha256$"..Salt.."$"..Crypted;

    return Result == Dest;
end


--return
return {CryptPassw = CryptPassw, CheckPassw = CheckPassw}
