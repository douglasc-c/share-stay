import { PrismaAssetsRepository } from '@/repositories/prisma/prisma-assets-repository'
import { PrismaSharesRepository } from '@/repositories/prisma/prisma-shares-repository'
import { PrismaSeasonsRepository } from '@/repositories/prisma/prisma-seasons-repository'
import { CreateAssetUseCase } from '@/use-cases/assets/create-asset'

export function makeCreateAssetUseCase() {
  const assetsRepository = new PrismaAssetsRepository()
  const sharesRepository = new PrismaSharesRepository()
  const seasonsRepository = new PrismaSeasonsRepository()
  const useCase = new CreateAssetUseCase(
    assetsRepository,
    sharesRepository,
    seasonsRepository,
  )

  return useCase
} 