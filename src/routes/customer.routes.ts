import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { customerSchema } from "../validators/customer.validator";
import { authMiddleware } from "../middleware/auth.middleware";

import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getCustomerPayments,
  restoreCustomer,
} from "../controllers/customer.controller";

const router = Router();

router.post("/", validate(customerSchema), createCustomer);

router.get("/", getCustomers);

router.get("/:id/payments", getCustomerPayments);

router.get("/:id", getCustomerById);

router.patch("/restore/:id", restoreCustomer);

router.delete("/:id", deleteCustomer);
router.put("/:id", validate(customerSchema), updateCustomer);

export default router;
