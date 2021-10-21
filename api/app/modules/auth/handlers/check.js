import { ERRORS } from '../../../config';

export default () => async (ctx, next) => {
	console.log('ctx.state')
	if(ctx.state.user){
		ctx.status = 404
		return ctx.body = {
			status: 'error',
			message: ERRORS['NotFound']
		}
	}
	await next();
};