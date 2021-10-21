import { User } from '../../users'
import { ERRORS } from '../../../config'

import logger from '../../../utils/logs/logger'

export default () => async (_id, ctx, next) => {

	let user = null
	
	try{
		user = await User.findOne({ _id }).select({ password: 0 });
	}catch(ex){
		logger.error(`----- Error. check -----`)
		ctx.status = 500
		return ctx.body = {
			status: 'error',
			message: ERRORS['GetError']
		}
	}

	if(!user){
		logger.error(`----- Error. check -----`)
		ctx.status = 403
		return ctx.body = {
			status: 'error',
			message: ERRORS['Forbidden']
		}
	}

	ctx.state._id = user._id;

	await next();
};