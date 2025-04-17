import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetAssetByIdUseCase } from '@/use-cases/factories/assets/make-get-asset-by-id-use-case'

export async function getById(request: FastifyRequest, reply: FastifyReply) {
  const getAssetByIdParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getAssetByIdParamsSchema.parse(request.params)

  try {
    const getAssetByIdUseCase = makeGetAssetByIdUseCase()

    const { asset } = await getAssetByIdUseCase.execute({
      assetId: id,
    })

    return reply.status(200).send({ asset })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
} 