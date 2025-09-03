// src/app.ts
import { AppDataSource } from "./db/connection";
import routes from "./routes/indexRoutes";
import cors from "cors";
import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { checkConfiguration } from "./config/salesforceConfig";
import infoRoutes from "./routes/InfoRoutes";
import { errorHandler } from "./middleware/errorHandlerOne";

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging middleware para debug
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Rutas principales
app.use("/api", routes);

// Verificar configuración de Salesforce al iniciar
if (!checkConfiguration()) {
  console.warn(
    "Salesforce configuration check failed. Please check your .env file"
  );
}

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Endpoint para listar todas las rutas disponibles
app.use("/api", infoRoutes(app));

// Registro del middleware de manejo de errores
app.use(((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
}) as ErrorRequestHandler);

// Inicializar la conexión a la base de datos
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log("\nAvailable endpoints:");
      console.log(`  Health check: http://localhost:${port}/health`);
      console.log(`  List all routes: http://localhost:${port}/api/routes`);
      console.log("\nNote: Landing API requires x-api-key header");

      if (process.env.LANDING_API_KEY) {
        console.log("  LANDING_API_KEY is set");
      } else {
        console.log("  WARNING: LANDING_API_KEY is not set in .env");
      }
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });

export default app;
