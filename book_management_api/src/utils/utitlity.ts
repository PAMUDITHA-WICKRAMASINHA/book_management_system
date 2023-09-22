import crypto from "crypto";
import { Response } from "express";
import HTTPStatus from "http-status";
import { constants as ERROR_CONST } from "../constants/error";
import bcrypt from "bcryptjs";

interface errorObject {
	message: string;
}

interface errorResponseJson {
	error: errorObject;
}

export const badRequestError = (res: Response, errors: string) => {
	let code: number, response: errorResponseJson;
	const data = { message: errors };
	code = HTTPStatus.BAD_REQUEST;
	response = createErrorResponseJSON(data);
	return sendJSONResponse(res, code, response);
};

export const notFountRequestError = (res: Response, errors: string) => {
	let code: number, response: errorResponseJson;
	const data = { message: errors };
	code = HTTPStatus.NOT_FOUND;
	response = createErrorResponseJSON(data);
	return sendJSONResponse(res, code, response);
};

export const sendJSONResponse = (
	res: Response,
	statusCode: number,
	data: errorResponseJson
) => {
	console.log("data", data)
	res.status(statusCode).json(data);
};

export const createErrorResponseJSON = (error: errorObject) => {
	const errorResponse = { error };
	return errorResponse;
};

export const serverError = (res: Response) => {
	let code: number, response: errorResponseJson;
	const data: errorObject = {
		message: ERROR_CONST.ERROR_500_MESSAGE,
	};
	code = HTTPStatus.INTERNAL_SERVER_ERROR;
	response = createErrorResponseJSON(data);
	return sendJSONResponse(res, code, response);
};

export const encrypt = async (data: string) => {
	const salt = await bcrypt.genSalt(10);
	let mystr = await bcrypt.hash(data, salt);
	return mystr;
};

export const decrypt = async (data: string, hashData: string) => {
	const match = await bcrypt.compare(data, hashData);
	return match;
};