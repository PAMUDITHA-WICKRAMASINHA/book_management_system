import { v4 as uuidv4 } from "uuid";
import bookModel from "../models/book.model";

export const bookCreate = async ({title, author, publication_year, genre, user_id}) => {
	const book_id = uuidv4();

	const user = {book_id, title, author, publication_year, genre, user_id};

	return new Promise(async(resolve, reject) => {
	  try {
		const newBookCreate = new bookModel({...user});
		const addedBook = Promise.resolve(newBookCreate.save());
		resolve(addedBook);
	  } catch (err) {
		reject(err);
	  }
	});
  };