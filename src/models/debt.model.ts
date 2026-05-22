import {  DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize.config";
class Debt extends Model {}

Debt.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    tableName: "debts",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,

    // defaultScope: {
    //   order: [["id", "DESC"]],
    // },
    scopes: {
      pending: {
        where: {
          status: "pending",
        },
      },

      paid: {
        where: {
          status: "paid",
        },
      },
    },

    //hooks automaticaly status change karenga
    hooks: {
      beforeUpdate: (debt: any) => {
        const amount = Number(debt.amount);

        debt.status = amount === 0 ? "paid" : "pending";
      },
      afterCreate: (payment: any) => {
        console.log(
          "Payment Created. payment id = ",

          payment.id,
        );
      },
      beforeCreate: (debt: any) => {
        const amount = Number(debt.amount);
        debt.status = amount === 0 ? "paid" : "pending";
      },
    },
  },
);

export default Debt;
