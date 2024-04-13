-- AlterTable
CREATE SEQUENCE city_id_seq;
ALTER TABLE "City" ALTER COLUMN "id" SET DEFAULT nextval('city_id_seq');
ALTER SEQUENCE city_id_seq OWNED BY "City"."id";

-- AlterTable
CREATE SEQUENCE entrepeneur_id_seq;
ALTER TABLE "Entrepeneur" ALTER COLUMN "id" SET DEFAULT nextval('entrepeneur_id_seq');
ALTER SEQUENCE entrepeneur_id_seq OWNED BY "Entrepeneur"."id";

-- AlterTable
CREATE SEQUENCE entrepreneurship_id_seq;
ALTER TABLE "Entrepreneurship" ALTER COLUMN "id" SET DEFAULT nextval('entrepreneurship_id_seq');
ALTER SEQUENCE entrepreneurship_id_seq OWNED BY "Entrepreneurship"."id";

-- AlterTable
CREATE SEQUENCE investor_id_seq;
ALTER TABLE "Investor" ALTER COLUMN "id" SET DEFAULT nextval('investor_id_seq');
ALTER SEQUENCE investor_id_seq OWNED BY "Investor"."id";

-- AlterTable
CREATE SEQUENCE subcategory_id_seq;
ALTER TABLE "Subcategory" ALTER COLUMN "id" SET DEFAULT nextval('subcategory_id_seq');
ALTER SEQUENCE subcategory_id_seq OWNED BY "Subcategory"."id";

-- AlterTable
CREATE SEQUENCE user_id_seq;
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq');
ALTER SEQUENCE user_id_seq OWNED BY "User"."id";
