import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateAssetUseCase } from '../../../use-cases/factories/make-create-asset-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createAssetBodySchema = z.object({
    type: z.enum(['PROPERTY', 'NAUTICAL']),
    name: z.string(),
    location: z.string(),
    totalShares: z.number().positive(),
  })

  const { type, name, location, totalShares } = createAssetBodySchema.parse(
    request.body,
  )

  const createAssetUseCase = makeCreateAssetUseCase()

  const { asset } = await createAssetUseCase.execute({
    type,
    name,
    location,
    totalShares,
  })

  return reply.status(201).send({ asset })
} 