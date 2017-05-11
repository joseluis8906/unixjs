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
    Http.Response ({Result = 0, Error = "Login required"});
    return;
end

local Method = Http.Request ("Method");

if Method == "Daily" then
    local DateBegin = Http.Request ("DateBegin");
    local DateEnd = Http.Request ("DateEnd");

    local Res = {}

    local Q = Sql.Query;

    Q:New ([[SELECT "Number", "Date", "Code", "Name", "Debit", "Credit" FROM "Accounting"."DisbVouAll" WHERE "Date">=?::DATE AND "Date"<=?::DATE ORDER BY "Number" ASC, "Code" ASC;]]);
    Q:SetString (DateBegin);
    Q:SetString (DateEnd);
    local R1 = db:query (Q.Stm);
    Res.DisbVous = R1;

    Q:New ([[SELECT "Number", "Date", "Code", "Name", "Debit", "Credit" FROM "Accounting"."NoteAll" WHERE "Date">=?::DATE AND "Date"<=?::DATE ORDER BY "Number" ASC, "Code" ASC;]]);
    Q:SetString (DateBegin);
    Q:SetString (DateEnd);
    local R2 = db:query (Q.Stm);
    Res.Notes = R2;

    Q:New ([[SELECT "Number", "Date", "Code", "Name", "Debit", "Credit" FROM "Accounting"."IncomeAll" WHERE "Date">=?::DATE AND "Date"<=?::DATE ORDER BY "Number" ASC, "Code" ASC;]]);
    Q:SetString (DateBegin);
    Q:SetString (DateEnd);
    local R3 = db:query (Q.Stm);
    Res.Incomes = R3;

    Q:New ([[SELECT "Code", "Name" FROM "Accounting"."Account" WHERE char_length("Code")=4 ORDER BY "Code" ASC;]]);
    local R4 = db:query (Q.Stm);
    Res.Accounts = R4;

    Http.Response (Res);
    return;
end

--[[
if Method == "Insert" then
    local Code = Http.Request ("Code");
    local Name = Http.Request ("Name");
    local Q = Sql.Query;
    Q:New ([[INSERT INTO "AccountingAccount" ("Code", "Name") VALUES (?, ?)]\]);
    Q:SetString (Code);
    Q:SetString (Name);
    local R, Err = db:query (Q.Stm);
    if not R then
        Http.Response ({Error = Err});
        return;
    end
    Http.Response (R);
    return;
end

if Method == "Update" then
    local Code = Http.Request ("Code");
    local Name = Http.Request ("Name");
    local Q = Sql.Query;
    Q:New ([[UPDATE "AccountingAccount" SET "Name"=? WHERE "Code"=?;]\]);
    Q:SetString (Name);
    Q:SetString (Code);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end

if Method == "Delete" then
    local Code = Http.Request ("Code");
    local Q = Sql.Query;
    Q:New ([[DELETE FROM "AccountingAccount" WHERE "Code"=?;]\]);
    Q:SetString (Code);
    local R = db:query (Q.Stm);
    Http.Response (R);
    return;
end
]]

db:keepalive ();
