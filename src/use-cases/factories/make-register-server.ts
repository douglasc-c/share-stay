import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users'
import { RegisterUseCase } from '../register'

export function makeRegisterServer() {
  const usersRepository = new PrismaUsersRepository()
  const registerServer = new RegisterUseCase(usersRepository)

  return registerServer
}
