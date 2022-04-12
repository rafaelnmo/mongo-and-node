import express from "express";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

// route that define the endpoint to create a new user
router.route("/api/users").post(userCtrl.create);

// route that define the endpoint to fetch all the users in the db
router.route("/api/users").get(userCtrl.list);

/**
 * Authorized Methods
 */

// route that define the endpoint to read a single users's data
router.route("/api/users/:userId").get(authCtrl.requireSignin, userCtrl.read);

// route that define the endpoint to update a sigle user's data
router
	.route("/api/users/:userId")
	.put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update);

// route that define the endpoint to delete a user
router
	.route("/api/users/:userId")
	.delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

/*
	This will ensure that every time the Express app receives a 
	request to a route that matches a path containing :userId parameter
	in it, the app will execute the userById controller function
*/
router.param("userId", userCtrl.userByID);

export default router;
