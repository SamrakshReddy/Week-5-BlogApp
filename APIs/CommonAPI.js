import exp from "express";
import { authenticate } from "../services/authService.js";

export const commonRouter = exp.Router();

// login
commonRouter.post("/login", async (req, res) => {
  // get user cred object
  let userCred = req.body;

  // call authenticate service
  let { token, user } = await authenticate(userCred);

  // save token as httpOnly cookie
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  // send res
  res.status(200).json({ message: "login success", payload: user });
});

// logout
// logout for User, Admin and Author
commonRouter.post("/logout", (req, res) => {
  // clear the cookie named 'token'
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.status(200).json({ message: "logged out successfully" });
});
