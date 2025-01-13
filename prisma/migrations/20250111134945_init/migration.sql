/*
  Warnings:

  - You are about to drop the column `client_id` on the `Item` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_client_id_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "client_id",
ADD COLUMN     "clientId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
