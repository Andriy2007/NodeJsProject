import {Router} from "express";

import {isSub} from "../middlewares/userrole.middleware";
import {authMiddleware} from "../middlewares/auth.middleware";
import {postController} from "../controllers/posts.controller";


const router = Router();
router.get("/view/:postId/:day",isSub, authMiddleware.checkAccessToken, postController.viewCount,);
router.get("/average/:manufacture/:city", isSub, authMiddleware.checkAccessToken, postController.averagePrice,);

export const statisticRouter = router;