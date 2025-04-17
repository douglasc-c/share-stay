import { PrismaSharesRepository } from '@/repositories/prisma/prisma-shares-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaAssetsRepository } from '@/repositories/prisma/prisma-assets-repository'
import { AssociateUserToShareUseCase } from '@/use-cases/shares/associate-user-to-share'

export function makeAssociateUserToShareUseCase() {
  const sharesRepository = new PrismaSharesRepository()
  const usersRepository = new PrismaUsersRepository()
  const assetsRepository = new PrismaAssetsRepository()
  const useCase = new AssociateUserToShareUseCase(sharesRepository, usersRepository, assetsRepository)

  return useCase
}   