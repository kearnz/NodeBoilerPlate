// dependencies we require
const express = require("express"),
	config = require("./config/config"),
	serve = require("./server/index");

const app = serve.setup(express());
serve.start(app, config);
