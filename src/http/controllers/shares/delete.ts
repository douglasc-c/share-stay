import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeDeleteShareUseCase } from '@/use-cases/factories/shares/make-delete-share-use-case'

export async function deleteShare(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteShareParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = deleteShareParamsSchema.parse(request.params)

  try {
    const deleteShareUseCase = makeDeleteShareUseCase()

    await deleteShareUseCase.execute({
      shareId: id,
    })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
