import bookModel from "../models/book.model";
import userModel from "../models/user.model";
import * as userRepo from "../repository/user.repo";
import { decrypt } from "../utils/utitlity";

export const userRegistration = async ({user_name, email, password}) => {
    let data = {error: false, message: ""}

    try{
        const userData = await userModel.findOne({
            email,
            is_delete: false,
        });
        if(userData){
            data = {error: true, message: "user alredy exit"}
            return data;
        }

        await userRepo.userRegistration({user_name, email, password});
        data = {error: false, message: "user create sucess"}
        return data;
    }catch(error){
        console.log(error);
        data = {error: true, message: "something went wrong"}
        return data;
    }
};

export const userLogin = async ({email, password}) => {
    let data = {error: false, message: ""}

    try{
        const userData = await userModel.findOne({email: email});
	
		if (!userData) {
			const data = { error: true, message: "user does not exist" };
			return data;
		}
	
		if (!userData.password) {
			const data = { error: true, message: "Password not matched" };
			return data;
		}
	
		const decryptPassword = await decrypt(
			password,
			userData.password ?? ""
		);
	
		if (!decryptPassword) {
			const data = { error: true, message: "Password not matched" };
			return data;
		}
	
		const data = userRepo.loginUser(userData)
		return data;
    }catch(error){
        data = {error: true, message: "something went wrong"}
        return data;
    }
};

export const userDelete = async ({user_id}) => {
    let data = {error: false, message: ""}

    try{
        const deletedUser = await userModel.findOneAndDelete({ user_id });

        if (!deletedUser) {
            data = { error: true, message: "User not found" };
        } else {
            await bookModel.deleteMany({ user_id });
            data = { error: false, message: "User deleted success" };
        }
        return data;
    }catch(error){
        data = {error: true, message: "something went wrong"}
        return data;
    }
};