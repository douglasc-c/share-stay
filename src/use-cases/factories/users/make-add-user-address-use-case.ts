import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { AddUserAddressUseCase } from '@/use-cases/users/add-user-address'

export function makeAddUserAddressUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const addressesRepository = new PrismaAddressesRepository()
  const addUserAddressUseCase = new AddUserAddressUseCase(
    usersRepository,
    addressesRepository,
  )

  return addUserAddressUseCase
}
