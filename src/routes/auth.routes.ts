import { Router } from "express";
import { register, login } from "../controllers/auth.controllers";
import { registerSchema, loginSchema } from "../validators/auth.validator";
import { validate } from "../middleware/validate.middleware";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;
