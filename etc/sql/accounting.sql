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
    "AccountingDisbVouId" BIGSERIAL PRIMARY KEY NOT NULL REFERENCES "AccountingDisbVou" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "AccountingAccountId" BIGSERIAL NOT NULL REFERENCES "AccountingAccount" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "Partial" BIGINT,
    "Debit" BIGINT,
    "Credit" BIGINT    
);

CREATE VIEW "AccountingDisbVouAll" AS SELECT "Number", "Place", "Date", "Holder", "Concept", "Bank", "Check", "CheckingAccount", "Amount", "AccountingAccount"."Code", "AccountingAccount"."Name", "Partial", "Debit", "Credit" FROM "AccountingDisbVou" INNER JOIN "AccountingDisbVouBank" ON "AccountingDisbVou"."Id"="AccountingDisbVouBank"."AccountingDisbVouId" INNER JOIN "AccountingDisbVouRecord" ON "AccountingDisbVou"."Id"="AccountingDisbVouRecord"."AccountingDisbVouId" INNER JOIN "AccountingAccount" ON "AccountingAccount"."Id"="AccountingDisbVouRecord"."AccountingAccountId";



--acounting note--
CREATE TABLE IF NOT EXISTS "AccountingNote"
(
    "Id" BIGSERIAL PRIMARY KEY,
    "Number" BIGINT UNIQUE NOT NULL,
    "Date" DATE,
    "Concept" VARCHAR(256)
);

CREATE TABLE IF NOT EXISTS "AccountingCode"
(
    "AccountingNoteId" BIGSERIAL NOT NULL REFERENCES "AccountingNote" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "AccountingAccountId" BIGSERIAL NOT NULL REFERENCES "AccountingAccount" ("Id") ON UPDATE CASCADE ON DELETE CASCADE,
    "Partial" BIGINT,
    "Debit" BIGINT,
    "Credit" BIGINT
);
