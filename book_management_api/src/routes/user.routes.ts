import { Router } from 'express';
const routes = Router({ mergeParams: true });
import { validate } from '../validator/user.validator';
import * as userController from '../controller/user.controller';
import {UserAuthenticationMiddleware} from '../middleware/authentication';
import { constants as VALIDATOR } from '../constants/validator/user.constant';

const PATH = {
	ROOT: '/',
	REGISTER: '/register',
	LOGIN: '/login',
	DELETE_USER: '/delete',
};

routes.route(PATH.REGISTER).post(userController.userRegistration);
routes.route(PATH.LOGIN).post(userController.userLogin);
routes.route(PATH.DELETE_USER).post(validate(VALIDATOR.DELETE_USER), UserAuthenticationMiddleware, userController.userDelete);

export default routes;
