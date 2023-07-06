/*
  Warnings:

  - You are about to drop the column `postalCode` on the `Order` table. All the data in the column will be lost.
  - Added the required column `pincode` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "postalCode",
ADD COLUMN     "pincode" TEXT NOT NULL;
