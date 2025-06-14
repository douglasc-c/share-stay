import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists'
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  document_type: 'CPF' | 'CNPJ'
  document_number: string
  phone: string
  role: 'USER' | 'ADMIN'
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    firstName,
    lastName,
    email,
    password,
    document_type,
    document_number,
    phone,
    role,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      firstName,
      lastName,
      email,
      password_hash,
      document_type,
      document_number,
      phone,
      role,
    })

    return { user }
  }
}
