/*
  Warnings:

  - You are about to drop the column `isCorrect` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Option` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[questionId]` on the table `Option` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `option1` to the `Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option2` to the `Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option3` to the `Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option4` to the `Option` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Option" DROP COLUMN "isCorrect",
DROP COLUMN "text",
ADD COLUMN     "option1" TEXT NOT NULL,
ADD COLUMN     "option2" TEXT NOT NULL,
ADD COLUMN     "option3" TEXT NOT NULL,
ADD COLUMN     "option4" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "answer1" BOOLEAN NOT NULL,
    "answer2" BOOLEAN NOT NULL,
    "answer3" BOOLEAN NOT NULL,
    "answer4" BOOLEAN NOT NULL,
    "optionId" TEXT NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Answer_optionId_key" ON "Answer"("optionId");

-- CreateIndex
CREATE UNIQUE INDEX "Option_questionId_key" ON "Option"("questionId");

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
