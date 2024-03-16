import express from "express";
import authController from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import userSchemas from "../schemas/userSchemas.js";
import { authenticate } from "../middlewares/authenticate.js";

const userRouter = express.Router();

userRouter.post(
  "/register",
  validateBody(userSchemas.userSignUpSchema),
  authController.signup
);

userRouter.post(
  "/login",
  validateBody(userSchemas.userSignInSchema),
  authController.signin
);

userRouter.get("/current", authenticate, authController.getCurrent);

userRouter.post("/logout", authenticate, authController.signout);

userRouter.patch(
  "/",
  authenticate,
  validateBody(userSchemas.userUpdateSubscriptionSchema),
  authController.updateSubscription
);

export default userRouter;
