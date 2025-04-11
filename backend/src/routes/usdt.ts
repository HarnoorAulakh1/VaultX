import { Router, RequestHandler } from "express";
import {
  login,
  register,
  checkLogin,
  lock,
  checkAddress,
  setupExistingWallet,
  transaction,
} from "../controllers/user.js";
import { check } from "../middlewares/auth.js";
import { balance } from "../controllers/usdt.js";


const router = Router();

router.route("/balance").post(balance as RequestHandler);

export default router;