import Router from 'koa-router';
import mainController from './controllers/main-controller';
import checkUser from '../../handlers/checkUser';
import checkAuth from './handlers/checkAuth';
import check from './handlers/check';

const router = new Router();

router
	.param('id', check())
	.post('/sync/sync', mainController.sync)
	// profile
	.get('/user/profile', checkUser(), mainController.profile_get)
	.put('/user/profile/:id', checkUser(), mainController.profile_update)
	// working with user table
	.post('/users', checkUser(), mainController.users_create)
	.put('/users/:id', checkUser(), mainController.users_update)
	.get('/users', checkUser(), mainController.users_get)

export default router.routes();
