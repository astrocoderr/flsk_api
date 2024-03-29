import jwtService from '../services/jwt-service'

import { ERRORS } from '../config'

import logger from '../utils/logs/logger'
import { UserService } from '../modules/users'

export default () => async (ctx, next) => {
	const { authorization } = ctx.headers

	if(authorization) {
		const { phone } = await jwtService.verify(authorization)

		if (!phone) {
			logger.error(`----- 'phone' not found. JWT -----      `)
			ctx.status = 401
			return ctx.body = {
				status: 'error',
				message: ERRORS['Unauthorized']
			}
		}

		let user = null

		try {
			user = await UserService.findOne(phone)
		} catch (ex) {
			ctx.status = 500
			return ctx.body = {
				status: 'error',
				message: ERRORS[ex.name]
			}
		}

		if (!user) {
			logger.error(`----- Error. 'user' not found. JWT -----      `)
			ctx.status = 401
			return ctx.body = {
				status: 'error',
				message: ERRORS['Unauthorized']
			}
		}

		ctx.state.user = user	
	}

	await next()
}
