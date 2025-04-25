import { UpdateAssetUseCase } from '@/use-cases/assets/update-asset'
import { PrismaAssetsRepository } from '@/repositories/prisma/prisma-assets-repository'

export function makeUpdateAssetUseCase() {
  const assetsRepository = new PrismaAssetsRepository()
  const updateAssetUseCase = new UpdateAssetUseCase(assetsRepository)

  return updateAssetUseCase
}
