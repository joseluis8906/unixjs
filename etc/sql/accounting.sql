CREATE SCHEMA IF NOT EXISTS "Accounting";

CREATE TABLE IF NOT EXISTS "Accounting"."Company"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "Nit" VARCHAR (64) NOT NULL UNIQUE,
    "Name" VARCHAR (128) NOT NULL,
    "Phone" VARCHAR (16),
    "Movil" VARCHAR (16),
    "Address" VARCHAR (64)
);

CREATE TABLE IF NOT EXISTS "Accounting"."Account"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "Code" VARCHAR(16) UNIQUE NOT NULL,
    "Name" VARCHAR(128) NOT NULL
);

--disbursement vounchers--
CREATE TABLE IF NOT EXISTS "Accounting"."DisbVou"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "Number" BIGINT UNIQUE NOT NULL,
    "Place" VARCHAR(32),
    "Date"  DATE,
    "Holder" VARCHAR(64),
    "Concept" VARCHAR(256)
);

CREATE TABLE IF NOT EXISTS "Accounting"."DisbVouBank"
(
    "DisbVouId" BIGSERIAL PRIMARY KEY NOT NULL REFERENCES "Accounting"."DisbVou" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "Bank" VARCHAR(32),
    "Check" VARCHAR(16),
    "CheckingAccount" VARCHAR(16),
    "Amount" BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS "AccountingDisbVouRecord"
(
    "DisbVouId" BIGSERIAL NOT NULL REFERENCES "Accounting"."DisbVou" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "AccountId" BIGSERIAL NOT NULL REFERENCES "Accounting"."Account" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "Debit" BIGINT,
    "Credit" BIGINT,
    PRIMARY KEY ("DisbVouId", "AccountId")
);

CREATE VIEW "Accounting"."DisbVouAll" AS SELECT "Number", "Place", "Date", "Holder", "Concept", "Bank", "Check", "CheckingAccount", "Amount", "Accounting"."Account"."Code", "Accounting"."Account"."Name", "Debit", "Credit" FROM "Accounting"."DisbVou" INNER JOIN "Accounting"."DisbVouBank" ON "Accounting"."DisbVou"."Id"="Accounting"."DisbVouBank"."DisbVouId" INNER JOIN "Accounting"."DisbVouRecord" ON "Accounting"."DisbVou"."Id"="Accounting"."DisbVouRecord"."DisbVouId" INNER JOIN "Accounting"."Account" ON "Accounting"."Account"."Id"="Accounting"."DisbVouRecord"."AccountId";


--acounting note--
CREATE TABLE IF NOT EXISTS "Accounting"."Note"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "Number" BIGINT UNIQUE NOT NULL,
    "Date" DATE,
    "Concept" VARCHAR(256)
);

CREATE TABLE IF NOT EXISTS "Accounting"."NoteRecord"
(
    "NoteId" BIGSERIAL NOT NULL REFERENCES "Accounting"."Note" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "AccountId" BIGSERIAL NOT NULL REFERENCES "Accounting"."Account" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "Debit" BIGINT,
    "Credit" BIGINT,
    PRIMARY KEY ("NoteId", "AccountId")

);

CREATE VIEW "Accounting"."NoteAll" AS SELECT "Number", "Date", "Concept", "Accounting"."Account"."Code", "Accounting"."Account"."Name", "Debit", "Credit" FROM "Accounting"."Note" INNER JOIN "Accounting"."NoteRecord" ON "Accounting"."Note"."Id"="Accounting"."NoteRecord"."NoteId" INNER JOIN "Accounting"."Account" ON "Accounting"."Account"."Id"="Accounting"."NoteRecord"."AccountId";


--acounting income--
CREATE TABLE IF NOT EXISTS "Accounting"."Income"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "Number" BIGINT UNIQUE NOT NULL,
    "Date" DATE,
    "Concept" VARCHAR(256)
);

CREATE TABLE IF NOT EXISTS "Accounting"."IncomeRecord"
(
    "IncomeId" BIGSERIAL NOT NULL REFERENCES "Accounting"."Income" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "AccountId" BIGSERIAL NOT NULL REFERENCES "Accounting"."Account" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "Debit" BIGINT,
    "Credit" BIGINT,
    PRIMARY KEY ("IncomeId", "AccountId")

);

CREATE VIEW "Accounting"."IncomeAll" AS SELECT "Number", "Date", "Concept", "Accounting"."Account"."Code", "Accounting"."Account"."Name", "Debit", "Credit" FROM "Accounting"."Income" INNER JOIN "Accounting"."IncomeRecord" ON "Accounting"."Income"."Id"="Accounting"."IncomeRecord"."IncomeId" INNER JOIN "Accounting"."Account" ON "Accounting"."Account"."Id"="Accounting"."IncomeRecord"."AccountId";


INSERT INTO "Auth"."Group" ("Name") VALUES ('accounting');
INSERT INTO "AppRole" ("Image", "Label", "Name", "GroupId") SELECT 'basket.svg', 'Cuentas', 'cuentas', "Auth"."Group"."Id" AS "GroupId" FROM "Auth"."Group" WHERE "Auth"."Group"."Name"='accounting';
INSERT INTO "AppRole" ("Image", "Label", "Name", "GroupId") SELECT 'stock_tasks.svg', 'Notas', 'accountingnotes', "Auth"."Group"."Id" AS "GroupId" FROM "Auth"."Group" WHERE "Auth"."Group"."Name"='accounting';
INSERT INTO "AppRole" ("Image", "Label", "Name", "GroupId") SELECT 'text-editor.svg', 'Cedeg', 'cedeg', "Auth"."Group"."Id" AS "GroupId" FROM "Auth"."Group" WHERE "Auth"."Group"."Name"='accounting';
INSERT INTO "AppRole" ("Image", "Label", "Name", "GroupId") SELECT 'hexedit.svg', 'Comping', 'comping', "Auth"."Group"."Id" AS "GroupId" FROM "Auth"."Group" WHERE "Auth"."Group"."Name"='accounting';
INSERT INTO "AppRole" ("Image", "Label", "Name", "GroupId") SELECT 'artha.svg', 'Reportes', 'accountingrep', "Auth"."Group"."Id" AS "GroupId" FROM "Auth"."Group" WHERE "Auth"."Group"."Name"='accounting';
INSERT INTO "AppRole" ("Image", "Label", "Name", "GroupId") SELECT 'hwinfo.svg', 'Info Empresa', 'accountingcompay', "Auth"."Group"."Id" AS "GroupId" FROM "Auth"."Group" WHERE "Auth"."Group"."Name"='accounting';
