import { Router } from "express";
import {
  createDebt,
  exportDebtsExcel,
  getCustomerDebts,
  getDebts,
  getDebtsById,
  // getPaidDebts,
  // getPendingDebts,
} from "../controllers/debt.controller";
import { debtSchema } from "../validators/debt.validator";
import { validate } from "../middleware/validate.middleware";
const router = Router();

router.get("/", getDebts);

router.post("/", validate(debtSchema), createDebt);

// router.get("/pending/all", getPendingDebts);
// router.get("/paid/all", getPaidDebts);

router.get("/export/excel", exportDebtsExcel);

router.get("/customer/:id", getCustomerDebts);

router.get("/:id", getDebtsById);

export default router;
