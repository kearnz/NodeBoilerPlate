const dotenv = require('dotenv');

// load the .env file
dotenv.config();

var fromEnv = (vName) => process.env[vName];

var config = {
	port: fromEnv('PORT') || 3000
};

module.exports = config;

