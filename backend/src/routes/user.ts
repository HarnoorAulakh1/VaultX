import { Router, RequestHandler } from "express";
import {
  login,
  register,
  checkLogin,
  lock,
  checkAddress,
  setupExistingWallet,
} from "../controllers/user.js";

const router = Router();

router.route("/login").post(login as RequestHandler);
router.route("/setup").post(register as RequestHandler);
router
  .route("/setupExistingWallet")
  .post(setupExistingWallet as RequestHandler);
router.route("/lock").get(lock as RequestHandler);
router.route("/checkLogin").post(checkLogin as RequestHandler);
router.route("/checkAddress").post(checkAddress as RequestHandler);

export default router;
