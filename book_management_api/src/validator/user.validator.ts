import { body, param } from 'express-validator';
import { constants as VALIDATOR } from '../constants/validator/user.constant';

export const validate = (method: string) => {
	let error = [];
	switch (method) {
		case VALIDATOR.DELETE_USER: {
			error = [body('user_id', 'user_id is required').not().isEmpty()];
			break;
		}
	}
	return error;
};
