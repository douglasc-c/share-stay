import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/users/make-get-user-profile-use-case'

interface AuthenticatedRequest extends FastifyRequest {
  user: {
    sub: string
  }
}

export async function profile(request: AuthenticatedRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })
  // try {
  // } catch (err) {
  //   if (err instanceof InvalidCredentialsError) {
  //     return reply.status(400).send({ message: err.message })
  //   }
  //   throw err
  // }

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
