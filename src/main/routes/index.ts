import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeCreateUserController } from '../factories/controllers/users/create-user-controller-factory'
import { makeCreateAssetController } from '../factories/controllers/assets/create-asset-controller-factory'
import { makeCreateShareController } from '../factories/controllers/shares/create-share-controller-factory'
import { makeGetAssetByIdController } from '../factories/controllers/assets/get-asset-by-id-controller-factory'

const router = Router()

router.post('/users', adaptRoute(makeCreateUserController()))
router.post('/assets', adaptRoute(makeCreateAssetController()))
router.post('/shares', adaptRoute(makeCreateShareController()))
router.get('/assets/:id', adaptRoute(makeGetAssetByIdController()))

export { router } 