import { UpdateShareUseCase } from '@/use-cases/shares/update-share'
import { PrismaSharesRepository } from '@/repositories/prisma/prisma-shares-repository'

export function makeUpdateShareUseCase() {
  const sharesRepository = new PrismaSharesRepository()
  const updateShareUseCase = new UpdateShareUseCase(sharesRepository)

  return updateShareUseCase
}
