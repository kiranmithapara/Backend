"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "users",

      {
        id: {
          type: Sequelize.INTEGER,

          autoIncrement: true,

          primaryKey: true,

          allowNull: false,
        },

        name: {
          type: Sequelize.STRING,

          allowNull: false,
        },

        email: {
          type: Sequelize.STRING,

          allowNull: false,

          unique: true,
        },

        password: {
          type: Sequelize.STRING,

          allowNull: false,
        },

        role: {
          type: Sequelize.STRING,

          defaultValue: "agent",
        },

        created_at: {
          type: Sequelize.DATE,

          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("users");
  },
};
