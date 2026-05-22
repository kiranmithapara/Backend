import express from "express";
import path from "path";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import { apiLimiter } from "./middleware/rateLimit.middleware";

import dataRoutes from "./routes/data.routes";
import authRoutes from "./routes/auth.routes";
import uploadRotes from "./routes/upload.routes";
import debtRoutes from "./routes/debt.routes";
import customerRotes from "./routes/customer.routes";
import paymentRoutes from "./routes/payment.routes";
import { logger } from "./middleware/logger.middleware"; //request and route log
import { errorMiddleware } from "./middleware/error.middleware"; //error handle

const app = express();

//data ne json ma ferva
app.use(express.json());
app.use(compression());

app.use(helmet()); //Helmet ek Express middleware che je backend ne secure banave che.
app.use(cors());

app.use(morgan("dev"));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// NEW 👇 logger middleware use
app.use(logger);

// routes
app.use(apiLimiter);
app.use("/customers", customerRotes);
app.use("/data", dataRoutes);
app.use("/auth", authRoutes);
app.use("/upload", uploadRotes);
app.use("/debts", debtRoutes);
app.use("/payments", paymentRoutes);

// error middlewarw hamesa last ma ave
app.use(errorMiddleware);

export default app;
