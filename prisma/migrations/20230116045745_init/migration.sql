/*
  Warnings:

  - You are about to drop the column `authorid` on the `Team` table. All the data in the column will be lost.
  - Added the required column `id` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Team" (
    "id" INTEGER NOT NULL,
    "nickname" TEXT NOT NULL,
    "teamid" TEXT NOT NULL PRIMARY KEY,
    "teamName" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    CONSTRAINT "Team_id_fkey" FOREIGN KEY ("id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Team" ("group", "logo", "nickname", "teamName", "teamid") SELECT "group", "logo", "nickname", "teamName", "teamid" FROM "Team";
DROP TABLE "Team";
ALTER TABLE "new_Team" RENAME TO "Team";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
