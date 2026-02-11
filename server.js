import exp from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

import { userRoute } from "./APIs/userAPI.js";
import { authorRoute } from "./APIs/authorAPI.js";
import { adminRoute } from "./APIs/adminAPI.js";
import { commonRouter } from "./APIs/CommonAPI.js";

config();

const app = exp();

app.use(exp.json());
app.use(cookieParser());

app.use("/user-api", userRoute);
app.use("/author-api", authorRoute);
app.use("/admin-api", adminRoute);
app.use("/common-api", commonRouter);

// global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong",
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "Invalid path" });
});

const connectDB = async () => {
  await connect(process.env.DB_URL);
  console.log("DB connected");

  app.listen(process.env.PORT, () =>
    console.log("Server running on port", process.env.PORT)
  );
};

connectDB();
