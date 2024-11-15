-- DropForeignKey
ALTER TABLE "tarefa" DROP CONSTRAINT "tarefa_categoriaId_fkey";

-- DropForeignKey
ALTER TABLE "tarefa" DROP CONSTRAINT "tarefa_situacaoId_fkey";

-- AlterTable
ALTER TABLE "tarefa" ALTER COLUMN "situacaoId" DROP NOT NULL,
ALTER COLUMN "categoriaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tarefa" ADD CONSTRAINT "tarefa_situacaoId_fkey" FOREIGN KEY ("situacaoId") REFERENCES "situacao"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefa" ADD CONSTRAINT "tarefa_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;
