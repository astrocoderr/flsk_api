import issueTokenPair from '../../../helpers/issueTokenPair'
import phoneValidation from '../helpers/phone-validation'
import signupHelper from '../helpers/signup-helper'
import { ERRORS } from '../../../config'
import { client } from '../../../server'

import { UserService } from '../../users/services'


import logger from '../../../utils/logs/logger'


export default {
	async signup(ctx){
		logger.info(`----- Request to /menu/auth/signup -----     `)

		const {
			request: {
				body: {
					phone = null
				}
			}
		} = ctx

		const passed = phoneValidation(phone)

		if(!passed){
			logger.error(`----- Error. 'phone' is not passed -----     `)
			ctx.status = 400
			return ctx.body = {
				status: 'error',
				message: ERRORS['BadRequest']
			};
		}


		let user = null
		
		try{
			user = await UserService.findOne(phone)
		}catch(ex){
			logger.error(`----- Error. Signin status: ${ex.status}, message: ${ex.message} -----     `)
		}

		// if(!user){
		// 	logger.error(`----- Error. 'User' is not found -----     `)
		// 	ctx.status = 400
		// 	return ctx.body = {
		// 		status: 'error',
		// 		message: ERRORS['BadRequest']
		// 	};
		// }

		const done = signupHelper(phone)

		if(done){
			return ctx.body = {
				status: 'success',
				message: {
					message: `СМС успешно отправлен`
				}
			}
		}else{
			ctx.status = 500
			return ctx.body = {
				status: 'error',
				message: ERRORS['TemporaryStorageError']
			}
		}
		    
	}, 

	async signin(ctx){
		const {
			request: {
				body: {
					code = null
				}
			}
		} = ctx

		if(!code){
			logger.error(`----- 'Code' is null or undefined -----     `)
			ctx.status = 400
			return ctx.body = {
				status: 'error',
				message: ERRORS['BadRequest']
			}
		}

		console.log('code 1', code)
		const is_exist = JSON.parse(await client.get(code))

		console.log('is_exist', is_exist)
		if(!is_exist){
			logger.error(`----- Error 'phone' doesn't exist -----     `)
			ctx.status = 400
			return ctx.body = {
				status: 'error',
				message: ERRORS['ObjectNotFound']
			}
		}

		let user = null

		try {
			user = await UserService.findOne(is_exist.phone)
		}catch(ex){
			ctx.status = 500
			return ctx.body = {
				status: 'error',
				message: ERRORS[ex.name]
			}
		}

		console.log('user', user)
		const { token, refreshToken } = await issueTokenPair(is_exist.phone, user)


		ctx.body = {
			'status': 'success',
			'message': {
				user,
				token,
				refreshToken
			}
		}

	}
};

