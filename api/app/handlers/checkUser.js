import { ERRORS } from '../config'

import logger from '../utils/logs/logger'

export default () => async (ctx, next) => {
	if(!ctx.state.user){
		logger.error(`----- Error. checkUser -----`)
		ctx.status = 403
		return ctx.body = {
			status: 'error',
			message: ERRORS['Forbidden']
		}
	}

	// if(!ctx.state.user.active){
	// 	ctx.status = 403
	// 	return ctx.body = {
	// 		status: 'error',
	// 		message: ERRORS['Forbidden']
	// 	}
	// }

	await next();
};