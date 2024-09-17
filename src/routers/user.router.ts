import {Router} from "express";

import {commonMiddleware} from "../middlewares/common.middleware";
import {userController} from "../controllers/user.controller";
import {authMiddleware} from "../middlewares/auth.middleware";
import {UserValidator} from "../validators/user.validator";
import {fileMiddleware} from "../middlewares/file.middleware";
import {userMiddleware} from "../middlewares/user.middleware";


const router = Router();
router.get("/",  commonMiddleware.isQueryValid(UserValidator.listQuery),userController.getList,);
router.post("/", userController.create);
router.get("/me", authMiddleware.checkAccessToken, userController.getMe);
router.get("/:userId",  commonMiddleware.isIdValid, userController.getById, userMiddleware.getByIdOrThrow);
router.put("/:userId",   authMiddleware.checkAccessToken, commonMiddleware.isBodyValid(UserValidator.update), commonMiddleware.isIdValid, userController.updateById,);
router.delete("/:userId",  commonMiddleware.isIdValid, userController.deleteById,);
router.post("/me/avatar", authMiddleware.checkAccessToken, fileMiddleware.isAvatarValid, userController.uploadAvatar,);

export const userRouter = router;