import { DataTypes, Model } from "sequelize";

import sequelize from "../config/sequelize.config";

class Payment extends Model {}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,

      autoIncrement: true,

      primaryKey: true,
    },

    debt_id: {
      type: DataTypes.INTEGER,

      allowNull: false,
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),

      allowNull: false,
    },

    payment_date: {
      type: DataTypes.DATE,

      defaultValue: DataTypes.NOW,
    },
  },

  {
    sequelize,

    tableName: "payments",

    timestamps: true,

    createdAt: "created_at",

    updatedAt: false,
  },
);

export default Payment;
