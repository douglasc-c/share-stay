import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/users/make-get-user-profile-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfileParamsSchema = z.object({
    userId: z.string().uuid(),
  })

  const { userId } = getUserProfileParamsSchema.parse(request.params)

  try {
    const getUserProfile = makeGetUserProfileUseCase()

    const { user, address } = await getUserProfile.execute({
      userId,
    })

    return reply.status(200).send({
      user: {
        ...user,
        password_hash: undefined,
      },
      address,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
