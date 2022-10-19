/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Seller` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Seller_name_key" ON "Seller"("name");
