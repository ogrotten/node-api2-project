const express = require("express");
const commentRouter = express.Router();
const db = require("../data/db.js")

function clg(...x) {
	for (let exes of x) console.log(exes);
}

commentRouter.use(express.json());

module.exports = commentRouter;