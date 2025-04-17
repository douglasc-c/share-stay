import { makeCreateAssetUseCase } from '@/use-cases/factories/assets/make-create-asset-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'


export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createAssetBodySchema = z.object({
    type: z.enum(['PROPERTY', 'NAUTICAL']),
    name: z.string(),
    description: z.string(),
    totalValue: z.number().positive(),
    totalShares: z.number().positive(),
    address: z.object({
      street: z.string(),
      number: z.string(),
      complement: z.string().optional(),
      neighborhood: z.string(),
      city: z.string(),
      state: z.string(),
      zip_code: z.string(),
    }),
    seasons: z.array(z.object({
      type: z.enum(['HIGH', 'MEDIUM', 'LOW']),
      order: z.number().positive(),
      currentYear: z.number().int(),
    }))
  })

  const { type, name, description, totalValue, totalShares, address, seasons } = createAssetBodySchema.parse(
    request.body,
  )

  const createAssetUseCase = makeCreateAssetUseCase()

  const { asset } = await createAssetUseCase.execute({
    type,
    name,
    description,
    totalValue,
    totalShares,
    address,
    seasons,
  })

  return reply.status(201).send({ asset })
} 