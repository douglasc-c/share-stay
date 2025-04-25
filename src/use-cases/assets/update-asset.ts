import { Asset } from '@prisma/client'
import { AssetsRepository } from '@/repositories/assets-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

interface UpdateAssetUseCaseRequest {
  assetId: string
  type?: 'PROPERTY' | 'NAUTICAL'
  name?: string
  description?: string
  totalValue?: number
  totalShares?: number
  location?: string
}

interface UpdateAssetUseCaseResponse {
  asset: Asset
}

export class UpdateAssetUseCase {
  constructor(private assetsRepository: AssetsRepository) {}

  async execute({
    assetId,
    type,
    name,
    description,
    totalValue,
    totalShares,
    location,
  }: UpdateAssetUseCaseRequest): Promise<UpdateAssetUseCaseResponse> {
    const asset = await this.assetsRepository.findById(assetId)

    if (!asset) {
      throw new ResourceNotFoundError('Ativo não encontrado')
    }

    const updatedAsset = await this.assetsRepository.update(assetId, {
      type,
      name,
      description,
      value: totalValue,
      total_shares: totalShares,
      location,
    })

    return { asset: updatedAsset }
  }
}
