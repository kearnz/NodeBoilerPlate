const dotenv = require("dotenv");

// load the .env file
dotenv.config();

// prefer let to const for assignment to funcs
let fromEnv = vName => process.env[vName];

// prefer let to const for assignment to mutable objects
let config = {
	port: fromEnv("PORT") || 3000,
	host: fromEnv("HOST") || "localhost"
};

module.exports = config;
