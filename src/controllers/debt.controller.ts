import { Request, Response, NextFunction } from "express";
import { Model, Op } from "sequelize";
import ExcelJS from "exceljs";

import { Debt, Customer, Payment } from "../models";
import { asyncHandler } from "../utils/asyncHandler.utils";
import { sendResponse } from "../utils/sendResponse.utils";
import AppError from "../utils/AppError.utils";
import { includes } from "zod";

// export const getDebts = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const debts = await Debt.findAll({
//       include: [{ model: Customer, as: "customerDetails" }],
//     });

//     sendResponse(res, 200, {
//       success: true,
//       data: debts,
//     });
//   },
// );
export const getDebts = asyncHandler(
  async (
    req: Request,

    res: Response,
  ) => {
    const {
      status,

      minAmount,

      maxAmount,

      startDate,

      endDate,

      page = 1,

      limit = 5,

      sort = "DESC",
    } = req.query;

    const offset = (Number(page) - 1) * Number(limit);

    const where: any = {};

    // status filter
    if (status) {
      where.status = status;
    }

    // amount filter
    if (minAmount || maxAmount) {
      where.amount = {};

      if (minAmount) {
        where.amount[Op.gte] = Number(minAmount);
      }

      if (maxAmount) {
        where.amount[Op.lte] = Number(maxAmount);
      }
    }
    // WHERE status = 'pending' AND amount >= 1000 AND amount <= 5000

    // date filter
    if (startDate || endDate) {
      where.created_at = {};
      if (startDate) {
        where.created_at[Op.gte] = new Date(startDate as string); //start date ne date ma fervi ne pachi camparition kariyu
      }
      if (endDate) {
        where.created_at[Op.lte] = new Date(endDate as string);
      }
    }

    const debts = await Debt.findAndCountAll({
      include: [
        { model: Customer, as: "customer" },
        { model: Payment, as: "payments" },
      ],

      where,
      limit: Number(limit),
      offset,
      order: [["id", sort as string]],
    });

    // GET /debts?status=pending&minAmount=1000&maxAmount=10000&startDate=2025-01-01&endDate=2025-12-31

    sendResponse(
      res,

      200,

      {
        success: true,

        data: {
          total: debts.count,

          currentPage: Number(page),

          totalPages: Math.ceil(debts.count / Number(limit)),

          data: debts.rows,
        },
      },
    );
  },
);

export const createDebt = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const creatDbet = await Debt.create(req.body);
    sendResponse(res, 201, {
      success: true,
      data: creatDbet,
    });
  },
);
export const getDebtsById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);

    const debt = await Debt.findByPk(id, {
      include: [
        {
          model: Customer,
          as: "customer",
          paranoid: false, //soft delete karel  hoy to tenu debts kone karelu che tene jova mate
        },
      ],
    });

    if (!debt) {
      throw new AppError("Debt not found", 404);
      // return res.status(404).json({
      //   success: false,
      //   message: "Debt not found",
      // });
    }

    sendResponse(res, 200, {
      success: true,
      data: debt,
    });
  },
);

export const getCustomerDebts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const customer = await Customer.findByPk(req.params.id, {
      include: [
        {
          model: Debt,
          as: "customer",
        },
      ],
    });
    if (!customer) {
      throw new AppError("Customet not found", 404);
    }
    sendResponse(res, 201, {
      success: true,
      data: customer,
    });
  },
);
// export const getPendingDebts = asyncHandler(
//   async (req: Request, res: Response) => {
//     const debts = await Debt.scope("pending").findAll();

//     sendResponse(res, 200, {
//       success: true,
//       data: debts,
//     });
//   },
// );

// export const getPaidDebts = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const debts = await Debt.scope("paid").findAll();

//     sendResponse(res, 200, { success: true, data: debts });
//   },
// );

export const exportDebtsExcel = asyncHandler(
  async (
    req: Request,

    res: Response,
  ) => {
    const debts = await Debt.findAll({
      include: [
        {
          model: Customer,

          as: "customer",
        },
      ],
    });

    // workbook
    const workbook = new ExcelJS.Workbook();

    // worksheet
    const worksheet = workbook.addWorksheet("Debts");

    // columns
    worksheet.columns = [
      {
        header: "ID",

        key: "id",

        width: 10,
      },

      {
        header: "Customer",

        key: "customer",

        width: 30,
      },

      {
        header: "Amount",

        key: "amount",

        width: 20,
      },

      {
        header: "Status",

        key: "status",

        width: 20,
      },
    ];

    // rows
    debts.forEach((debt: any) => {
      worksheet.addRow({
        id: debt.id,

        customer: debt.customer?.name,

        amount: debt.amount,

        status: debt.status,
      });
    });

    // headers
    res.setHeader(
      "Content-Type",

      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ); // exel file che te set karu respons nu header

    res.setHeader("Content-Disposition", "attachment; filename=debts.xlsx"); //file kya name thi save thase te  //attachment => file ne downlode karo

    // send file
    await workbook.xlsx.write(res); //file ne browser ma mokle, workbook.xlsx=>te exle file che te set karu tene browser ma moklo

    res.end(); //respons ne end karo
  },
);
