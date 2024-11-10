-- AlterTable
ALTER TABLE "Applicant" ADD COLUMN     "company" TEXT DEFAULT '',
ADD COLUMN     "education" TEXT DEFAULT '',
ADD COLUMN     "workHistory" TEXT DEFAULT '',
ALTER COLUMN "joiningDate" DROP NOT NULL;
