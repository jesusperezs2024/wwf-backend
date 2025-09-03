// src/controllers/InfoController.ts
import { Request, Response } from "express";

export class InfoController {
  private app: any;

  constructor(app: any) {
    this.app = app;
  }

  public listAllRoutes = (req: Request, res: Response): void => {
    const routes: any[] = [];

    const addRoutes = (stack: any, prefix = "") => {
      stack.forEach((middleware: any) => {
        if (middleware.route) {
          const path = prefix + middleware.route.path;
          routes.push({
            path,
            methods: Object.keys(middleware.route.methods).map((m) =>
              m.toUpperCase()
            ),
          });
        } else if (middleware.name === "router" && middleware.handle.stack) {
          const newPrefix =
            prefix +
            middleware.regexp.source
              .replace("\\/?(?=\\/|$)", "")
              .replace(/\\/g, "")
              .replace(/\^\//g, "/")
              .replace(/\$\//g, "");

          addRoutes(middleware.handle.stack, newPrefix);
        }
      });
    };

    addRoutes(this.app._router.stack);

    res.json({
      routes,
      specific: {
        health: "/health",
        donation_forms: "/api/landing/donation/donation-forms",
        donation_forms_cart: "/api/landing/donation/donation-forms/cart",
        donation_forms_by_id: "/api/landing/donation/donation-forms/:id",
      },
    });
  };
}
