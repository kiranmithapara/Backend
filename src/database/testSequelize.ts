import sequelize from "../config/sequelize.config";

const testSequelize = async () => {
  try {
    await sequelize.authenticate();
    console.log("Sequelize Connected Successfully");
    await sequelize.sync();
  } catch (error) {
    console.log("Sequelize Connection Error", error);
  }
};

testSequelize();
