CREATE TABLE IF NOT EXISTS "AccountingCompany"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "Nit" VARCHAR (64) NOT NULL UNIQUE,
    "Name" VARCHAR (128) NOT NULL,
    "Phone" VARCHAR (16),
    "Movil" VARCHAR (16),
    "Address" VARCHAR (64)
);

CREATE TABLE IF NOT EXISTS "AccountingAccount"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "Code" VARCHAR(16) UNIQUE NOT NULL,
    "Name" VARCHAR(128) NOT NULL
);

--disbursement vounchers--
CREATE TABLE IF NOT EXISTS "AccountingDisbVou"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "Number" BIGINT UNIQUE NOT NULL,
    "Place" VARCHAR(32),
    "Date"  DATE,
    "Holder" VARCHAR(64),
    "Concept" VARCHAR(256)
);

CREATE TABLE IF NOT EXISTS "AccountingDisbVouBank"
(
    "AccountingDisbVouId" BIGSERIAL PRIMARY KEY NOT NULL REFERENCES "AccountingDisbVou" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "Bank" VARCHAR(32),
    "Check" VARCHAR(16),
    "CheckingAccount" VARCHAR(16),
    "Amount" BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS "AccountingDisbVouRecord"
(
    "AccountingDisbVouId" BIGSERIAL NOT NULL REFERENCES "AccountingDisbVou" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "AccountingAccountId" BIGSERIAL NOT NULL REFERENCES "AccountingAccount" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "Debit" BIGINT,
    "Credit" BIGINT,
    PRIMARY KEY ("AccountingDisbVouId", "AccountingAccountId")
);

CREATE VIEW "AccountingDisbVouAll" AS SELECT "Number", "Place", "Date", "Holder", "Concept", "Bank", "Check", "CheckingAccount", "Amount", "AccountingAccount"."Code", "AccountingAccount"."Name", "Debit", "Credit" FROM "AccountingDisbVou" INNER JOIN "AccountingDisbVouBank" ON "AccountingDisbVou"."Id"="AccountingDisbVouBank"."AccountingDisbVouId" INNER JOIN "AccountingDisbVouRecord" ON "AccountingDisbVou"."Id"="AccountingDisbVouRecord"."AccountingDisbVouId" INNER JOIN "AccountingAccount" ON "AccountingAccount"."Id"="AccountingDisbVouRecord"."AccountingAccountId";


--acounting note--
CREATE TABLE IF NOT EXISTS "AccountingNote"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "Number" BIGINT UNIQUE NOT NULL,
    "Date" DATE,
    "Concept" VARCHAR(256)
);

CREATE TABLE IF NOT EXISTS "AccountingNoteRecord"
(
    "AccountingNoteId" BIGSERIAL NOT NULL REFERENCES "AccountingNote" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "AccountingAccountId" BIGSERIAL NOT NULL REFERENCES "AccountingAccount" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "Debit" BIGINT,
    "Credit" BIGINT,
    PRIMARY KEY ("AccountingNoteId", "AccountingAccountId")

);

CREATE VIEW "AccountingNoteAll" AS SELECT "Number", "Date", "Concept", "AccountingAccount"."Code", "AccountingAccount"."Name", "Debit", "Credit" FROM "AccountingNote" INNER JOIN "AccountingNoteRecord" ON "AccountingNote"."Id"="AccountingNoteRecord"."AccountingNoteId" INNER JOIN "AccountingAccount" ON "AccountingAccount"."Id"="AccountingNoteRecord"."AccountingAccountId";


--acounting income--
CREATE TABLE IF NOT EXISTS "AccountingIncome"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "Number" BIGINT UNIQUE NOT NULL,
    "Date" DATE,
    "Concept" VARCHAR(256)
);

CREATE TABLE IF NOT EXISTS "AccountingIncomeRecord"
(
    "AccountingIncomeId" BIGSERIAL NOT NULL REFERENCES "AccountingIncome" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "AccountingAccountId" BIGSERIAL NOT NULL REFERENCES "AccountingAccount" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "Debit" BIGINT,
    "Credit" BIGINT,
    PRIMARY KEY ("AccountingIncomeId", "AccountingAccountId")

);

CREATE VIEW "AccountingIncomeAll" AS SELECT "Number", "Date", "Concept", "AccountingAccount"."Code", "AccountingAccount"."Name", "Debit", "Credit" FROM "AccountingIncome" INNER JOIN "AccountingIncomeRecord" ON "AccountingIncome"."Id"="AccountingIncomeRecord"."AccountingIncomeId" INNER JOIN "AccountingAccount" ON "AccountingAccount"."Id"="AccountingIncomeRecord"."AccountingAccountId";


INSERT INTO "AuthGroup" ("Name") VALUES ('accounting');
INSERT INTO "AppRole" ("Image", "Label", "Name", "GroupId") SELECT 'basket.svg', 'Cuentas', 'cuentas', "AuthGroup"."Id" AS "GroupId" FROM "AuthGroup" WHERE "AuthGroup"."Name"='accounting';
INSERT INTO "AppRole" ("Image", "Label", "Name", "GroupId") SELECT 'stock_tasks.svg', 'Notas', 'accountingnotes', "AuthGroup"."Id" AS "GroupId" FROM "AuthGroup" WHERE "AuthGroup"."Name"='accounting';
INSERT INTO "AppRole" ("Image", "Label", "Name", "GroupId") SELECT 'text-editor.svg', 'Cedeg', 'cedeg', "AuthGroup"."Id" AS "GroupId" FROM "AuthGroup" WHERE "AuthGroup"."Name"='accounting';
INSERT INTO "AppRole" ("Image", "Label", "Name", "GroupId") SELECT 'hexedit.svg', 'Comping', 'comping', "AuthGroup"."Id" AS "GroupId" FROM "AuthGroup" WHERE "AuthGroup"."Name"='accounting';
INSERT INTO "AppRole" ("Image", "Label", "Name", "GroupId") SELECT 'artha.svg', 'Reportes', 'accountingrep', "AuthGroup"."Id" AS "GroupId" FROM "AuthGroup" WHERE "AuthGroup"."Name"='accounting';
INSERT INTO "AppRole" ("Image", "Label", "Name", "GroupId") SELECT 'hwinfo.svg', 'Info Empresa', 'accountingcompay', "AuthGroup"."Id" AS "GroupId" FROM "AuthGroup" WHERE "AuthGroup"."Name"='accounting';
