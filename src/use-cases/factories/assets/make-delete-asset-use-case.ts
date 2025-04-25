import { DeleteAssetUseCase } from '@/use-cases/assets/delete-asset'
import { PrismaAssetsRepository } from '@/repositories/prisma/prisma-assets-repository'

export function makeDeleteAssetUseCase() {
  const assetsRepository = new PrismaAssetsRepository()
  const deleteAssetUseCase = new DeleteAssetUseCase(assetsRepository)

  return deleteAssetUseCase
}
