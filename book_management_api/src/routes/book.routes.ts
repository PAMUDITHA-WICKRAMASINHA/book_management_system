import { Router } from 'express';
const routes = Router({ mergeParams: true });

import * as bookController from '../controller/book.controller';
import {UserAuthenticationMiddleware} from '../middleware/authentication';
import { validate } from '../validator/book.validator';
import { constants as VALIDATOR } from '../constants/validator/book.constant';

const PATH = {
	ROOT: '/',
	CREATE: '/create',
	GET: '/get',
	UPDATE: '/update',
	DELETE: '/delete'
};

routes.route(PATH.CREATE).post(validate(VALIDATOR.CREATE_BOOK), UserAuthenticationMiddleware, bookController.bookCreate);
routes.route(PATH.GET).get(UserAuthenticationMiddleware, bookController.bookGet);
routes.route(PATH.UPDATE).put(validate(VALIDATOR.UPDATE_BOOK), UserAuthenticationMiddleware, bookController.bookUpdate);
routes.route(PATH.DELETE).post(validate(VALIDATOR.DELETE_BOOK), UserAuthenticationMiddleware, bookController.bookDelete);

export default routes;
