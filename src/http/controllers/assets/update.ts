import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeUpdateAssetUseCase } from '@/use-cases/factories/assets/make-update-asset-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateAssetParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const updateAssetBodySchema = z.object({
    type: z.enum(['PROPERTY', 'NAUTICAL']).optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    totalValue: z.number().positive().optional(),
    totalShares: z.number().positive().optional(),
    location: z.string().optional(),
  })

  const { id } = updateAssetParamsSchema.parse(request.params)
  const { type, name, description, totalValue, totalShares, location } =
    updateAssetBodySchema.parse(request.body)

  try {
    const updateAssetUseCase = makeUpdateAssetUseCase()

    const { asset } = await updateAssetUseCase.execute({
      assetId: id,
      type,
      name,
      description,
      totalValue,
      totalShares,
      location,
    })

    return reply.status(200).send({ asset })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
