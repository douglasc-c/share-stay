import { PrismaAssetsRepository } from '@/repositories/prisma/prisma-assets-repository'
import { SearchAssetsUseCase } from '../assets/search-assets'

export function makeSearchAssetsUseCase() {
  const assetsRepository = new PrismaAssetsRepository()
  const searchAssetsUseCase = new SearchAssetsUseCase(assetsRepository)

  return searchAssetsUseCase
} 