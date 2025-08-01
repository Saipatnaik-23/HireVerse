import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js';
import {login,register,updateProfile,logout} from '../controllers/user.controller.js'
import { singleupload } from '../middlewares/multer.js';

const router = express.Router();
router.route("/register").post(singleupload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleupload,updateProfile);

export default router;
