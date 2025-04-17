import { FastifyInstance } from 'fastify'

import { usersRoutes } from './controllers/users/routes'
import { assetsRoutes } from './controllers/assets/routes'
import { sharesRoutes } from './controllers/shares/routes'  

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes)
  app.register(assetsRoutes)
  app.register(sharesRoutes)
}
