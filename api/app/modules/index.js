import Router from 'koa-router'

import auth from './auth'
import main from './main'
import token from './tokens'

const router = new Router()

router.use(auth)
router.use(main)
router.use(token)

export default router.routes()