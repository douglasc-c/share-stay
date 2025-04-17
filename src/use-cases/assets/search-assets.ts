import { Asset } from '@prisma/client'
import { AssetsRepository } from '@/repositories/assets-repository'

interface SearchAssetsUseCaseResponse {
  assets: Asset[]
}

export class SearchAssetsUseCase {
  constructor(private assetsRepository: AssetsRepository) {}

  async execute(): Promise<SearchAssetsUseCaseResponse> {
    const assets = await this.assetsRepository.findMany()

    return {
      assets,
    }
  }
} 