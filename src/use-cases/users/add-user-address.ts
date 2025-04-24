import { UsersRepository } from '@/repositories/users-repository'
import { AddressesRepository } from '@/repositories/addresses-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { Address } from '@prisma/client'

interface AddUserAddressUseCaseRequest {
  userId: string
  address: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zip_code: string
  }
}

interface AddUserAddressUseCaseResponse {
  address: Address
}

export class AddUserAddressUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private addressesRepository: AddressesRepository,
  ) {}

  async execute({
    userId,
    address,
  }: AddUserAddressUseCaseRequest): Promise<AddUserAddressUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const createdAddress = await this.addressesRepository.create({
      ...address,
      user: {
        connect: {
          id: userId,
        },
      },
    })

    return {
      address: createdAddress,
    }
  }
}
