import { body, param } from 'express-validator';
import { constants as VALIDATOR } from '../constants/validator/user.constant';

export const validate = (method: string) => {
	let error = [];
	switch (method) {
		case VALIDATOR.CREATE_USER: {
			error = [body('user_name', 'user_name is required').not().isEmpty(),
			body('email', 'email is required').not().isEmpty(),
			body('password', 'password is required').not().isEmpty()
		];
			break;
		}

		case VALIDATOR.DELETE_USER: {
			error = [body('user_id', 'user_id is required').not().isEmpty()];
			break;
		}
	}
	return error;
};
