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
    Q:New ([[SELECT "Number" FROM "AccountingNote" ORDER BY "Number" DESC LIMIT 1;]]);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end


--AutoFill
if Method == "AutoFill" then
    local Number = Http.Request ("Number");
    local Q = Sql.Query;
    Q:New ([[SELECT "Number", "Date", "Concept", "Code", "Name", "Partial", "Debit", "Credit" FROM "AccountingNoteAll" WHERE "Number"=? ORDER BY "Code" ASC;]]);
    Q:SetNumber (Number);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end
    

--Insert
if Method == "Insert" then
    local Number = Http.Request ("Number");
    local Date = Http.Request ("Date");
    local Concept = Http.Request ("Concept");
    
    local R, Err = db:query ("BEGIN;");
    
    local Q = Sql.Query;
    Q:New ([[INSERT INTO "AccountingNote"("Number", "Date", "Concept") VALUES(?, ?, ?);]]);
    Q:SetNumber (Number);
    Q:SetString (Date);
    Q:SetString (Concept);
    
    local R, Err = db:query (Q.Stm);
    if not R then
        Http.Response ({Error = Err});
        db:query ("ROLLBACK;");
        return;
    end
    
    local Records = Http.Request ("Records");

    for i, o in pairs(Records) do
        Q:New ([[INSERT INTO "AccountingNoteRecord"("AccountingNoteId", "AccountingAccountId", "Partial", "Debit", "Credit")
            SELECT "AccountingNote"."Id", "AccountingAccount"."Id", ?, ?, ? FROM "AccountingNote" INNER JOIN "AccountingAccount" ON "AccountingNote"."Number"=? AND "AccountingAccount"."Code"=?;]]);
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
    local Date = Http.Request ("Date");
    local Concept = Http.Request ("Concept");

    local Q = Sql.Query;
    Q:New ([[UPDATE "AccountingNote" SET "Date"=?, "Concept"=? WHERE "Number"=?;]]);
    
    Q:SetString (Date);
    Q:SetString (Concept);
    Q:SetNumber (Number);
    
    local R, Err = db:query ("BEGIN;");
    R, Err = db:query (Q.Stm);
    if not R then
        Http.Response ({Error = "Error en update"});
        db:query ("ROLLBACK;");
        return;
    end

    Q:New ([[DELETE FROM "AccountingNoteRecord" USING "AccountingNote" WHERE "AccountingNoteId"="AccountingNote"."Id" AND "Number"=?]]);
    Q:SetNumber (Number);

    R, Err = db:query (Q.Stm);
    if not R then
        Http.Response ({Error = "Error en delete records"});
        db:query ("ROLLBACK;");
        return;
    end

    local Records = Http.Request ("Records");

    for i, o in pairs(Records) do
        Q:New ([[INSERT INTO "AccountingNoteRecord"("AccountingNoteId", "AccountingAccountId", "Partial", "Debit", "Credit")
            SELECT "AccountingNote"."Id", "AccountingAccount"."Id", ?, ?, ? FROM "AccountingNote" INNER JOIN "AccountingAccount" ON "AccountingNote"."Number"=? AND "AccountingAccount"."Code"=?;]]);
        Q:SetNumber (Records[i].Partial);
        Q:SetNumber (Records[i].Debit);
        Q:SetNumber (Records[i].Credit);
        Q:SetNumber (Records[i].Number);
        Q:SetString (Records[i].Code);
        
        R, Err = db:query (Q.Stm);
        if not R then
            Http.Response ({Error = "Error en records, rollback"});
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
    Q:New ([[DELETE FROM "AccountingNote" WHERE "Number"=?;]]);
    Q:SetNumber (Number);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end

db:keepalive ();