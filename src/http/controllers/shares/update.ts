import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeUpdateShareUseCase } from '@/use-cases/factories/shares/make-update-share-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateShareParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const updateShareBodySchema = z.object({
    currentSeason: z.enum(['HIGH', 'MEDIUM', 'LOW']).optional(),
    seasonOrder: z.number().int().positive().optional(),
    currentYear: z.number().int().optional(),
  })

  const { id } = updateShareParamsSchema.parse(request.params)
  const { currentSeason, seasonOrder, currentYear } =
    updateShareBodySchema.parse(request.body)

  try {
    const updateShareUseCase = makeUpdateShareUseCase()

    const { share } = await updateShareUseCase.execute({
      shareId: id,
      currentSeason,
      seasonOrder,
      currentYear,
    })

    return reply.status(200).send({ share })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
