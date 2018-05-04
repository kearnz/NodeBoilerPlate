const dotenv = require("dotenv");

// load the .env file
dotenv.config();

const fromEnv = vName => process.env[vName];

const config = {
	port: fromEnv("PORT") || 3000
};

module.exports = config;
