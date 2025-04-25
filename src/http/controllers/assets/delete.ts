import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeDeleteAssetUseCase } from '@/use-cases/factories/assets/make-delete-asset-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function deleteAsset(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteAssetParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = deleteAssetParamsSchema.parse(request.params)

  try {
    const deleteAssetUseCase = makeDeleteAssetUseCase()

    await deleteAssetUseCase.execute({
      assetId: id,
    })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
