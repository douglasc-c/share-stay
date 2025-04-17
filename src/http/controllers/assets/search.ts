import { FastifyRequest, FastifyReply } from 'fastify'
import { makeSearchAssetsUseCase } from '@/use-cases/factories/assets/make-search-assets-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchAssetsUseCase = makeSearchAssetsUseCase()

  const { assets } = await searchAssetsUseCase.execute()

  return reply.status(200).send({
    assets,
  })
} 