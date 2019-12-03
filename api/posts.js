const express = require("express");
const router = express.Router();
const db = require("../data/db.js")

function clg(...x) {
	for (let exes of x) console.log(exes);
}

router.use(express.json());

router.get("/", (req, res) => {
	// basic READ all posts
	db.find(req.query)
	.then(posts => {
		clg("GET posts");
		res.status(200).json(posts);
	})
	.catch(error => {
		res.status(500).json({
			msg: "Error READing posts."
		});
	});
});

router.post("/", (req, res) => {
	// CREATE single new post
	db.insert(req.body)
	.then(post => {
		res.status(201).json(post);
	})
	.catch(err => {
		clg(err);
		res.status(500).json({
			msg: "Error CREATEing new post."
		})
	})
})

module.exports = router;