import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeAddUserAddressUseCase } from '@/use-cases/factories/users/make-add-user-address-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function addAddress(request: FastifyRequest, reply: FastifyReply) {
  const addAddressParamsSchema = z.object({
    userId: z.string().uuid(),
  })

  const addAddressBodySchema = z.object({
    street: z.string(),
    number: z.string(),
    complement: z.string().optional(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    zip_code: z.string(),
  })

  const { userId } = addAddressParamsSchema.parse(request.params)
  const address = addAddressBodySchema.parse(request.body)

  try {
    const addUserAddressUseCase = makeAddUserAddressUseCase()

    const { address: createdAddress } = await addUserAddressUseCase.execute({
      userId,
      address,
    })

    return reply.status(201).send({
      address: createdAddress,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
