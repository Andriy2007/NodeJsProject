import {Router} from "express";

import {postController} from "../controllers/posts.controller";
import {isAdmin, isManager, isSeller} from "../middlewares/userrole.middleware";
import {authMiddleware} from "../middlewares/auth.middleware";
import {PostValidator} from "../validators/post.validator";


const router = Router();

router.get("/", postController.getList);
router.post("/", authMiddleware.checkAccessToken, isSeller, postController.create), (PostValidator.create);
router.get("/:postId",postController.getById,);
router.put("/:postId",isManager, authMiddleware.checkAccessToken, postController.updateById);
router.delete("/:postId",isAdmin, postController.deleteById,);

export const postRouter = router;