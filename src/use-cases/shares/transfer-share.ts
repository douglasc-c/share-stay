import { Share } from '@prisma/client'
import { SharesRepository } from '@/repositories/shares-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

interface TransferShareUseCaseRequest {
  shareId: string
  newUserId: string
}

interface TransferShareUseCaseResponse {
  share: Share
}

export class TransferShareUseCase {
  constructor(
    private sharesRepository: SharesRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    shareId,
    newUserId,
  }: TransferShareUseCaseRequest): Promise<TransferShareUseCaseResponse> {
    const share = await this.sharesRepository.findById(shareId)

    if (!share) {
      throw new ResourceNotFoundError()
    }

    const user = await this.usersRepository.findById(newUserId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const updatedShare = await this.sharesRepository.update(shareId, {
      users: {
        create: {
          user_id: newUserId,
        },
      },
    })

    return { share: updatedShare }
  }
} 