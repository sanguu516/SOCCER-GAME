-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Teamplayers" (
    "teaminfoid" TEXT NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "weight" TEXT NOT NULL
);
INSERT INTO "new_Teamplayers" ("height", "id", "name", "photo", "teaminfoid", "weight") SELECT "height", "id", "name", "photo", "teaminfoid", "weight" FROM "Teamplayers";
DROP TABLE "Teamplayers";
ALTER TABLE "new_Teamplayers" RENAME TO "Teamplayers";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
