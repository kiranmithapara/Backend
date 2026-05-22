import { DataTypes, Model } from "sequelize";

import sequelize from "../config/sequelize.config";

class Customer extends Model {}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,

      autoIncrement: true,

      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,

      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING,

      unique: false,

      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    address: {
      type: DataTypes.TEXT,
    },
  },

  {
    sequelize,

    tableName: "customers",

    timestamps: true,

    createdAt: "created_at",

    updatedAt: false,

    paranoid: true,

    deletedAt: "deleted_at",
  },
);

export default Customer;
