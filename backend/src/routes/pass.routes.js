import express from "express";
import { savePassword, getPasswords, deletePassword } from "../controllers/pass.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protectRoute); // all routes below need auth

router.post("/", savePassword);
router.get("/", getPasswords);
router.delete("/:id", deletePassword);

export default router;
