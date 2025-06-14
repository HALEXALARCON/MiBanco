import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import app from "./app";
import dotenv from "dotenv";


dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("✅ Base de datos conectada");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar la aplicación:", error);
    process.exit(1);
  }
};

startServer();
