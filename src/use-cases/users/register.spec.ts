import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { UserAlreadyExistsError } from '../errors/user-already-exists'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      firstName: ' Jonh',
      lastName: 'Doe',
      email: 'jonh.doe@example.com',
      password: 'password', 
      document_type: 'CPF',
      document_number: '12345678901',
      phone: '12345678901',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should register user password upon registration', async () => {
    const { user } = await sut.execute({
      firstName: ' Jonh',
      lastName: 'Doe',
      email: 'jonh.doe@example.com',
      password: 'password',
      document_type: 'CPF',
      document_number: '12345678901',
      phone: '12345678901',
    })

    const isPasswordCorrectlyHashed = await compare(
      'password',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'jonhdoe@example.com'

    await sut.execute({
      firstName: ' Jonh',
      lastName: 'Doe',
      email,
      password: 'password',
      document_type: 'CPF',
      document_number: '12345678901',
      phone: '12345678901',
    })

      await expect(() =>
      sut.execute({
        firstName: ' Jonh',
        lastName: 'Doe',
        email,
        password: 'password',
        document_type: 'CPF',
        document_number: '12345678901',
        phone: '12345678901',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
