import { Router } from "express";
import { authMiddleWare } from "../middlewares/authMiddleware.js";
import { createShortURL, deleteShortURLController, updateShortURLController } from "../controllers/shortUrlController.js";
import {redirectToOriginalUrl} from "../controllers/shortUrlController.js"
import { getIsLoggedIn } from "../../../frontend/src/redux/slices/User.js";
import { ShortURL } from "../models/shorturl.model.js";

const shortURLRouter = Router();

shortURLRouter.post("/",authMiddleWare,createShortURL);
shortURLRouter.get("/:shortcode",redirectToOriginalUrl);

shortURLRouter.patch("/:shortcode",authMiddleWare,updateShortURLController);
shortURLRouter.delete("/:shortcode",authMiddleWare,deleteShortURLController);
export default shortURLRouter;
