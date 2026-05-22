"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("debts", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: "customers",
          key: "id",
        },

        onDelete: "CASCADE",
      },

      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      status: {
        type: Sequelize.STRING,
        defaultValue: "pending",
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("debts");
  },
};
