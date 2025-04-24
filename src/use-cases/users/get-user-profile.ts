import { UsersRepository } from '@/repositories/users-repository'
import { AddressesRepository } from '@/repositories/addresses-repository'
import { User, Address } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetUserProfileUseCaseRequest {
  userId: string
}

interface GetUserProfileUseCaseResponse {
  user: User
  address: Address | null
}

export class GetUserProfileUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private addressesRepository: AddressesRepository,
  ) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const address = await this.addressesRepository.findByUserId(userId)

    return {
      user,
      address,
    }
  }
}
