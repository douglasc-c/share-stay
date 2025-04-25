import { AssetsRepository } from '@/repositories/assets-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

interface DeleteAssetUseCaseRequest {
  assetId: string
}

export class DeleteAssetUseCase {
  constructor(private assetsRepository: AssetsRepository) {}

  async execute({ assetId }: DeleteAssetUseCaseRequest): Promise<void> {
    const asset = await this.assetsRepository.findById(assetId)

    if (!asset) {
      throw new ResourceNotFoundError('Ativo não encontrado')
    }

    await this.assetsRepository.delete(assetId)
  }
}
