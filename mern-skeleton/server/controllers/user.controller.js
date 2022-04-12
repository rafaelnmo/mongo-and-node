import User from "../models/user.model";
import extend from "lodash/extend";
import errorHandler from "./../helpers/dbErrorHandler";

/**
 * function that creates a new user with the JSOM object
 * that's received in the POST requests at /api/users
 */
const create = async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		return res.status(200).json({
			message: "Successfully signed up!",
		});
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err),
		});
	}
};

/**
 * Load the matching user (using user value to compare) and append
 * this user, if found, to req.
 */
const userByID = async (req, res, next, id) => {
	try {
		let user = await User.findById(id);
		if (!user)
			return res.status("400").json({
				error: "User not found",
			});
		req.profile = user;
		next();
	} catch (err) {
		return res.status("400").json({
			error: "Could not retrieve user",
		});
	}
};

/**
 * retrieves the user details from req.profile and removes snsitive
 *	information (hashed_password, salt, etc.) and send the user object
 * in the response to the requesting client
 */
const read = (req, res) => {
	req.profile.hashed_password = undefined;
	req.profile.salt = undefined;
	return res.json(req.profile);
};

/**
 * function finds all the users from the database, populates only the
 * name, email, created, and updated fields in the resulting user list,
 * and then returns this list of users as JSON objects in an array to
 * the requesting client.
 */
const list = async (req, res) => {
	try {
		let users = await User.find().select("name email updated created");
		res.json(users);
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err),
		});
	}
};

/**
 * retrieves the user details from req.profile and then uses the
 * loadash module to extend and merge the changes that came in the request body
 */

const update = async (req, res) => {
	try {
		let user = req.profile;
		user = extend(user, req.body);
		user.updated = Date.now();
		await user.save();
		user.hashed_password = undefined;
		user.salt = undefined;
		res.json(user);
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err),
		});
	}
};

const remove = async (req, res) => {
	try {
		let user = req.profile;
		let deletedUser = await user.remove();
		deletedUser.hashed_password = undefined;
		deletedUser.salt = undefined;
		res.json(deletedUser);
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err),
		});
	}
};

export default {
	create,
	userByID,
	read,
	list,
	remove,
	update,
};
