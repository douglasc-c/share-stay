import { PrismaAssetsRepository } from '@/repositories/prisma/prisma-assets-repository'
import { GetAssetByIdUseCase } from '@/use-cases/assets/get-asset-by-id'

export function makeGetAssetByIdUseCase() {
  const assetsRepository = new PrismaAssetsRepository()
  const useCase = new GetAssetByIdUseCase(assetsRepository)

  return useCase
}   