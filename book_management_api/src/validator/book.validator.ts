import { body, param } from 'express-validator';
import { constants as VALIDATOR } from '../constants/validator/book.constant';

export const validate = (method: string) => {
	let error = [];
	switch (method) {
		case VALIDATOR.CREATE_BOOK: {
			error = [body('title', 'title is required').not().isEmpty(),
					body('author', 'author is required').not().isEmpty(),
					body('publication_year', 'publication_year is required').not().isEmpty(),
					body('genre', 'genre is required').not().isEmpty()
			];
			break;
		}

		case VALIDATOR.UPDATE_BOOK: {
			error = [body('book_id', 'book_id is required').not().isEmpty()];
			break;
		}

		case VALIDATOR.DELETE_BOOK: {
			error = [body('book_id', 'book_id is required').not().isEmpty()];
			break;
		}
	}
	return error;
};
