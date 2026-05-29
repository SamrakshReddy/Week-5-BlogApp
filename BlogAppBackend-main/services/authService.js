import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserTypeModel} from "../models/usermodel.js";
import { config } from "dotenv";
config();
//register function
export const register = async (userObj) => {
    //Create document
    const userDoc = new UserTypeModel(userObj);
    //validate for empty password
    await userDoc.validate();
    //hast and replace plain password
    userDoc.password = await bcrypt.hash(userDoc, password, 6);
    //save user
    const created = await userDoc.save();
    //convert document to object to remove password
    const newUserObj = created.toObject();
    //remove password
    delete newUserObj.password;
    //return user obj without password
    return newUserObj;

};

//authenticate function (login)
export const authenticate = async ({ email ,password , role})=>{
    //check user with email & role
    const user = await UserTypeModel.findOne({ email, role});
    if (!user){
        const err = new Error(" Invalid email or role");
        err.status = 401;
        throw err;
    }
    //if user valid but blocked by admin
    if (!user.isACTIVE) {
    const err = new Error("User blocked by admin");
    err.status = 403;
    throw err;
  }

    //compare the passwords
    const isMatch = await bcrypt.compare (password,user.password);
    if(!isMatch){
        const err = new Error (" Invalid password");
        err.status = 401;
        throw err;
    }
    // check isActive state
    if (user.isActive===false){
        const err = new Error("your account blocked.plz contack the admin")
        err.status = 403;
        throw err;
    }
    //generate token
    const token = jwt.sign({ userId:user._id ,role:user._role, email: user.email},
        process.env.JWT_SECREPT,{
            expiresIn: "1h",
        }
    );
    const userObj = user.toObject();
    delete userObj.password;
    return { token, user : userObj};
}  