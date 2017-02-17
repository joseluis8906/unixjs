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
    "AccountingDisbVouId" BIGSERIAL NOT NULL REFERENCES "AccountingDisbVou" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "Bank" VARCHAR(32),
    "Check" VARCHAR(16),
    "CheckingAccount" VARCHAR(16),
    "Amount" BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS "AccountingDisbVouRecord"
(
    "AccountingDisbVouId" BIGSERIAL NOT NULL REFERENCES "AccountingDisbVou" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "AccountingAccountId" BIGSERIAL NOT NULL REFERENCES "AccountingAccount" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "Partial" BIGINT,
    "Debit" BIGINT,
    "Credit" BIGINT    
);

CREATE VIEW "AccountingDisbVouAll" AS SELECT "Number", "Place", "Date", "Holder", "Concept", "Bank", "Check", "CheckingAccount", "Amount", "AccountingAccount"."Code", "AccountingAccount"."Name", "Partial", "Debit", "Credit" FROM "AccountingDisbVou" INNER JOIN "AccountingDisbVouBank" ON "AccountingDisbVou"."Id"="AccountingDisbVouBank"."AccountingDisbVouId" INNER JOIN "AccountingDisbVouRecord" ON "AccountingDisbVou"."Id"="AccountingDisbVouRecord"."AccountingDisbVouId" INNER JOIN "AccountingAccount" ON "AccountingAccount"."Id"="AccountingDisbVouRecord"."AccountingAccountId";


/*
--acounting note--
CREATE TABLE IF NOT EXISTS "accou_accou_note"
(
    "id" BIGSERIAL PRIMARY KEY,
    "number" BIGINT UNIQUE NOT NULL,
    "date" DATE,
    "concept" VARCHAR(256)
);

CREATE TABLE IF NOT EXISTS "accou_accou_note_code"
(
    "accou_accou_note_id" BIGSERIAL NOT NULL REFERENCES "accou_accou_note" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
    "accou_account_id" BIGSERIAL NOT NULL REFERENCES "accou_account" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
    "partial" BIGINT,
    "debit" BIGINT,
    "credit" BIGINT
);
*/