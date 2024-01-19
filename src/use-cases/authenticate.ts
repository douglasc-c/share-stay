import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateServerRequest {
  email: string
  password: string
}

interface AuthenticateServerResponse {
  user: User
}

export class AuthenticateServer {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServerRequest): Promise<AuthenticateServerResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordsMatchs = await compare(password, user.password_hash)

    if (!doesPasswordsMatchs) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
