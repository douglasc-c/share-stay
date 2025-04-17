import { FastifyRequest, FastifyReply } from 'fastify'
import { makeListSharesUseCase } from '@/use-cases/factories/shares/make-list-shares-use-case'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  try {
    const listSharesUseCase = makeListSharesUseCase()
    const { shares } = await listSharesUseCase.execute()

    return reply.status(200).send({ shares })
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ message: 'Internal server error' }) 
  }
} 