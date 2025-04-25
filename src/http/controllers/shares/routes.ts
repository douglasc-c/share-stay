import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { list } from './list'
import { transfer } from './transfer'
import { associateUser } from './associate-user'
import { deleteShare } from './delete'
import { update } from './update'

export async function sharesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/shares', create)
  app.get('/shares', list)
  app.post('/shares/:id/transfer', transfer)
  app.post('/shares/:id/associate', associateUser)
  app.patch('/shares/:id', update)
  app.delete('/shares/:id', deleteShare)
}
