import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import logger from 'koa-logger'
import error from './error'
import jwt from './jwt'
import { IS_DEV } from '../utils/env'

export default (app) => {
	if(IS_DEV){
		app.use(logger())
	}

	app.use(cors())
	app.use(error())
	app.use(bodyParser())
	app.use(jwt())
}
