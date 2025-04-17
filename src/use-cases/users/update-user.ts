import { User } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateUserUseCaseRequest {
  userId: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  document_type?: 'CPF' | 'CNPJ'
  document_number?: string
  role?: 'USER' | 'ADMIN'
  is_active?: boolean
}

interface UpdateUserUseCaseResponse {
  user: User
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    firstName,
    lastName,
    email,
    phone,
    document_type,
    document_number,
    role,
    is_active,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const updatedUser = await this.usersRepository.update(userId, {
      firstName: firstName !== undefined ? firstName : user.firstName,
      lastName: lastName !== undefined ? lastName : user.lastName,
      email: email !== undefined ? email : user.email,
      phone: phone !== undefined ? phone : user.phone,
      document_type: document_type !== undefined ? document_type : user.document_type,
      document_number: document_number !== undefined ? document_number : user.document_number,
      role: role !== undefined ? role : user.role,
      is_active: is_active !== undefined ? is_active : user.is_active,
    })

    return { user: updatedUser }
  }
} 