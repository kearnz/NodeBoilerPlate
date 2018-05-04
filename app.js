const cookieSession = require("cookie-session"),
	express = require("express"),
	{ Client } = require("pg"),
	config = require("./config");

const app = express(),
	port = config.port,
	client = new Client();

// an example of middleware function
const myLogger = (req, res, next) => {
	console.log(Date.now());
	next();
};

// using middleware
app.use(myLogger);

// example using configured middleware
app.use(
	cookieSession({
		name: "session",
		keys: ["key1", "key2"]
	})
);

// demonstrate ability to use postgres with node
(async () => {
	await client.connect();
	const res = await client.query("SELECT $1::text as message", [
		"Hello World from Postgres!"
	]);
	console.log(res.rows[0].message); // Hello World ffrom Postgres!
	await client.end();
})();

// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
	req.session.views = (req.session.views || 0) + 1;
	res.end(`hello there, you have ${req.session.views} views`);
});

// console.log yields error b/c of linter
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
