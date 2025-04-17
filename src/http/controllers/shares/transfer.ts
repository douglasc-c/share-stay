import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeTransferShareUseCase } from '@/use-cases/factories/make-transfer-share-use-case'

export async function transfer(request: FastifyRequest, reply: FastifyReply) {
  const transferShareParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const transferShareBodySchema = z.object({
    newUserId: z.string().uuid(),
  })

  const { id } = transferShareParamsSchema.parse(request.params)
  const { newUserId } = transferShareBodySchema.parse(request.body)

  try {
    const transferShareUseCase = makeTransferShareUseCase()

    await transferShareUseCase.execute({
      shareId: id,
      newUserId,
    })

    return reply.status(204).send()
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ message: 'Internal server error' })
  }
} 