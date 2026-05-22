import { Router } from "express";
import {
  getData,
  addData,
  updateData,
  deleteCustomer,
} from "../controllers/data.controller";

// NEW 👇 auth middleware import
// import { authMiddleware } from "../middleware/auth.middleware";

import { validate } from "../middleware/validate.middleware";

import { dataSchema } from "../validators/data.validator";

const router = Router();

router.get("/", getData);

// NEW 👇 auth middleware added
router.post("/", validate(dataSchema), addData);
router.put("/:id", updateData);
router.delete("/:id", deleteCustomer);

export default router;
