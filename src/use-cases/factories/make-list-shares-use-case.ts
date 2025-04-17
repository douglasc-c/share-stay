import { PrismaSharesRepository } from '@/repositories/prisma/prisma-shares-repository'
import { ListSharesUseCase } from '@/use-cases/shares/list-shares'

export function makeListSharesUseCase() {
  const sharesRepository = new PrismaSharesRepository()
  const useCase = new ListSharesUseCase(sharesRepository)

  return useCase
} 