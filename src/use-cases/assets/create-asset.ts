import { Asset, SeasonType } from '@prisma/client'
import { AssetsRepository } from '@/repositories/assets-repository'
import { SharesRepository } from '@/repositories/shares-repository'
import { SeasonsRepository } from '@/repositories/seasons-repository'

interface CreateAssetUseCaseRequest {
  type: 'PROPERTY' | 'NAUTICAL'
  name: string
  description: string
  totalValue: number
  totalShares: number
  address: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zip_code: string
  }
  seasons: {
    type: SeasonType
    currentYear: number
  }[]
}

interface CreateAssetUseCaseResponse {
  asset: Asset
}

export class CreateAssetUseCase {
  constructor(
    private assetsRepository: AssetsRepository,
    private sharesRepository: SharesRepository,
    private seasonsRepository: SeasonsRepository,
  ) {}

  async execute({
    type,
    name,
    description,
    totalValue,
    totalShares,
    address,
    seasons,
  }: CreateAssetUseCaseRequest): Promise<CreateAssetUseCaseResponse> {
    // Criar o asset
    const asset = await this.assetsRepository.create({
      type,
      name,
      description,
      value: totalValue,
      total_shares: totalShares,
      location: `${address.city}, ${address.state}`,
      addresses: {
        create: {
          street: address.street,
          number: address.number,
          complement: address.complement,
          neighborhood: address.neighborhood,
          city: address.city,
          state: address.state,
          zip_code: address.zip_code,
        }
      }
    })

    // Criar as temporadas
    for (const season of seasons) {
      await this.seasonsRepository.create({
        asset: {
          connect: {
            id: asset.id
          }
        },
        type: season.type,
        currentYear: season.currentYear,
      })
    }

    // Criar as cotas
    for (let i = 0; i < totalShares; i++) {
      await this.sharesRepository.create({
        asset: {
          connect: {
            id: asset.id
          }
        },
        current_season: seasons[0].type,
        season_order: i + 1,
        current_year: seasons[0].currentYear,
      })
    }

    return { asset }
  }
} 