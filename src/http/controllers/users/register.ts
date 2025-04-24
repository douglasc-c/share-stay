import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'
import { makeRegisterUseCase } from '@/use-cases/factories/users/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    document_type: z.enum(['CPF', 'CNPJ']),
    document_number: z.string(),
    phone: z.string(),
    role: z.enum(['USER', 'ADMIN']),
  })

  const {
    firstName,
    lastName,
    email,
    password,
    document_type,
    document_number,
    phone,
    role,
  } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      firstName,
      lastName,
      email,
      password,
      document_type,
      document_number,
      phone,
      role,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
