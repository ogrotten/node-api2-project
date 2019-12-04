const express = require("express");
const commentRouter = express.Router();
const db = require("../data/db.js")

function clg(...x) {
	for (let exes of x) console.log(exes);
}

commentRouter.use(express.json());

commentRouter.get("/:id/comments/", (req, res) => {
	clg(req.params.id);
	const exists = db.findById(req.params.id);

	if (exists) {
		db.findPostComments(req.params.id)
			.then(comments => {

				clg(">>> GET comments");
				comments.length > 0
					? res.status(200).json(comments)
					: res.status(404).json({ msg: "No Comments for that post. (READ)" })
			})
			.catch(err => {
				console.error(err);
				res.status(500).json({
					msg: "Error READing comments."
				});
			});
		res.end()
	} else {
		res.status(404).json({ msg: "Nonexistant Post. (comments READ)" })
	}

});


module.exports = commentRouter;