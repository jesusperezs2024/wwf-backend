import { Request, Response } from "express";
import {
  getTokenWithClientCredentials,
  verifyToken,
} from "../util/salesforceAuth";
import { SalesforceService } from "../services/SalesforceService";
import { DonationFormDTO, validateDonationForm } from "../dto/DonationFormDTO";
import { mapToDonationDTO } from "../util/DonationMapper";

export default class SalesforceController {
  /**
   * Prepara un formulario de donaciones para ser enviado a Salesforce
   */
  static async prepareDonation(req: Request, res: Response): Promise<void> {
    try {
      const { infoPersonal, utm, items } = req.body;

      const dtoList = mapToDonationDTO({ infoPersonal, utm, items });
      const tokenPromises = dtoList.map((dto) =>
        SalesforceService.createDonationForm(dto)
      );
      const tokenResponses = await Promise.all(tokenPromises);
      const tokens = tokenResponses.map((r: any) => r.id);

      const enrichedItems = items.map((item: any, index: number) => ({
        ...item,
        tokenSF: tokens[index],
      }));

      res.status(200).json({
        success: true,
        message: "Formulario preparado exitosamente",
        data: { infoPersonal, utm, items: enrichedItems },
      });
    } catch (error: any) {
      console.error("Error preparing donation form:", error);

      res.status(500).json({
        success: false,
        error: error.message,
        details: error.details || null,
      });
    }
  }

  static async updateDonation(req: Request, res: Response): Promise<void> {
    try {
      const { infoPersonal, utm, items } = req.body;

      const dtoList = mapToDonationDTO({ infoPersonal, utm, items });
      const tokenPromises = dtoList.map((dto, index) => {
        const tokenSF = items[index]?.tokenSF;
        return SalesforceService.updateDonationForm(tokenSF, dto);
      });
      await Promise.all(tokenPromises);

      res.status(200).json({
        success: true,
        message: "Formulario actualizado exitosamente",
        data: { infoPersonal, utm, items },
      });
    } catch (error: any) {
      console.error("Error updating donation form:", error);

      res.status(500).json({
        success: false,
        error: error.message,
        details: error.details || null,
      });
    }
  }

  /**
   * Verifica el estado de la API de Salesforce
   */
  static async diagnosticCheck(req: Request, res: Response): Promise<void> {
    try {
      const result = await SalesforceService.checkApiEndpoint();

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      console.error("Error in diagnostic check:", error);

      res.status(500).json({
        success: false,
        error: error.message,
        details: error.details || null,
      });
    }
  }

  /**
   * Obtiene un token de acceso de Salesforce
   */
  static async getToken(req: Request, res: Response): Promise<void> {
    try {
      const tokenResponse = await getTokenWithClientCredentials();

      res.status(200).json({
        success: true,
        data: {
          token_type: tokenResponse.token_type,
          access_token: tokenResponse.access_token,
          instance_url: tokenResponse.instance_url,
          issued_at: new Date(parseInt(tokenResponse.issued_at)).toISOString(),
          expires_in: tokenResponse.expires_in,
        },
      });
    } catch (error: any) {
      console.error("Error in getToken controller:", error);

      res.status(500).json({
        success: false,
        error: error.message,
        details: error.response?.data || null,
      });
    }
  }

  /**
   * Verifica si un token es válido
   */
  static async verifyToken(req: Request, res: Response): Promise<void> {
    try {
      const { token, instanceUrl } = req.body;

      if (!token || !instanceUrl) {
        res.status(400).json({
          success: false,
          error: "Token and instanceUrl are required",
        });
        return;
      }

      const isValid = await verifyToken(token, instanceUrl);

      res.status(200).json({
        success: true,
        data: {
          isValid,
        },
      });
    } catch (error: any) {
      console.error("Error in verifyToken controller:", error);

      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Crea un nuevo formulario de donaciones en Salesforce
   */
  static async createDonationForm(req: Request, res: Response): Promise<void> {
    try {
      const formData: DonationFormDTO = req.body;

      // Validar datos del formulario
      const validation = validateDonationForm(formData);
      if (!validation.isValid) {
        res.status(400).json({
          success: false,
          error: "Datos de formulario inválidos",
          validationErrors: validation.errors,
        });
        return;
      }

      // Crear formulario en Salesforce
      const result = await SalesforceService.createDonationForm(formData);

      res.status(201).json({
        success: true,
        data: result,
        message: "Formulario de donaciones creado exitosamente",
      });
    } catch (error: any) {
      console.error("Error creating donation form:", error);

      res.status(error.response?.status || 500).json({
        success: false,
        error: error.message,
        details: error.details || null,
      });
    }
  }

  /**
   * Actualiza un formulario de donaciones existente en Salesforce
   */
  static async updateDonationForm(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const formData: DonationFormDTO = req.body;

      if (!id) {
        res.status(400).json({
          success: false,
          error: "Se requiere el ID del formulario",
        });
        return;
      }

      console.log(
        `[Controller] Actualizando formulario ${id} con datos:`,
        JSON.stringify(formData, null, 2)
      );

      // Actualizar formulario en Salesforce
      const result = await SalesforceService.updateDonationForm(id, formData);

      res.status(200).json({
        success: true,
        data: result,
        message: `Formulario de donaciones ${id} actualizado exitosamente`,
      });
    } catch (error: any) {
      console.error(
        `[Controller] Error updating donation form ${req.params.id}:`,
        error
      );

      const statusCode = error.response?.status || 500;
      const errorDetails = error.response?.data || error.details || null;

      res.status(statusCode).json({
        success: false,
        error: error.message,
        details: errorDetails,
      });
    }
  }

  /**
   * Obtiene un formulario de donaciones por su ID
   */
  static async getDonationForm(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          error: "Se requiere el ID del formulario",
        });
        return;
      }

      const result = await SalesforceService.getDonationForm(id);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      console.error(
        `[Controller] Error getting donation form ${req.params.id}:`,
        error
      );

      const statusCode = error.response?.status || 500;

      res.status(statusCode).json({
        success: false,
        error: error.message,
        details: error.details || null,
      });
    }
  }
}
