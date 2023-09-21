import { model, Schema } from "mongoose";
import connection from "../config/database";

const schema = {
	user_id: {type: String},
    email: {type: String},
    user_name: { type: String },
    password: { type: String },
    status: {type: String, default: true},
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    is_Delete: {type: Boolean, default: false}
}

const timestamps = { createdAt: "created_at", updatedAt: "updated_at" };

const userSchema = new Schema(schema, { timestamps });

export default connection.model("user", userSchema) as any;