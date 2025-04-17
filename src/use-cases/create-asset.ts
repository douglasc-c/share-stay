import { Asset } from '@prisma/client'
import { AssetsRepository } from '../repositories/assets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreateAssetUseCaseRequest {
  type: 'PROPERTY' | 'NAUTICAL'
  name: string
  location: string
  totalShares: number
}

interface CreateAssetUseCaseResponse {
  asset: Asset
}

export class CreateAssetUseCase {
  constructor(private assetsRepository: AssetsRepository) {}

  async execute({
    type,
    name,
    location,
    totalShares,
  }: CreateAssetUseCaseRequest): Promise<CreateAssetUseCaseResponse> {
    if (totalShares <= 0) {
      throw new Error('Total shares must be greater than zero.')
    }

    const asset = await this.assetsRepository.create({
      type,
      name,
      location,
      total_shares: totalShares,
    })

    return {
      asset,
    }
  }
} 