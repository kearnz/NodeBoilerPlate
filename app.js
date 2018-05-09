// dependencies we require
const express = require("express"),
	cookieSession = require("cookie-session"),
	{ Client } = require("pg"),
	config = require("./config"),
	indexRoute = require("./routes/index");

const app = express(),
	port = config.port,
	host = config.host,
	client = new Client();

// an example of middleware function
const myDateLogger = (req, res, next) => {
	console.log(new Date().toISOString());
	next();
};

// using middleware for console log (demo only)
app.use(myDateLogger);

// example using configured middleware
// note needs to come before indexRoute to pickup session views
app.use(
	cookieSession({
		name: "session",
		keys: ["key1", "key2"]
	})
);

// modularizing routes
app.use("/", indexRoute);

// demonstrate ability to use postgres with node
(async () => {
	await client.connect();
	const res = await client.query("SELECT $1::text as message", [
		"Hello World from Postgres!"
	]);
	console.log(res.rows[0].message); // Hello World ffrom Postgres!
	await client.end();
})();

// console.log yields error b/c of linter
app.listen(port, host, () =>
	console.log(`Example app listening on ${host}:${port}!`)
);
