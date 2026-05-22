"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "customers",

      {
        id: {
          type: Sequelize.INTEGER,

          primaryKey: true,

          autoIncrement: true,

          allowNull: false,
        },

        name: {
          type: Sequelize.STRING,

          allowNull: false,
        },

        phone: {
          type: Sequelize.STRING,

          unique: true,

          allowNull: false,
        },

        email: {
          type: Sequelize.STRING,
        },

        address: {
          type: Sequelize.TEXT,
        },

        created_at: {
          type: Sequelize.DATE,

          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("customers");
  },
};
