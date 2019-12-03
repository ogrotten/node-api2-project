const express = require("express");
const db = require("../data/db.js")

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
	res.send(`<h1>Server Up</h1>`);
});

module.exports = server;