/** @format */

import { Router } from 'express';
const routes = Router();
import userRoutes from './user.routes';
import bookRoutes from './book.routes';

const PATH = {
	ROOT: '/',
	USER: '/user',
	BOOK: '/book',
};

routes.use(PATH.USER, userRoutes);
routes.use(PATH.BOOK, bookRoutes);

export default routes;
