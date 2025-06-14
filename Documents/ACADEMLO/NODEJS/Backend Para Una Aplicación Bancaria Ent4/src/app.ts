import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";
import transactionRoutes from "./routes/transaction.routes";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Rutas principales
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

export default app;
