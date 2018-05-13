const express = require("express"),
	{ Client } = require("pg");

// demonstrating use of postgres client
// make it specific to this instance
const client = new Client(),
	router = express.Router();

// demonstrate ability to use postgres with node
let postgresHello = async () => {
	// note - in a real application, use connection pools (pgBouncer or pgPool)
	// opening up connections to Postgres gets expensive, very quickly
	await client.connect();
	const res = await client.query("SELECT $1::text as message", [
		"Hello World from Postgres!"
	]);
	await client.end();
	return res.rows[0].message;
};

router.get("/", (req, res) => {
	res.end(postgresHello());
});

module.exports = router;
