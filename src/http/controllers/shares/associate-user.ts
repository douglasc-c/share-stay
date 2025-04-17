import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeAssociateUserToShareUseCase } from '@/use-cases/factories/shares/make-associate-user-to-share-use-case'


export async function associateUser(request: FastifyRequest, reply: FastifyReply) {
  const associateUserParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const associateUserBodySchema = z.object({
    userId: z.string().uuid(),
  })

  const { id: shareId } = associateUserParamsSchema.parse(request.params)
  const { userId } = associateUserBodySchema.parse(request.body)

  try {
    const associateUserToShareUseCase = makeAssociateUserToShareUseCase()

    const { share } = await associateUserToShareUseCase.execute({
      shareId,
      userId,
    })

    return reply.status(200).send({ share })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
} 