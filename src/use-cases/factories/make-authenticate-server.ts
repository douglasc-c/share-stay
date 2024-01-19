import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users'
import { AuthenticateServer } from '../authenticate'

export function makeAuthenticateServer() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateServer = new AuthenticateServer(usersRepository)

  return authenticateServer
}
