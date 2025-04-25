import { SharesRepository } from '@/repositories/shares-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

interface DeleteShareUseCaseRequest {
  shareId: string
}

export class DeleteShareUseCase {
  constructor(private sharesRepository: SharesRepository) {}

  async execute({ shareId }: DeleteShareUseCaseRequest): Promise<void> {
    const share = await this.sharesRepository.findById(shareId)

    if (!share) {
      throw new ResourceNotFoundError('Cota não encontrada')
    }

    await this.sharesRepository.delete(shareId)
  }
}
