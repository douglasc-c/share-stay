import { AddressesRepository } from '@/repositories/addresses-repository'
import { Address, Prisma } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateUserAddressUseCaseRequest {
  userId: string
  addressId: string
  data: Partial<Prisma.AddressUpdateInput>
}

interface UpdateUserAddressUseCaseResponse {
  address: Address
}

export class UpdateUserAddressUseCase {
  constructor(private addressesRepository: AddressesRepository) {}

  async execute({
    userId,
    addressId,
    data,
  }: UpdateUserAddressUseCaseRequest): Promise<UpdateUserAddressUseCaseResponse> {
    const address = await this.addressesRepository.findById(addressId)

    if (!address || address.user_id !== userId) {
      throw new ResourceNotFoundError()
    }

    const updatedAddress = await this.addressesRepository.update(
      addressId,
      data,
    )

    return {
      address: updatedAddress,
    }
  }
}
