// dependencies we require
const cookieSession = require("cookie-session"),
	bodyParser = require("body-parser"),
	indexRoute = require("./routes/index");

const setup = server => {
	// an example of middleware function
	const myDateLogger = (req, res, next) => {
		console.log(new Date().toISOString());
		next();
	};

	// using middleware for console log (demo only)
	server.use(myDateLogger);

	// middleware for parsing json
	server.use(bodyParser.json());

	// example using configured middleware
	// note needs to come before indexRoute to pickup session views
	server.use(
		cookieSession({
			name: "session",
			keys: ["key1", "key2"]
		})
	);

	// modularizing routes
	server.use("/", indexRoute);

	return server;
};
// console.log yields error b/c of linter
const start = (server, config) => {
	const port = config.port,
		host = config.host;
	server.listen(port, host, () =>
		console.log(`Example app listening on ${host}:${port}!`)
	);
};

module.exports = {
	setup: setup,
	start: start
};
