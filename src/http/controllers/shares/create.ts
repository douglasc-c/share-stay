import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateShareUseCase } from '@/use-cases/factories/make-create-share-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { MaxSharesExceededError } from '@/use-cases/errors/max-shares-exceeded-error'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createShareBodySchema = z.object({
    assetId: z.string().uuid(),
    userId: z.string().uuid(),
    currentSeason: z.enum(['HIGH', 'MEDIUM', 'LOW']),
    seasonOrder: z.number().int().positive(),
    currentYear: z.number().int(),
  })

  const { assetId, userId, currentSeason, seasonOrder, currentYear } =
    createShareBodySchema.parse(request.body)

  try {
    const createShareUseCase = makeCreateShareUseCase()

    const { share } = await createShareUseCase.execute({
      assetId,
      userId,
      currentSeason,
      seasonOrder,
      currentYear,
    })

    return reply.status(201).send({ share })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    if (error instanceof MaxSharesExceededError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
} 