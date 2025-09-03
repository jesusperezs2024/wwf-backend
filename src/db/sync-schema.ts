import { AppDataSource } from "./connection";

// Inicializa la conexión y sincroniza el esquema
AppDataSource.initialize()
  .then(async () => {
    console.log("Conexión inicializada correctamente");
    
    // Forzar la sincronización del esquema
    await AppDataSource.synchronize(false); // false para no borrar tablas existentes
    
    console.log("Base de datos sincronizada correctamente");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error durante la sincronización de la base de datos:", error);
    process.exit(1);
  });