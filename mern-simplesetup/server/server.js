import path from "path";
import express from "express";
import { MongoClient } from "mongodb";
import template from "./../template";
//comment out before building for production
import devBundle from "./devBundle";

const app = express();
//comment out before building for production
devBundle.compile(app);

//configure the Express app to return static files from /dist folder,
//when the request starts with /dist
const CURRENT_WORKING_DIR = process.cwd();
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

//render template.js when receives a request to the
//root URL
app.get("/", (req, res) => {
	res.status(200).send(template());
});

//configure the Express app to start a server that listen
//on the specified port (in this case 3000)
let port = process.env.PORT || 3000;
app.listen(port, function onStart(err) {
	if (err) {
		console.log(err);
	}
	console.info("Server started on port %s.", port);
});

// Database Connection URL (I can substitute for a cloud Mongo DB database)
const url =
	process.env.MONGODB_URI || "mongodb://localhost:27017/mernSimpleSetup";
// Use connect method to connect to the server
MongoClient.connect(
	url,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err, db) => {
		console.log("Connected successfully to mongodb server");
		db.close();
	}
);
