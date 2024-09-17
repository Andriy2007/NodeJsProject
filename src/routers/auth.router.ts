import {Router} from "express";

import {commonMiddleware} from "../middlewares/common.middleware";
import {UserValidator} from "../validators/user.validator";
import {authController} from "../controllers/auth.controller";


const router = Router();
router.post("/sign-up", commonMiddleware.isBodyValid(UserValidator.create), authController.signUp,);
router.post("/sign-in", commonMiddleware.isBodyValid(UserValidator.login), authController.signIn,);

export const authRouter = router;