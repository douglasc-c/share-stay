import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaAddressesRepository } from '@/repositories/prisma/prisma-addresses-repository'
import { GetUserProfileUseCase } from '@/use-cases/users/get-user-profile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const addressesRepository = new PrismaAddressesRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(
    usersRepository,
    addressesRepository,
  )

  return getUserProfileUseCase
}
