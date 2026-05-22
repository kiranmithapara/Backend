"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "payments",

      {
        id: {
          type: Sequelize.INTEGER,

          autoIncrement: true,

          primaryKey: true,

          allowNull: false,
        },

        debt_id: {
          type: Sequelize.INTEGER,

          allowNull: false,

          references: {
            model: "debts",

            key: "id",
          },

          onDelete: "CASCADE",
        },

        amount: {
          type: Sequelize.DECIMAL(10, 2),

          allowNull: false,
        },

        payment_date: {
          type: Sequelize.DATE,

          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },

        created_at: {
          type: Sequelize.DATE,

          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("payments");
  },
};

// Concept =>	Meaning
// Migration	=> Database structure manage
// createTable	=> Table create
// dropTable	=>Table delete
// Foreign Key =>	Dusri table se relation
// CASCADE	=> Parent delete → child delete
// DECIMAL =>	Accurate money values
// CURRENT_TIMESTAMP =>	Current date/time
// up() =>	vApply migration
// down() =>	Undo migration
