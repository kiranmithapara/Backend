import { Router } from "express";

import {
  createPayment,
  getDebtPayments,
  getPaymentById,
  getPayments,
} from "../controllers/payment.controller";

const   router = Router();

router.post("/", createPayment);

router.get("/", getPayments);

router.get("/debt/:id", getDebtPayments);
router.get("/:id", getPaymentById);

export default router;
