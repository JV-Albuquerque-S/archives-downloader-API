-- CreateTable
CREATE TABLE "document" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stored_in" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "document_pkey" PRIMARY KEY ("id")
);
