import { Share } from '@prisma/client'
import { SharesRepository } from '@/repositories/shares-repository'
import { AssetsRepository } from '@/repositories/assets-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { MaxSharesExceededError } from '@/use-cases/errors/max-shares-exceeded-error'

interface CreateShareUseCaseRequest {
  assetId: string
  userId: string
  currentSeason: 'HIGH' | 'MEDIUM' | 'LOW'
  seasonOrder: number
  currentYear: number
}

interface CreateShareUseCaseResponse {
  share: Share
}

export class CreateShareUseCase {
  constructor(
    private sharesRepository: SharesRepository,
    private assetsRepository: AssetsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    assetId,
    userId,
    currentSeason,
    seasonOrder,
    currentYear,
  }: CreateShareUseCaseRequest): Promise<CreateShareUseCaseResponse> {
    // Verificar se o asset existe
    const asset = await this.assetsRepository.findById(assetId)
    if (!asset) {
      throw new ResourceNotFoundError()
    }

    // Verificar se ainda há cotas disponíveis
    const existingShares = await this.sharesRepository.countByAssetId(assetId)
    if (existingShares >= asset.total_shares) {
      throw new MaxSharesExceededError()
    }

    // Verificar se o usuário existe
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new ResourceNotFoundError()
    }

    // Criar a cota
    const share = await this.sharesRepository.create({
      asset: {
        connect: {
          id: assetId
        }
      },
      current_season: currentSeason,
      season_order: seasonOrder,
      current_year: currentYear,
      users: {
        create: {
          user: {
            connect: {
              id: userId
            }
          }
        }
      }
    })

    return { share }
  }
} 