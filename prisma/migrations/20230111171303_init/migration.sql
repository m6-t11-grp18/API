/*
  Warnings:

  - Added the required column `userId` to the `announcement_replys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "announcement_replys" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "announcement_replys" ADD CONSTRAINT "announcement_replys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
