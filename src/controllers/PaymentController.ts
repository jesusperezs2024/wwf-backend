import { Request, Response, NextFunction } from "express";
import { payment, preapproval } from "../util/MercadoPagoConfig";
import { mapToDonationDTO } from "../util/DonationMapper";
import { SalesforceService } from "../services/SalesforceService";
import { v4 as uuidv4 } from "uuid";
import AppError from "../util/AppError";

export class PaymentController {
  async checkout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const {
      token,
      paymentMethodId,
      email,
      transactionAmount,
      installments,
      identificationType,
      identificationNumber,
      shoppingCar,
    } = req.body;

    try {
      const response = await payment.create({
        body: {
          transaction_amount: Number(transactionAmount),
          token,
          description: "Pago directo",
          installments: Number(installments),
          payment_method_id: paymentMethodId,
          payer: {
            email,
            identification: {
              type: identificationType,
              number: identificationNumber,
            },
          },
          metadata: {
            saleForceIds: shoppingCar.items.map((item: any) => item.tokenSF),
          },
        },
        requestOptions: { idempotencyKey: uuidv4() },
      });

      // if (response.status !== "approved")
      //   throw new AppError("Payment not approved", 400);

      const paymentId = String(response.id);
      const paymentMethod = response.payment_method?.type;
      const cardBrand = paymentMethodId;

      const { infoPersonal, utm, items } = shoppingCar;

      const dtoList = mapToDonationDTO({ infoPersonal, utm, items });
      const updatePromises = dtoList.map((dto, index) => {
        const tokenSF = items[index]?.tokenSF;
        const dtoWithPayment = {
          ...dto,
          Id_externo_de_MP__c: paymentId,
          PaymentMethod: paymentMethod,
          Marca_de_la_tarjeta__c: cardBrand,
        };
        return SalesforceService.updateDonationForm(tokenSF, dtoWithPayment);
      });
      await Promise.all(updatePromises);

      res.json({
        success: true,
        message: "Pago realizado con éxito",
        data: response,
      });
    } catch (error: any) {
      console.error("Error al procesar pago:", error);
      next(error);
    }
  }

  async subscription(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        payer_email,
        card_token_id,
        transaction_amount,
        frequency,
        frequency_type,
        shoppingCar,
      } = req.body;

      const response = await preapproval.create({
        body: {
          reason: "Suscripción mensual sin plan",
          auto_recurring: {
            frequency: Number(frequency) || 1,
            frequency_type: frequency_type || "months",
            transaction_amount: Number(transaction_amount),
            currency_id: "PEN",
          },
          external_reference: shoppingCar.items
            .map((item: any) => item.tokenSF)
            .join(","),
          back_url: "https://tu-sitio.com/suscripcion-completada",
          payer_email,
          card_token_id,
          status: "authorized",
        },
      });

      if (response.status !== "authorized")
        throw new AppError("Payment not authorized", 400);

      const paymentId = String(response.id);
      const method = response.payment_method_id || "";
      const paymentMethod =
        method?.indexOf("deb") > -1 ? "credit_card" : "debit_card";
      const cardBrand =
        method?.indexOf("deb") > -1 ? method.substring(3) : method;

      const { infoPersonal, utm, items } = shoppingCar;

      const dtoList = mapToDonationDTO({ infoPersonal, utm, items });
      const updatePromises = dtoList.map((dto, index) => {
        const tokenSF = items[index]?.tokenSF;
        const dtoWithPayment = {
          ...dto,
          TransactionDay: "",
          TransactionInterval: 1,
          TransactionPeriod: frequency_type === "months" ? "Monthly" : "Yearly",
          Id_externo_de_MP__c: paymentId,
          PaymentMethod: paymentMethod,
          Marca_de_la_tarjeta__c: cardBrand,
        };
        return SalesforceService.updateDonationForm(tokenSF, dtoWithPayment);
      });
      await Promise.all(updatePromises);

      res.json({
        success: true,
        message: "Suscripción creada con éxito",
        data: response,
      });
    } catch (error: any) {
      console.error("Error creando suscripción:", error);
      next(error);
    }
  }
}
