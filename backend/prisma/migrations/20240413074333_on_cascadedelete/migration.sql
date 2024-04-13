-- DropForeignKey
ALTER TABLE "Entrepeneur" DROP CONSTRAINT "Entrepeneur_id_fkey";

-- DropForeignKey
ALTER TABLE "Investor" DROP CONSTRAINT "Investor_id_fkey";

-- AddForeignKey
ALTER TABLE "Entrepeneur" ADD CONSTRAINT "Entrepeneur_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investor" ADD CONSTRAINT "Investor_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
