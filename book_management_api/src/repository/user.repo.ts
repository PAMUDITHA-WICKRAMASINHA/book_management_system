import userModel from "../models/user.model";
import { v4 as uuidv4 } from "uuid";
import { encrypt } from "../utils/utitlity";
import JWTAuth from "../service/jwt_auth/jwt_auth";

export interface accessTokenData {
	user_id: string,
	user_name: string,
	email: string,
	role: string,
}

export const userRegistration = async ({user_name, email, password}) => {
	const user_id = uuidv4();
	let encryptedPassword = await encrypt(password);
	password = encryptedPassword;

	const user = {user_id, user_name, email, password};

	return new Promise(async(resolve, reject) => {
	  try {
		const userCreate = new userModel({...user});
		const addedUser = Promise.resolve(userCreate.save());
		resolve(addedUser);
	  } catch (err) {
		reject(err);
	  }
	});
  };

  export const loginUser = async (userData: any) => {
	try {
		const tokenPayload: accessTokenData = {
			user_id: userData.user_id,
			user_name: userData.user_name,
			email: userData.email,
			role: userData.role ? userData.role : "user",
		};

		const auth = new JWTAuth();
		const accessToken = await auth.createToken(tokenPayload);

		const data = {
			error: false,
			message: "login successful",
			data: {
				user_id: tokenPayload.user_id,
				user_name: tokenPayload.user_name,
				role: userData.role ? userData.role : "user",
				email: tokenPayload.email,
				accessToken,
			},
		};
		return data;
	} catch (error) {
		const data = {
			error: true,
			message: "login unsuccessful",
			data: {},
		};
		return data;
	}
};