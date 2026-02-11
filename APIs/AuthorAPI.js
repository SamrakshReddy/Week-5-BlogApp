import exp from "express";
import { authenticate, register } from "../services/authService.js";
import { UserTypeModel } from "../models/usermodel.js";
import { ArticleModel } from "../models/articlemodel.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { checkAuthor } from "../middlewares/checkAuthor.js";

export const authorRoute = exp.Router();

// register author
authorRoute.post("/users", async (req, res) => {
  const authorObj = req.body;
  const newAuthor = await register({ ...authorObj, role: "AUTHOR" });

  res.status(201).json({message: "Author created",payload: newAuthor});
});

// create article
authorRoute.post("/articles", async (req, res) => {
  // get article object
  let article = req.body;

  // check the author
  let author = await UserTypeModel.findById(article.author);
  if (!author || author.role !== "AUTHOR") {
    return res.status(401).json({ message: "Invalid author" });
  }

  // create article
  let newArticleDoc = new ArticleModel(article);
  let createdArticleDoc = await newArticleDoc.save();

  // res
  res.status(201).json({
    message: "article created",
    payload: createdArticleDoc,
  });
});

// Read articles of author
authorRoute.get("/articles/:authorId", async (req, res) => {
  // get author id
  let authorId = req.params.authorId;

  // check the author
  let author = await UserTypeModel.findById(authorId);
  if (!author || author.role !== "AUTHOR") {
    return res.status(401).json({ message: "Invalid Author" });
  }

  // read articles by this author
  let articles = await ArticleModel.find({
    author: authorId,
    isArticleActive: true,
  }).populate("author", "firstName");

  // res
  res.status(200).json({ message: "article read", payload: articles });
});

// edit article (protected)
authorRoute.put("/articles", verifyToken, checkAuthor, async (req, res) => {
  // get modified article
  let { articleId, title, category, content } = req.body;

  // find article
  let articleOfDB = await ArticleModel.findById(articleId);
  if (!articleOfDB) {
    return res.status(401).json({ message: "Article not found" });
  }

  // update article
  let updatedArticle = await ArticleModel.findByIdAndUpdate(
    articleId,{ $set: { title, category, content } },
    { new: true }
  );

  // res
  res.status(200).json({message: "article updated",payload: updatedArticle});
});
