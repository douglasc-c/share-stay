import { DeleteShareUseCase } from '@/use-cases/shares/delete-share'
import { PrismaSharesRepository } from '@/repositories/prisma/prisma-shares-repository'

export function makeDeleteShareUseCase() {
  const sharesRepository = new PrismaSharesRepository()
  const deleteShareUseCase = new DeleteShareUseCase(sharesRepository)

  return deleteShareUseCase
}
