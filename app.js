// dependencies we require
const express = require("express"),
	cookieSession = require("cookie-session"),
	config = require("./config"),
	indexRoute = require("./routes/index"),
	psqlRoute = require("./routes/psql");

const app = express(),
	port = config.port,
	host = config.host;

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
app.use("/psql", psqlRoute);

// console.log yields error b/c of linter
app.listen(port, host, () =>
	console.log(`Example app listening on ${host}:${port}!`)
);
