const express = require("express");
const db = require("../data/db.js")
const postRouter = require("../api/posts.js")

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
	res.send(`<h1>Server Up</h1>`);
});

server.use("/api/posts", postRouter);

module.exports = server;