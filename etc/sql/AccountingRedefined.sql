/*Account*/
ALTER TABLE "Accounting"."Account" ALTER COLUMN "Code" TYPE TEXT;
ALTER TABLE "Accounting"."Account" ALTER COLUMN "Name" TYPE TEXT;

/*Company*/
ALTER TABLE "Accounting"."Company" ALTER COLUMN "Nit" TYPE TEXT;
ALTER TABLE "Accounting"."Company" ALTER COLUMN "Name" TYPE TEXT;
ALTER TABLE "Accounting"."Company" ALTER COLUMN "Name" DROP NOT NULL;
ALTER TABLE "Accounting"."Company" ALTER COLUMN "Phone" TYPE TEXT;
ALTER TABLE "Accounting"."Company" ALTER COLUMN "Movil" TYPE TEXT;
ALTER TABLE "Accounting"."Company" ALTER COLUMN "Address" TYPE TEXT;

/*DisbVou*/
ALTER TABLE "Accounting"."DisbVou" ALTER COLUMN "Place" TYPE TEXT;
ALTER TABLE "Accounting"."DisbVou" ALTER COLUMN "Holder" TYPE TEXT;
ALTER TABLE "Accounting"."DisbVou" ALTER COLUMN "Concept" TYPE TEXT;

/*DisbVouBank*/
ALTER TABLE "Accounting"."DisbVouBank" ALTER COLUMN "Bank" TYPE TEXT;
ALTER TABLE "Accounting"."DisbVouBank" ALTER COLUMN "Check" TYPE TEXT;
ALTER TABLE "Accounting"."DisbVouBank" ALTER COLUMN "CheckingAccount" TYPE TEXT;
ALTER TABLE "Accounting"."DisbVouBank" ALTER COLUMN "Amount" TYPE DECIMAL;
ALTER TABLE "Accounting"."DisbVouBank" ALTER COLUMN "Amount" DROP NOT NULL;

/*DisbVouRecord*/
ALTER TABLE "Accounting"."DisbVouRecord" ALTER COLUMN "Partial" TYPE DECIMAL;
ALTER TABLE "Accounting"."DisbVouRecord" ALTER COLUMN "Debit" TYPE DECIMAL;
ALTER TABLE "Accounting"."DisbVouRecord" ALTER COLUMN "Credit" TYPE DECIMAL;

/*Income*/
ALTER TABLE "Accounting"."Income" ALTER COLUMN "Concept" TYPE TEXT;

/*IncomeRecord*/
ALTER TABLE "Accounting"."IncomeRecord" ALTER COLUMN "Partial" TYPE DECIMAL;
ALTER TABLE "Accounting"."IncomeRecord" ALTER COLUMN "Debit" TYPE DECIMAL;
ALTER TABLE "Accounting"."IncomeRecord" ALTER COLUMN "Credit" TYPE DECIMAL;

/*Note*/
ALTER TABLE "Accounting"."Note" ALTER COLUMN "Concept" TYPE TEXT;

/*NoteRecord*/
ALTER TABLE "Accounting"."NoteRecord" ALTER COLUMN "Partial" TYPE DECIMAL;
ALTER TABLE "Accounting"."NoteRecord" ALTER COLUMN "Debit" TYPE DECIMAL;
ALTER TABLE "Accounting"."NoteRecord" ALTER COLUMN "Credit" TYPE DECIMAL;
