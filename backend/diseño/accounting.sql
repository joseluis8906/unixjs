CREATE TABLE IF NOT EXISTS "accou_account"
(
    "id" BIGSERIAL PRIMARY KEY,
    "code" VARCHAR(16) UNIQUE NOT NULL,
    "name" VARCHAR(32) NOT NULL
);


--disbursement vounchers--
CREATE TABLE IF NOT EXISTS "accou_disb_vou"
(
    "id" BIGSERIAL PRIMARY KEY,
    "number" BIGINT UNIQUE NOT NULL,
    "place" VARCHAR(32),
    "date"  DATE,
    "beneficiary" VARCHAR(64),
    "concept" VARCHAR(256)
);

CREATE TABLE IF NOT EXISTS "accou_disb_vou_bank"
(
    "accou_disb_vou_id" BIGSERIAL NOT NULL REFERENCES "accou_disb_vou" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
    "bank" VARCHAR(32),
    "check" VARCHAR(16),
    "current_account" VARCHAR(16),
    value BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS "accou_disb_vou_code"
(
    "accou_accou_disb_vou_id" BIGSERIAL NOT NULL REFERENCES "accou_disb_vou" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
    "accou_account_id" BIGSERIAL NOT NULL REFERENCES "accou_account" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
    "partial" BIGINT,
    "debit" BIGINT,
    "credit" BIGINT    
);


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
