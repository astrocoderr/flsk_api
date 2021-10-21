import Router from 'koa-router';
import authController from './controllers/auth-controller';
import accessUser from '../../handlers/accessUser';
import checkUser from '../../handlers/checkUser';
import check from './handlers/check';

const router = new Router();

router
	// .post('/menu/auth/signup', authController.access)
	.post('/menu/auth/signup', check(), authController.signup)
	.post('/menu/auth/signin', check(), authController.signin)
	// .param('hash', check())
	// .put('/user/:hash/settings', checkUser(), authController.updateStudent)
	// .delete('/user/:hash', checkUser(), authController.deleteUser)
	// .post('/user/:hash', checkUser(), authController.currentUser);

export default router.routes();