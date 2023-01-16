/*
  Warnings:

  - Added the required column `group` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Team" (
    "authorid" INTEGER NOT NULL,
    "nickname" TEXT NOT NULL,
    "teamid" TEXT NOT NULL PRIMARY KEY,
    "teamName" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    CONSTRAINT "Team_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Team" ("authorid", "nickname", "teamName", "teamid") SELECT "authorid", "nickname", "teamName", "teamid" FROM "Team";
DROP TABLE "Team";
ALTER TABLE "new_Team" RENAME TO "Team";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
