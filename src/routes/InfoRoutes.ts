import { Router } from "express";
import { InfoController } from "../controllers/InfoController";

export default function infoRoutes(app: any) {
  const router = Router();
  const controller = new InfoController(app);

  router.get("/routes", controller.listAllRoutes);

  return router;
}
