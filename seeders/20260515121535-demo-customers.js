"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "customers",

      [
        {
          name: "Kiran",

          phone: "9999399999",

          created_at: new Date(),
        },

        {
          name: "Raj",

          phone: "8888688888",

          created_at: new Date(),
        },
      ],
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("customers", null, {});
  },
};
