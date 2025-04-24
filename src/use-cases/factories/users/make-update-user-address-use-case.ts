import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { UpdateUserAddressUseCase } from '@/use-cases/users/update-user-address'

export function makeUpdateUserAddressUseCase() {
  const addressesRepository = new PrismaAddressesRepository()
  const updateUserAddressUseCase = new UpdateUserAddressUseCase(
    addressesRepository,
  )

  return updateUserAddressUseCase
}
