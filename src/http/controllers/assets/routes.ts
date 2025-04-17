import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'
import { search } from './search'
import { getById } from './get-by-id'

export async function assetsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/assets', create)
  app.get('/assets', search)
  app.get('/assets/:id', getById)
} 