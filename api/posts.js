const express = require("express");
const postRouter = express.Router();
const db = require("../data/db.js")

function clg(...x) {
	for (let exes of x) console.log(exes);
}

postRouter.use(express.json());

postRouter.get("/", (req, res) => {
	// basic READ all posts
	db.find(req.query)
		.then(posts => {
			clg(">>> GET posts all");
			res.status(200).json(posts);
		})
		.catch(error => {
			res.status(500).json({
				msg: "Error READing all posts."
			});
		});
	});
	
	postRouter.get("/:id", (req, res) => {
		db.findById(req.params.id)
		.then(post => {
			clg(">>> GET one post");
			post.length > 0
				? res.status(200).json(post)
				: res.status(404).json({ msg: "Nonexistant Post." })
		})
		.catch(err => {
			clg(err);
			res.status(500).json({
				msg: "Error READing one single post."
			})
		})
})

postRouter.post("/", (req, res) => {
	// CREATE single new post
	db.insert(req.body)
		.then(post => {
			clg(">>> POST new post");
			res.status(201).json(post);
		})
		.catch(err => {
			clg(err);
			res.status(500).json({
				msg: "Error CREATEing new post."
			})
		})
})



module.exports = postRouter;