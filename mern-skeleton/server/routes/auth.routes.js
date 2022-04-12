import express from "express";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

// auth route with endpoint to signin with email and password
router.route("/auth/signin").post(authCtrl.signin);
// auth route with endpoint that clear the cookie containing the JWT after signin
router.route("/auth/signout").get(authCtrl.signout);

export default router;
