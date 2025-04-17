import { PrismaAssetsRepository } from '../../repositories/prisma/prisma-assets-repository'
import { CreateAssetUseCase } from '../create-asset'

export function makeCreateAssetUseCase() {
  const assetsRepository = new PrismaAssetsRepository()
  const useCase = new CreateAssetUseCase(assetsRepository)

  return useCase
} 