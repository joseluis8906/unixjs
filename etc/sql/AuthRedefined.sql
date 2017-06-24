/*User*/
ALTER TABLE "Auth"."User" ALTER COLUMN "UserName" TYPE TEXT;
ALTER TABLE "Auth"."User" ALTER COLUMN "Password" TYPE TEXT;

/*UserBasicInfo*/
ALTER TABLE "Auth"."UserBasicInfo" ALTER COLUMN "DocumentType" TYPE TEXT;
ALTER TABLE "Auth"."UserBasicInfo" ALTER COLUMN "DocumentType" DROP NOT NULL;
ALTER TABLE "Auth"."UserBasicInfo" ALTER COLUMN "DocumentNum" TYPE TEXT;
ALTER TABLE "Auth"."UserBasicInfo" ALTER COLUMN "DocumentNum" DROP NOT NULL;
ALTER TABLE "Auth"."UserBasicInfo" ALTER COLUMN "Country" TYPE TEXT;
ALTER TABLE "Auth"."UserBasicInfo" ALTER COLUMN "Country" DROP NOT NULL;
ALTER TABLE "Auth"."UserBasicInfo" ALTER COLUMN "Name" TYPE TEXT;
ALTER TABLE "Auth"."UserBasicInfo" ALTER COLUMN "Name" DROP NOT NULL;
ALTER TABLE "Auth"."UserBasicInfo" ALTER COLUMN "LastName" TYPE TEXT;
ALTER TABLE "Auth"."UserBasicInfo" ALTER COLUMN "LastName" DROP NOT NULL;

/*UserComplementaryInfo*/
ALTER TABLE "Auth"."UserComplementaryInfo" ALTER COLUMN "Phone" TYPE TEXT;
ALTER TABLE "Auth"."UserComplementaryInfo" ALTER COLUMN "Email" TYPE TEXT;
ALTER TABLE "Auth"."UserComplementaryInfo" ALTER COLUMN "Address" TYPE TEXT;
ALTER TABLE "Auth"."UserComplementaryInfo" DROP CONSTRAINT IF EXISTS "AuthUserComplementaryInfo_Avatar_key";

/*Group*/
ALTER TABLE "Auth"."Group" ALTER COLUMN "Name" TYPE TEXT;

/*AppRole*/
ALTER TABLE "Auth"."AppRole" ALTER COLUMN "Image" TYPE TEXT;
ALTER TABLE "Auth"."AppRole" ALTER COLUMN "Label" TYPE TEXT;
ALTER TABLE "Auth"."AppRole" ALTER COLUMN "Name" TYPE TEXT;

/*Media*/
ALTER TABLE "public"."Media" ALTER COLUMN "Name" TYPE TEXT;
ALTER TABLE "public"."Media" ALTER COLUMN "Type" TYPE TEXT;
ALTER TABLE "public"."Media" ALTER COLUMN "FileName" TYPE TEXT;
