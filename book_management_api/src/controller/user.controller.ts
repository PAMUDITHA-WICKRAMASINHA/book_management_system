import { Request, Response } from "express";
import JWTAuth from "../service/jwt_auth/jwt_auth";
import { validationResult } from "express-validator";
import { badRequestError, serverError } from "../utils/utitlity";
import * as userService from "../service/user.service";

const auth = new JWTAuth();

export const userRegistration = async (req:Request, res: Response) => {
	const errors = validationResult(req);
	try {
		if (!errors.isEmpty()) {
			return badRequestError(res, errors.array()[0].msg);
		}

		const {user_name, email, password} = req.body;
		const result = await userService.userRegistration({user_name, email, password});
		if (result.error) {
			return badRequestError(res, result.message);
		}
		return res.status(201).json(result);
	} catch (error) {
		serverError(res);
	}
};

export const userLogin = async (req:Request, res: Response) => {
	const errors = validationResult(req);
	try {
		if (!errors.isEmpty()) {
			return badRequestError(res, errors.array()[0].msg);
		}

		const {email, password} = req.body;
		const result = await userService.userLogin({email, password});
		if (result.error) {
			return badRequestError(res, result.message);
		}
		return res.status(201).json(result);
	} catch (error) {
		serverError(res);
	}
};

export const userDelete = async (req:Request, res: Response) => {
	const errors = validationResult(req);
	try {
		if (!errors.isEmpty()) {
			return badRequestError(res, errors.array()[0].msg);
		}

		const {user_id} = req.body;
		const result = await userService.userDelete({user_id});
		if (result.error) {
			return badRequestError(res, result.message);
		}
		return res.status(201).json(result);
	} catch (error) {
		console.log(error);
		serverError(res);
	}
};