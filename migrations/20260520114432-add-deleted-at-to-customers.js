"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "customers",

      "deleted_at",

      {
        type: Sequelize.DATE,

        allowNull: true,
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      "customers",

      "deleted_at",
    );
  },
};
