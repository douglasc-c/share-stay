import { Asset } from '@prisma/client'
import { AssetsRepository } from '@/repositories/assets-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

interface GetAssetByIdUseCaseRequest {
  assetId: string
}

interface GetAssetByIdUseCaseResponse {
  asset: Asset & {
    addresses: {
      id: string
      street: string
      number: string
      complement: string | null
      neighborhood: string
      city: string
      state: string
      zip_code: string
      country: string
    }[]
    seasons: {
      id: string
      type: string
      start_date: Date
      end_date: Date
      year: number
    }[]
    shares: {
      id: string
      current_season: string
      season_order: number
      current_year: number
      users: {
        user: {
          id: string
          firstName: string
          lastName: string
          email: string
        }
      }[]
    }[]
    users: {
      id: string
      firstName: string
      lastName: string
      email: string
    }[]
  }
}

export class GetAssetByIdUseCase {
  constructor(
    private assetsRepository: AssetsRepository,
  ) {}

  async execute({
    assetId,
  }: GetAssetByIdUseCaseRequest): Promise<GetAssetByIdUseCaseResponse> {
    const asset = await this.assetsRepository.findByIdWithRelations(assetId)

    if (!asset) {
      throw new ResourceNotFoundError('Asset não encontrado')
    }

    return { asset }
  }
} 