import exp from "express";
import { register } from "../services/authService.js";
import { UserTypeModel } from "../models/usermodel.js";
import { ArticleModel } from "../models/articlemodel.js";

export const userRoute = exp.Router();

// register user
userRoute.post("/users", async (req, res) => {
  let userObj = req.body;
  let newUserObj = await register({ ...userObj, role: "USER" });

  res.status(201).json({
    message: "user created",
    payload: newUserObj,
  });
});

// Read all articles
userRoute.get("/articles/:authorId", async (req, res) => {
  // get author id
  let authorId = req.params.authorId;

  // read articles by author which are active
  let articles = await ArticleModel.find({
    author: authorId,
    isArticleActive: true,
  }).populate("author", "firstName");

  // res
  res.status(200).json({ message: "articles", payload: articles });
});
