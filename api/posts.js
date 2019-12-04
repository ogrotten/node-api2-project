const express = require("express");
const postRouter = express.Router();
const db = require("../data/db.js")
const commentRouter = require("./comments");


function clg(...x) {
	for (let exes of x) console.log(exes);
}

postRouter.use(express.json());


// basic READ all posts
postRouter.get("/", (req, res) => {
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

// READ one post
postRouter.get("/:id", (req, res) => {
	db.findById(req.params.id)
		.then(post => {
			clg(">>> GET one post");
			post.length > 0
				? res.status(200).json(post)
				: res.status(404).json({ msg: "Nonexistant Post. (READ)" })
		})
		.catch(err => {
			clg(err);
			res.status(500).json({
				msg: "Error READing one single post."
			});
		});
});

// CREATE single new post
postRouter.post("/", (req, res) => {
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
});

// UPDATE single existing post
postRouter.put("/:id", (req, res) => {
	db.update(req.params.id, req.body)
	.then(post => {
		clg(`>>> PUT successful? ${post}`);
		post
			? res.status(200).json(req.body)
			: res.status(404).json({ msg: "Nonexistant Post. (UPDATE)" })
	})
	.catch(err => {
		clg(err);
		res.status(500).json({
			msg: "Error UPDATEing existing post."
		})
	})
})

postRouter.delete("/:id", (req, res) => {
	db.remove(req.params.id)
	.then(post => {
		clg(`>>> DELETE successful? ${post}`);
		post
			? res.status(200).json({ msg: `Deleted Post ${req.params.id}. (DELETE)` })
			: res.status(404).json({ msg: `Post ${req.params.id} Nonexistant. (DELETE)` })
	})
	.catch(err => {
		clg(err);
		res.status(500).json({
			msg: "Error DELETINGing existing post."
		})
	})
})

module.exports = postRouter;
module.exports = commentRouter;