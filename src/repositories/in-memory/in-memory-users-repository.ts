import { User, Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password_hash: data.password_hash,
      document_type: data.document_type,
      document_number: data.document_number,
      phone: data.phone,
      role: 'USER',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}
