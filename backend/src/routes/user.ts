import { Router, RequestHandler } from "express";
import {
  login,
  register,
  checkLogin,
  lock,
  checkAddress,
  setupExistingWallet,
  transaction,
  privateKey,
  getPrice,
  balance,
} from "../controllers/user.js";
import { check } from "../middlewares/auth.js";

const router = Router();

router.route("/login").post(login as RequestHandler);
router.route("/setup").post(register as RequestHandler);
router
  .route("/setupExistingWallet")
  .post(setupExistingWallet as RequestHandler);
router.route("/lock").get(lock as RequestHandler);
router.route("/checkLogin").post(checkLogin as RequestHandler);
router.route("/checkAddress").post(checkAddress as RequestHandler);
router.route("/transaction").post(transaction as RequestHandler);
router.route("/privateKey").post(privateKey as RequestHandler);
router.route("/getPrice/:id").get(getPrice as RequestHandler);
router.route("/balance").post(balance as RequestHandler);


export default router;
