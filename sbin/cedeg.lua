--[[
    Lua 5.1 Copyright (C) 1994-2006 Lua.org, PUC-Rio
]]

local Http = require ("contrib/http");
local Sql = require ("contrib/sql");
local Session = require ("contrib/session");

local pgmoon = require("pgmoon");
local db = pgmoon.new(Sql.Conf);
assert(db:connect());

local Pass = Session.LoginRequired ();
if not Pass then
    Http.Response ({Result = "Login required"});
    return;
end

local Method = Http.Request ("Method");


--CheckCode
if Method == "CheckCode" then
    local Code = Http.Request ("Code");
    local Q = Sql.Query;
    Q:New ([[SELECT "Name" FROM "AccountingAccount" WHERE "Code"=?;]]);
    Q:SetString (Code);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end


--NextNumber
if Method == "NextNumber" then
    local Q = Sql.Query;
    Q:New ([[SELECT "Number" FROM "AccountingDisbVou" ORDER BY "Number" DESC LIMIT 1;]]);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end


--AutoFill
if Method == "AutoFill" then
    local Number = Http.Request ("Number");
    local Q = Sql.Query;
    Q:New ([[SELECT "Number", "Place", "Date", "Holder", "Concept", "Bank", "Check", "CheckingAccount", "Amount", "Code", "Name", "Partial", "Debit", "Credit" FROM "AccountingDisbVouAll" WHERE "Number"=?;]]);
    Q:SetNumber (Number);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end


--Insert
if Method == "Insert" then
    local Number = Http.Request ("Number");
    local Place = Http.Request ("Place");
    local Date = Http.Request ("Date");
    local Holder = Http.Request ("Holder");
    local Concept = Http.Request ("Concept");
    local Bank = Http.Request ("Bank");
    local Check = Http.Request ("Check");
    local CheckingAccount = Http.Request ("CheckingAccount");
    local Amount = Http.Request ("Amount");

    local R, Err = db:query ("BEGIN;");

    local Q = Sql.Query;
    Q:New ([[WITH "ins1" AS (INSERT INTO "AccountingDisbVou"("Number", "Place", "Date", "Holder", "Concept")
        VALUES(?, ?, ?, ?, ?) RETURNING "Id")
        INSERT INTO "AccountingDisbVouBank"("AccountingDisbVouId", "Bank", "Check", "CheckingAccount", "Amount")
        SELECT "Id", ?, ?, ?, ? FROM "ins1";]]);
    Q:SetNumber (Number);
    Q:SetString (Place);
    Q:SetString (Date);
    Q:SetString (Holder);
    Q:SetString (Concept);
    Q:SetString (Bank);
    Q:SetString (Check);
    Q:SetString (CheckingAccount);
    Q:SetString (Amount);

    local R, Err = db:query (Q.Stm);
    if not R then
        Http.Response ({Error = Err});
        db:query ("ROLLBACK;");
        return;
    end

    local Records = Http.Request ("Records");

    for i, o in pairs(Records) do
        Q:New ([[INSERT INTO "AccountingDisbVouRecord"("AccountingDisbVouId", "AccountingAccountId", "Partial", "Debit", "Credit")
            SELECT "AccountingDisbVou"."Id", "AccountingAccount"."Id", ?, ?, ? FROM "AccountingDisbVou" INNER JOIN "AccountingAccount" ON "AccountingDisbVou"."Number"=? AND "AccountingAccount"."Code"=?;]]);
        Q:SetNumber (Records[i].Partial);
        Q:SetNumber (Records[i].Debit);
        Q:SetNumber (Records[i].Credit);
        Q:SetNumber (Records[i].Number);
        Q:SetString (Records[i].Code);

        R, Err = db:query (Q.Stm);
        if not R then
            Http.Response ({Error = Err});
            db:query ("ROLLBACK;");
            return;
        end
    end

    R = db:query ("COMMIT;");
    Http.Response ({affected_rows=1});
    return;
end


--ngx.log(ngx.ERR, Q.Stm);
--Update
if Method == "Update" then
    local Number = Http.Request ("Number");
    local Place = Http.Request ("Place");
    local Date = Http.Request ("Date");
    local Holder = Http.Request ("Holder");
    local Concept = Http.Request ("Concept");
    local Bank = Http.Request ("Bank");
    local Check = Http.Request ("Check");
    local CheckingAccount = Http.Request ("CheckingAccount");
    local Amount = Http.Request ("Amount");

    local Q = Sql.Query;
    Q:New ([[UPDATE "AccountingDisbVou" SET "Place"=?, "Date"=?, "Holder"=?, "Concept"=? WHERE "Number"=?;
            UPDATE "AccountingDisbVouBank" SET "Bank"=?, "Check"=?, "CheckingAccount"=?, "Amount"=? FROM "AccountingDisbVou" WHERE  "AccountingDisbVouId"="AccountingDisbVou"."Id" AND "AccountingDisbVou"."Number"=?]]);

    Q:SetString (Place);
    Q:SetString (Date);
    Q:SetString (Holder);
    Q:SetString (Concept);
    Q:SetNumber (Number);

    Q:SetString (Bank);
    Q:SetString (Check);
    Q:SetString (CheckingAccount);
    Q:SetNumber (Amount);
    Q:SetNumber (Number);

    local R, Err = db:query ("BEGIN;");
    R, Err = db:query (Q.Stm);
    if not R then
        Http.Response ({Error = "Error en update"});
        db:query ("ROLLBACK;");
        return;
    end

    Q:New ([[DELETE FROM "AccountingDisbVouRecord" USING "AccountingDisbVou" WHERE "AccountingDisbVouId"="AccountingDisbVou"."Id" AND "Number"=?]]);
    Q:SetNumber (Number);

    R, Err = db:query (Q.Stm);
    if not R then
        Http.Response ({Error = "Error en delete records"});
        db:query ("ROLLBACK;");
        return;
    end

    local Records = Http.Request ("Records");

    for i, o in pairs(Records) do
        Q:New ([[INSERT INTO "AccountingDisbVouRecord"("AccountingDisbVouId", "AccountingAccountId", "Partial", "Debit", "Credit")
            SELECT "AccountingDisbVou"."Id", "AccountingAccount"."Id", ?, ?, ? FROM "AccountingDisbVou" INNER JOIN "AccountingAccount" ON "AccountingDisbVou"."Number"=? AND "AccountingAccount"."Code"=?;]]);
        Q:SetNumber (Records[i].Partial);
        Q:SetNumber (Records[i].Debit);
        Q:SetNumber (Records[i].Credit);
        Q:SetNumber (Records[i].Number);
        Q:SetString (Records[i].Code);

        R, Err = db:query (Q.Stm);
        if not R then
            Http.Response ({Error = "Error en records rollback"});
            db:query ("ROLLBACK;");
            return;
        end
    end

    R = db:query ("COMMIT;");
    Http.Response ({affected_rows=1});
    return;
end



--Delete
if Method == "Delete" then
    local Number = Http.Request ("Number");
    local Q = Sql.Query;
    Q:New ([[DELETE FROM "AccountingDisbVou" WHERE "Number"=?;]]);
    Q:SetNumber (Number);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end

db:keepalive ();
