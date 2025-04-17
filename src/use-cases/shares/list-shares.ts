import { Share } from '@prisma/client'
import { SharesRepository } from '@/repositories/shares-repository'

interface ListSharesUseCaseResponse {
  shares: Share[]
}

export class ListSharesUseCase {
  constructor(private sharesRepository: SharesRepository) {}

  async execute(): Promise<ListSharesUseCaseResponse> {
    const shares = await this.sharesRepository.findMany()

    return { shares }
  }
} 