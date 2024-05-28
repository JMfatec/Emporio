/*
  Warnings:

  - You are about to drop the column `mesaId` on the `Pedido` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `Pedido` table. All the data in the column will be lost.
  - Added the required column `mesa` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_mesaId_fkey";

-- AlterTable
ALTER TABLE "Pedido" DROP COLUMN "mesaId",
DROP COLUMN "valor",
ADD COLUMN     "emp_id" INTEGER,
ADD COLUMN     "mesa" INTEGER NOT NULL,
ADD COLUMN     "ready" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "selling_date" TIMESTAMP(3),
ADD COLUMN     "selling_price" DECIMAL(65,30);

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "Emp"("id") ON DELETE SET NULL ON UPDATE CASCADE;
