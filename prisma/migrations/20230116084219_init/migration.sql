/*
  Warnings:

  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `teamid` on the `Team` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Team" (
    "emailfk" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "teamid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teamName" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    CONSTRAINT "Team_emailfk_fkey" FOREIGN KEY ("emailfk") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Team" ("emailfk", "group", "logo", "nickname", "teamName", "teamid") SELECT "emailfk", "group", "logo", "nickname", "teamName", "teamid" FROM "Team";
DROP TABLE "Team";
ALTER TABLE "new_Team" RENAME TO "Team";
CREATE UNIQUE INDEX "Team_emailfk_key" ON "Team"("emailfk");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
