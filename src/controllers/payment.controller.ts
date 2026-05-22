import { NextFunction, Request, Response } from "express";

import sequelize from "../config/sequelize.config";

import { Debt, Payment } from "../models";

import { paymentSchema } from "../validators/payment.validator";
import { asyncHandler } from "../utils/asyncHandler.utils";
import AppError from "../utils/AppError.utils";

// CREATE PAYMENT
export const createPayment = async (req: Request, res: Response) => {
  // transaction start
  const transaction = await sequelize.transaction();

  try {
    const validatedData = paymentSchema.parse(req.body);

    // find debt
    const debt = await Debt.findByPk(validatedData.debt_id, { transaction });

    if (!debt) {
      // await transaction.rollback();

      throw new AppError("Debt not found", 404);
    }

    const currentAmount = Number(debt.getDataValue("amount"));

    // over payment check
    if (validatedData.amount > currentAmount) {
      // await transaction.rollback();

      throw new AppError("Payment exceeds debt amount", 400); // error throw karse etle ee catch ni anad jase and tarsection cencle thay jase
    }

    // create payment
    const payment = await Payment.create(
      validatedData,

      { transaction },
    ); //ye query is transaction ke andr hai

    // remaining amount
    const remainingAmount = currentAmount - validatedData.amount;

    // update debt
    await debt.update(
      {
        amount: remainingAmount,

        // status: remainingAmount === 0 ? "paid" : "pending",//debt model me hooks ka use karke status change kiya. jitni bhi bar debt upfate hoga suu se pahele status check hoga
      },

      { transaction },
    ); //ye query bhi transection ke andar hai dono query chalengi bad me hi final commit hoga matalab data base me data store hoga

    // commit transaction
    await transaction.commit();

    res.status(201).json({
      success: true,

      message: "Payment added successfully",

      payment,

      remainingAmount,
    });
  } catch (error: any) {
    await transaction.rollback();

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// GET ALL PAYMENTS
export const getPayments = asyncHandler(async (req: Request, res: Response) => {
  const payments = await Payment.findAll({
    include: [
      {
        model: Debt,

        as: "debt",
      },
    ],
  });

  res.status(200).json({
    success: true,

    data: payments,
  });
});
//GET PAYMENT BY ID

export const getPaymentById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const payment = await Payment.findByPk(id, {
      include: [
        {
          model: Debt,
          as: "debt",
        },
      ],
    });
    if (!payment) {
      throw new AppError("Payment not found", 404);
    }
    res.status(200).json({
      success: true,
      data: payment,
    });
  },
);

// GET PAYMENTS OF SINGLE DEBT
export const getDebtPayments = asyncHandler(
  async (req: Request, res: Response) => {
    const debt = await Debt.findByPk(
      req.params.id,

      {
        include: [
          {
            model: Payment,

            as: "payments",
          },
        ],
      },
    );

    if (!debt) {
      throw new AppError("Debt not found", 404);
    }

    res.status(200).json({
      success: true,

      data: debt,
    });
  },
);
