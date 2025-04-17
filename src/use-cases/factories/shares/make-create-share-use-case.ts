import { PrismaSharesRepository } from '@/repositories/prisma/prisma-shares-repository'
import { PrismaAssetsRepository } from '@/repositories/prisma/prisma-assets-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateShareUseCase } from '@/use-cases/shares/create-share'

export function makeCreateShareUseCase() {
  const sharesRepository = new PrismaSharesRepository()
  const assetsRepository = new PrismaAssetsRepository()
  const usersRepository = new PrismaUsersRepository()
  const useCase = new CreateShareUseCase(sharesRepository, assetsRepository, usersRepository)

  return useCase
} 