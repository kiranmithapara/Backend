import winston from "winston";

const logger = winston.createLogger({
  level: "info",

  format: winston.format.combine(
    winston.format.timestamp(),

    winston.format.json(),
  ),

  transports: [
    // console log
    new winston.transports.Console(),

    // file log => log folder route ma banavu padse jate nay bane
    new winston.transports.File({
      filename: "logs/app.log",
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
});

export default logger;
