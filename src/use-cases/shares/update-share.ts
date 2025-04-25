import { Share } from '@prisma/client'
import { SharesRepository } from '@/repositories/shares-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

interface UpdateShareUseCaseRequest {
  shareId: string
  currentSeason?: 'HIGH' | 'MEDIUM' | 'LOW'
  seasonOrder?: number
  currentYear?: number
}

interface UpdateShareUseCaseResponse {
  share: Share
}

export class UpdateShareUseCase {
  constructor(private sharesRepository: SharesRepository) {}

  async execute({
    shareId,
    currentSeason,
    seasonOrder,
    currentYear,
  }: UpdateShareUseCaseRequest): Promise<UpdateShareUseCaseResponse> {
    const share = await this.sharesRepository.findById(shareId)

    if (!share) {
      throw new ResourceNotFoundError('Cota não encontrada')
    }

    const updatedShare = await this.sharesRepository.update(shareId, {
      current_season: currentSeason,
      season_order: seasonOrder,
      current_year: currentYear,
    })

    return { share: updatedShare }
  }
}
