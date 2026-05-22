import { NextFunction, Request, Response } from "express";

import { readData, writeData } from "../services/data.service";
import pool from "../config/db.config";
// import logger from "../config/logger";

export const getData = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM customers");

    res.status(200).json({
      success: true,

      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: "Error fetching customers",
    });
  }
};
export const addData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, age, city } = req.body;

    const result = await pool.query(
      `insert into customers (name,email,age,city) VALUES($1,$2,$3,$4) returning*`,
      [name, email, age, city],
    );

    res.status(201).json({
      success: true,
      message: "Data added successfully",
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

export const updateData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { city } = req.body;
    const reqult = await pool.query(
      `UPDATE customers SET city=$1 WHERE id=$2 RETURNING *`,
      [city, id],
    );
    res.status(200).json({
      success: true,
      message: "Data Updated Successfully",
      data: reqult.rows,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cId = req.params.id;
    const result = await pool.query(
      `delete from customers where id=$1 returning*`,
      [cId],
    );
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "customer not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Customer Deleted Successfully.",
      data: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
};
