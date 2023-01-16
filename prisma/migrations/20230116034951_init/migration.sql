-- CreateTable
CREATE TABLE "Team" (
    "authorid" INTEGER NOT NULL,
    "nickname" TEXT NOT NULL,
    "teamid" TEXT NOT NULL PRIMARY KEY,
    "teamName" TEXT NOT NULL,
    CONSTRAINT "Team_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Teamplayers" (
    "teaminfoid" TEXT NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    CONSTRAINT "Teamplayers_teaminfoid_fkey" FOREIGN KEY ("teaminfoid") REFERENCES "Team" ("teamid") ON DELETE RESTRICT ON UPDATE CASCADE
);
