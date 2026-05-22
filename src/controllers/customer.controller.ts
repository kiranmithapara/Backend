import { Request, Response } from "express";

import { Op } from "sequelize";

import { Customer, Debt, Payment } from "../models";

import { asyncHandler } from "../utils/asyncHandler.utils";

import AppError from "../utils/AppError.utils";

import { sendResponse } from "../utils/sendResponse.utils";

// CREATE CUSTOMER

export const createCustomer = asyncHandler(
  async (req: Request, res: Response) => {
    const customers = await Customer.create(req.body);

    sendResponse(res, 201, { success: true, data: customers });
  },
);

// GET ALL CUSTOMERS
export const getCustomers = asyncHandler(
  async (req: Request, res: Response) => {
    // pagination
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 5;

    const offset = (page - 1) * limit;

    // search
    const search = req.query.search as string;

    // filter object
    const where: any = {};

    // search by name
    if (search) {
      where.name = {
        [Op.iLike]: `%${search}%`,
      };
    }

    const customers = await Customer.findAndCountAll({
      where,
      paranoid: false, //delete thayel customer jova hoy tyare
      limit,
      include: [
        {
          model: Debt,
          as: "debts",
        },
      ],
      offset,

      order: [["id", "DESC"]],
    });

    // res.status(200).json({
    //   success: true,

    //   total: customers.count,

    //   currentPage: page,

    //   totalPages: Math.ceil(customers.count / limit),

    //   data: customers.rows,
    // });
    sendResponse(res, 200, {
      success: true,
      data: {
        total: customers.count,

        currentPage: page,

        totalPages: Math.ceil(customers.count / limit),

        customersDetail: customers.rows,
      },
    });
  },
);

// GET SINGLE CUSTOMER
export const getCustomerById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const customer = await Customer.findByPk(id, {
      paranoid: false,
      include: [
        {
          model: Debt,
          as: "debts",
        },
      ],
    });

    if (!customer) {
      throw new AppError("Customer not found", 404);
    }
    sendResponse(res, 200, {
      success: true,
      data: customer,
    });
  },
);
// GET CUSTOMER PAYMENTS
export const getCustomerPayments = asyncHandler(
  async (req: Request, res: Response) => {
    const customer = await Customer.findByPk(
      req.params.id,

      {
        paranoid: false,
        include: [
          {
            model: Debt,

            as: "debts",

            include: [
              {
                model: Payment,

                as: "payments",
              },
            ],
          },
        ],
      },
    );

    if (!customer) {
      throw new AppError("Customer not found", 404);
    }
    sendResponse(res, 200, {
      success: true,
      data: customer,
    });
  },
);

// UPDATE CUSTOMER
export const updateCustomer = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const customer = await Customer.findByPk(id);
    if (!customer) {
      throw new AppError("Customer not found", 404);
    }

    await customer.update(req.body);

    // res.status(200).json({
    //   success: true,

    //   message: "Customer updated successfully",

    //   data: customer,
    // });
    sendResponse(res, 200, {
      success: true,
      data: customer,
      message: "Customer updated successfully",
    });
  },
);

// DELETE CUSTOMER
export const deleteCustomer = asyncHandler(
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const customer = await Customer.findByPk(id);

    if (!customer) {
      throw new AppError("Customer not found", 404);
    }
    await customer?.destroy();
    // res.status(200).json({
    //   success: true,
    //   message: "Customer deleted successfully",
    // });
    sendResponse(res, 200, {
      success: true,
      message: "Customer deleted successfully",
    });
  },
);

export const restoreCustomer = asyncHandler(
  async (req: Request, res: Response) => {
    await Customer.restore({
      where: {
        id: req.params.id,
      },
    });

    sendResponse(res, 200, {
      success: true,
      message: "Customer restored successfully",
    });
  },
);
