import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { register } from './register'
import { profile } from './profile'
import { authenticate } from './authenticate'
import { addAddress } from './add-address'
import { update } from './update'
import { updateAddress } from './update-address'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.addHook('onRequest', verifyJWT)

  app.get('/users/:userId', profile)
  app.post('/users/:userId/address', addAddress)
  app.patch('/users/:userId', update)
  app.patch('/users/:userId/address/:addressId', updateAddress)
}
