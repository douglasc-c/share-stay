import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeUpdateUserUseCase } from '@/use-cases/factories/users/make-update-user-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateUserParamsSchema = z.object({
    userId: z.string().uuid(),
  })

  const updateUserBodySchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    document_type: z.enum(['CPF', 'CNPJ']).optional(),
    document_number: z.string().optional(),
    role: z.enum(['USER', 'ADMIN']).optional(),
    is_active: z.boolean().optional(),
  })

  const { userId } = updateUserParamsSchema.parse(request.params)
  const data = updateUserBodySchema.parse(request.body)

  try {
    const updateUserUseCase = makeUpdateUserUseCase()

    const { user } = await updateUserUseCase.execute({
      userId,
      data,
    })

    return reply.status(200).send({
      user: {
        ...user,
        password_hash: undefined,
      },
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
