import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getCompany, getCompanyByid, registerCompany, updateCompany } from '../controllers/company.controller.js';
import { singleupload } from '../middlewares/multer.js';

const router = express.Router();
router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyByid);
router.route("/update/:id").put(isAuthenticated,singleupload,updateCompany);

export default router;