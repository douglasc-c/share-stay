import { Share } from '@prisma/client'
import { SharesRepository } from '@/repositories/shares-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { AssetsRepository } from '@/repositories/assets-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

interface AssociateUserToShareUseCaseRequest {
  shareId: string
  userId: string
}

interface AssociateUserToShareUseCaseResponse {
  share: Share
}

export class AssociateUserToShareUseCase {
  constructor(
    private sharesRepository: SharesRepository,
    private usersRepository: UsersRepository,
    private assetsRepository: AssetsRepository,
  ) {}

  async execute({
    shareId,
    userId,
  }: AssociateUserToShareUseCaseRequest): Promise<AssociateUserToShareUseCaseResponse> {
    // Verificar se a cota existe
    const share = await this.sharesRepository.findById(shareId)
    if (!share) {
      throw new ResourceNotFoundError('Cota não encontrada')
    }

    // Verificar se o usuário existe
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new ResourceNotFoundError('Usuário não encontrado')
    }

    // Associar o usuário à cota
    const updatedShare = await this.sharesRepository.update(shareId, {
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

    // Associar o usuário ao asset (relação direta)
    await this.assetsRepository.update(share.asset_id, {
      users: {
        connect: {
          id: userId
        }
      }
    })

    return { share: updatedShare }
  }
} 