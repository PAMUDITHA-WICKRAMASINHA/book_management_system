import { model, Schema } from "mongoose";
import connection from "../config/database";

const schema = {
	book_id: {type: String},
    title: {type: String},
    author: { type: String },
    publication_year: { type: Number },
    genre: {type: String},
    status: {type: String, default: true},
    is_Delete: {type: Boolean, default: false},
    user_id: {type: String}
}

const timestamps = { createdAt: "created_at", updatedAt: "updated_at" };

const userSchema = new Schema(schema, { timestamps });

export default connection.model("book", userSchema) as any;