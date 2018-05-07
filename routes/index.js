const express = require("express"),
	router = express.Router();

// respond with "hello world" when a GET request is made to the homepage
router.get("/", (req, res) => {
	req.session.views = (req.session.views || 0) + 1;
	res.end(`hello there, you have ${req.session.views} views`);
});

module.exports = router;
