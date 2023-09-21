import httpContext from 'express-http-context';
import JWTAuth from '../service/jwt_auth/jwt_auth';
import userModel from '../models/user.model';
import { NextFunction, Request, Response } from 'express';

const auth = new JWTAuth();
const AUTHORIZATION_HEADER_NAME = 'authorization';
const CURRENT_USER = 'currentUser';

export interface DecodedToken {
	user_name?: string;
	user_id?: string;
	email?: string;
	role?: string;
}

export const UserAuthenticationMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authorization = req.headers[AUTHORIZATION_HEADER_NAME];
	if (authorization) {
		let userData: DecodedToken;
		let accessToken = req.headers.authorization.split(' ')[1];
		try {
			userData = await auth.verifyToken(accessToken);
		} catch (error) {
			if (error.toString().includes('jwt expired')) {
				res.status(401).json({ error: { message: 'Token is expired' } });
				return;
			} else {
				res.status(401).json({ error: { message: 'Invalid JWT Token' } });
				return;
			}
		}
		const [userDoc] = await userModel.find({ email: userData.email });
		if (userDoc) {
			httpContext.set('email', userData.email);
			req[CURRENT_USER] = userData;
			next();
			return;
		} else {
			res.status(401).json({ error: { message: 'invalid request' } });
		}
	} else {
		res.status(401).json({ error: { message: 'not authorized' } });
	}
};
