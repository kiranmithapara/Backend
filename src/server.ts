import dotenv from "dotenv";
import app from "./app";
import sequelize from "./config/sequelize.config";
import "./models"; //modele file ni andar je index file banavi che te run karv mate
dotenv.config();
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("DataBase connected");
    // await sequelize.sync({ alter: true }); ana jaygya ye productiob ma data ne migrate karvo // sequelize-cli no use kari ne
    // await sequelize.sync();
    console.log("Tables Created");

    app.listen(process.env.PORT, () => {
      // logger.info("server runing on port no " + process.env.PORT);
      console.log("server runing on port no " + process.env.PORT);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
