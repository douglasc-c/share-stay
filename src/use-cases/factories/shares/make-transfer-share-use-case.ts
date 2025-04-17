import { PrismaSharesRepository } from '@/repositories/prisma/prisma-shares-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { TransferShareUseCase } from '@/use-cases/shares/transfer-share'

export function makeTransferShareUseCase() {
  const sharesRepository = new PrismaSharesRepository()
  const usersRepository = new PrismaUsersRepository()
  const useCase = new TransferShareUseCase(sharesRepository, usersRepository)

  return useCase
} 