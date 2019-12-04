const express = require("express");
const db = require("../data/db.js")
const postRouter = require("../api/posts.js")
const commentRouter = require("../api/comments.js")

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
	res.send(`<h1>Server Up</h1>`);
});

server.use("/api/posts", postRouter);
// server.use("/api/posts/", commentRouter);

module.exports = server;