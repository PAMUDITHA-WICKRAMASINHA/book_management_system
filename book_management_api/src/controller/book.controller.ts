import { Request, Response } from "express";
import JWTAuth from "../service/jwt_auth/jwt_auth";
import { validationResult } from "express-validator";
import { notFountRequestError, serverError } from "../utils/utitlity";
import * as bookService from "../service/book.service";

const auth = new JWTAuth();

export const bookCreate = async (req:Request, res: Response) => {
	const errors = validationResult(req);
	try {
		if (!errors.isEmpty()) {
			return notFountRequestError(res, errors.array()[0].msg);
		}

		let accessToken = req.headers.authorization.split(' ')[1];
		const userData = await auth.verifyToken(accessToken);

		const {title, author, publication_year, genre} = req.body;
		const result = await bookService.bookCreate({title, author, publication_year, genre}, userData['user_id']);
		if (result.error) {
			return notFountRequestError(res, result.message);
		}
		return res.status(201).json(result);
	} catch (error) {
		serverError(res);
	}
};

export const bookGet = async (req:Request, res: Response) => {
	const errors = validationResult(req);
	try {
		if (!errors.isEmpty()) {
			return notFountRequestError(res, errors.array()[0].msg);
		}

		let accessToken = req.headers.authorization.split(' ')[1];
		const userData = await auth.verifyToken(accessToken);

		const {title, author, genre, page_number, row_pre_page} = req.query;
		const result = await bookService.bookGet({title, author, genre, page_number, row_pre_page}, userData['user_id']);
		if (result.error) {
			return notFountRequestError(res, result.message);
		}
		return res.status(200).json(result);
	} catch (error) {
		serverError(res);
	}
};

export const bookUpdate = async (req:Request, res: Response) => {
	const errors = validationResult(req);
	try {
		if (!errors.isEmpty()) {
			return notFountRequestError(res, errors.array()[0].msg);
		}

		let accessToken = req.headers.authorization.split(' ')[1];
		const userData = await auth.verifyToken(accessToken);

		const {title, author, genre, publication_year, book_id} = req.body;
		const result = await bookService.bookUpdate({ book_id, title, author, genre, publication_year });
		if (result.error) {
			return notFountRequestError(res, result.message);
		}
		return res.status(200).json(result);
	} catch (error) {
		serverError(res);
	}
};

export const bookDelete = async (req:Request, res: Response) => {
	const errors = validationResult(req);
	try {
		if (!errors.isEmpty()) {
			return notFountRequestError(res, errors.array()[0].msg);
		}

		let accessToken = req.headers.authorization.split(' ')[1];
		const userData = await auth.verifyToken(accessToken);

		const {book_id} = req.body;
		const result = await bookService.bookDelete({book_id});
		if (result.error) {
			return notFountRequestError(res, result.message);
		}
		return res.status(200).json(result);
	} catch (error) {
		serverError(res);
	}
};