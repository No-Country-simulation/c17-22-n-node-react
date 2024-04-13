-- AlterTable
CREATE SEQUENCE country_id_seq;
ALTER TABLE "Country" ALTER COLUMN "id" SET DEFAULT nextval('country_id_seq');
ALTER SEQUENCE country_id_seq OWNED BY "Country"."id";
