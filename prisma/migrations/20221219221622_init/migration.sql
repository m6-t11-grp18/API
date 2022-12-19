/*
  Warnings:

  - You are about to drop the column `estreet` on the `user_address` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `users` table. All the data in the column will be lost.
  - Added the required column `street` to the `user_address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_address" DROP CONSTRAINT "user_address_UserId_fkey";

-- DropIndex
DROP INDEX "users_cpf_key";

-- AlterTable
ALTER TABLE "user_address" DROP COLUMN "estreet",
ADD COLUMN     "street" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "type";

-- AddForeignKey
ALTER TABLE "user_address" ADD CONSTRAINT "user_address_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
