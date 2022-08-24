import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import dbConn from "./database/db.js";
import userRoute from "./Router/Users.js";
import postRoute from "./Router/Post.js";
import commentRoute from "./Router/Comments.js";
import orderRoute from "./Router/Orders.js";


const app = express();
dotenv.config();
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "UPDATE"],
  })
);

app.use("/public", express.static("./public"));

app.use(bodyParser.json({ limit: "40mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "40mb", extended: true }));

// invoking the database
dbConn();

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);
app.use("/api/orders", orderRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server running on port ${PORT}`));
