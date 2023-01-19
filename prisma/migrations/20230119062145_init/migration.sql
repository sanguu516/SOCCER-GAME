/*
  Warnings:

  - Added the required column `league` to the `Team` table without a default value. This is not possible if the table is not empty.

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
    "league" INTEGER NOT NULL,
    CONSTRAINT "Team_emailfk_fkey" FOREIGN KEY ("emailfk") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Team" ("emailfk", "group", "logo", "nickname", "teamName", "teamid") SELECT "emailfk", "group", "logo", "nickname", "teamName", "teamid" FROM "Team";
DROP TABLE "Team";
ALTER TABLE "new_Team" RENAME TO "Team";
CREATE UNIQUE INDEX "Team_emailfk_key" ON "Team"("emailfk");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
