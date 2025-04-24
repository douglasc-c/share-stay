import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeUpdateUserAddressUseCase } from '@/use-cases/factories/users/make-update-user-address-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function updateAddress(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateAddressParamsSchema = z.object({
    userId: z.string().uuid(),
    addressId: z.string().uuid(),
  })

  const updateAddressBodySchema = z.object({
    street: z.string().optional(),
    number: z.string().optional(),
    complement: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip_code: z.string().optional(),
  })

  const { userId, addressId } = updateAddressParamsSchema.parse(request.params)
  const data = updateAddressBodySchema.parse(request.body)

  try {
    const updateUserAddressUseCase = makeUpdateUserAddressUseCase()

    const { address } = await updateUserAddressUseCase.execute({
      userId,
      addressId,
      data,
    })

    return reply.status(200).send({
      address,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
