import pick from 'lodash/pick'

import { TokenService } from '../../tokens/services'
import issueTokenPair from '../../../helpers/issueTokenPair'

import { User } from '../../users'
import { UserService } from '../../users'
import { ERRORS } from '../../../config'

import logger from '../../../utils/logs/logger'


export default {
	async profile_get(ctx){
		const {
			state: {
				user
			}
		} = ctx

		logger.info(`----- Info. Request to /user/profile: ${ctx} -----      `)

		if(!['admin','user'].some(role => user.role.includes(role))){
            ctx.status = 403
            return ctx.body = {
                status: 'error',
                message: ERRORS['Forbidden']
            }
        }

		let user_data = null
		
		try{
			user_data = await UserService.findOne(user.phone)
		}catch(ex){
			ctx.status = 500
            return ctx.body = {
                status: 'error',
                message: ERRORS['GetError']
            }
		}

		ctx.body = {
			status: 'success',
            message: { user: user_data }
		}
	},

	async profile_update(ctx){
		const {
			request: {     
				body
			},
			state: {
				user,
				_id
			}
		} = ctx;

		logger.info(`----- Info. Request to /user/profile: ${ctx} -----      `)
		if(user._id.toString() != _id.toString()){
			ctx.status = 403
            return ctx.body = {
                status: 'error',
                message: ERRORS['Forbidden']
            }
		}
		
		if(!['admin','user'].some(role => user.role.includes(role))){
			ctx.status = 403
            return ctx.body = {
                status: 'error',
                message: ERRORS['Forbidden']
            }
		}

		const user_data = {
			...pick(body, User.createFields),
			creator: {
				id: user._id,
				date: new Date()
			}
		}
					  
		let updated_user = null

		console.log('user', user)
		try{
			updated_user = await UserService.updateUser(user_data, user)
		}catch(ex){
			console.log('&&', ex)
			ctx.status = 500
            return ctx.body = {
                status: 'error',
                message: ERRORS[ex.name]
            }
		}

		try{
			await TokenService.removeTokens({ phone: updated_user.phone })
		}catch(ex){
			ctx.status = 500
            return ctx.body = {
                status: 'error',
                message: ERRORS['UpdateError']
            }
		}
        
		let token_pair = null

		try{
			token_pair = await issueTokenPair(updated_user.phone, updated_user)
		}catch(ex){
			ctx.status = 500
            return ctx.body = {
                status: 'error',
                message: ERRORS['UpdateError']
            }
		}

		ctx.body = {
			status: 'success',
            message: { user: updated_user, ...token_pair }
		}
	},

	async users_create(ctx){
		const {
			request: {     
				body
			},
			state: {
				user
			}
		} = ctx;

		logger.info(`----- Info. Request to /users: ${ctx} -----      `)
		
		if(user.role != 'admin' || !user.privileges.user.insert){
			ctx.status = 403
            return ctx.body = {
                status: 'error',
                message: ERRORS['Forbidden']
            }
		}
		
		const user_data = { 
			...pick(body, User.createFields),
			creator: {
				id: user._id,
				date: new Date()
			}
		}

		let new_user = null

		try{
			new_user = await UserService.create(user_data)
		}catch(ex){
			console.log('ex', ex.message)
			ctx.status = 500
            return ctx.body = {
                status: 'error',
                message: ERRORS[ex.name]
            }
		}

		ctx.body = {
			status: 'success',
            message: { new_user }
		}
	},

	async users_update(ctx){
		const {
			request: {     
				body
			},
			state: {
				user,
				_id
			}
		} = ctx;

		logger.info(`----- Info. Request to /users: ${ctx} -----      `)

		if(user.role != 'admin' || !user.privileges.user.update){
			ctx.status = 403
            return ctx.body = {
                status: 'error',
                message: ERRORS['Forbidden']
            }
		}
		
		const user_data = pick(body, User.createFields)
			
		let user_that_will_be_updated = null

		try{
			user_that_will_be_updated = await UserService.getOne({ _id })
		}catch(ex){
			ctx.status = 500
            return ctx.body = {
                status: 'error',
                message: ERRORS['GetError']
            }
		}

		if(!user_that_will_be_updated){
            return ctx.body = {
                status: 'error',
                message: ERRORS['ObjectNotFound']
            }
		}

		let updated_user = null

		try{
			updated_user = await UserService.updateUser(user_data, user_that_will_be_updated)
		}catch(ex){
			
			console.log('ex',ex)
			ctx.status = 500
            return ctx.body = {
                status: 'error',
                message: ERRORS[ex.name]
            }
		}

		ctx.body = {
			status: 'success',
            message: { user: updated_user }
		}
	},

	async users_get(ctx){
		const {
			state: {
				user
			}
		} = ctx;

		logger.info(`----- Info. Request to /users: ${ctx} -----      `)

		console.log(user.role, user.privileges.user.get)
		if(user.role != 'admin' || !user.privileges.user.get){
			ctx.status = 403
            return ctx.body = {
                status: 'error',
                message: ERRORS['Forbidden']
            }
		}
		
		let users = null

		try{
			users = await UserService.find()
		}catch(ex){
			ctx.status = 500
            return ctx.body = {
                status: 'error',
                message: ERRORS['GetError']
            }
		}

		ctx.body = {
			status: 'success',
            message: { users }
		}
	},


	async sync(ctx){
		const {
            request: {
                body: {
                    sync = null
                }
            }
        } = ctx

		logger.info(`----- Info. Request to /sync/sync: ${ctx} -----      `)

        if(sync != 1){
            ctx.status = 404
            ctx.body = {
                status: 'error',
                message: ERRORS['NotFound']
            }
        }

		let user = null

		try{
			user = await UserService.create({
				firstName: 'Алишер',
                lastName: 'Абдуллаев',
                role: 'admin',
                phone: '+998996983669',
                password: 'sync1234',
				privileges: {
					user: {
						insert: true,
						update: true,
						get: true,
						delete: true
					}
				},
				creator: {
					id: '61701347d5245634d05d910c',
					date: new Date
				}
			})			
		}catch(ex){
			logger.error(`----- Error. Sync status: ${ex.status}, message: ${ex.message} -----      `)
            ctx.status = 500
            return ctx.body = {
                status: 'error',
                message: ERRORS[ex.name]
            }
		}

		return ctx.body = {
            status: 'success',
            message: { user }
        }
	}
};
