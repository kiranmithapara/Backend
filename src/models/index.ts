import Customer from "./customer.model";
import Debt from "./debt.model";
import Payment from "./payment.model";

Customer.hasMany(Debt, {
  foreignKey: "customer_id",
  as: "debts",
  onDelete: "CASCADE",
});

Debt.belongsTo(Customer, {
  foreignKey: "customer_id",
  as: "customer",
});
Debt.hasMany(Payment, {
  foreignKey: "debt_id",
  as: "payments",
  onDelete: "CASCADE",
});

Payment.belongsTo(Debt, {
  foreignKey: "debt_id",
  as: "debt",
});

export { Customer, Payment, Debt };
