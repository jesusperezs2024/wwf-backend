import axios from 'axios';
import { DonationFormDTO } from '../dto/DonationFormDTO';
import { getTokenWithClientCredentials } from '../util/salesforceAuth';
import salesforceConfig from '../config/salesforceConfig';

export class SalesforceService {
  /**
   * Obtiene la URL base para las operaciones de API de Salesforce
   */
  private static getApiBaseUrl(instanceUrl: string): string {
    return `${instanceUrl}/services/data/v${salesforceConfig.apiVersion}`;
  }

  /**
   * Crea un nuevo formulario de donaciones en Salesforce
   */
  static async createDonationForm(formData: DonationFormDTO): Promise<any> {
    try {
      // Obtener token de autenticación
      const tokenResponse = await getTokenWithClientCredentials();
      const apiBaseUrl = this.getApiBaseUrl(tokenResponse.instance_url);
      const endpoint = `${apiBaseUrl}/sobjects/GiftEntry`;
      
      console.log(`[Salesforce] Creando formulario en: ${endpoint}`);
      console.log(`[Salesforce] Datos a enviar:`, JSON.stringify(formData, null, 2));
      
      // Configurar headers para la petición
      const headers = {
        'Authorization': `Bearer ${tokenResponse.access_token}`,
        'Content-Type': 'application/json'
      };
      
      // Realizar la petición POST a Salesforce
      const response = await axios.post(
        endpoint,
        formData,
        { headers }
      );
      
      console.log(`[Salesforce] Respuesta de creación:`, response.data);
      return response.data;
    } catch (error: any) {
      console.error('[Salesforce] Error creando formulario de donaciones:', error);
      
      if (error.response) {
        console.error('[Salesforce] Status:', error.response.status);
        console.error('[Salesforce] Data:', error.response.data);
        console.error('[Salesforce] Headers:', error.response.headers);
      }
      
      const errorResponse = {
        message: 'Error al crear formulario de donaciones',
        details: error.response?.data || error.message
      };
      
      throw errorResponse;
    }
  }
  
  /**
   * Actualiza un formulario de donaciones existente en Salesforce
   */
  static async updateDonationForm(id: string, formData: DonationFormDTO): Promise<any> {
    try {
      // Obtener token de autenticación
      const tokenResponse = await getTokenWithClientCredentials();
      const apiBaseUrl = this.getApiBaseUrl(tokenResponse.instance_url);
      const endpoint = `${apiBaseUrl}/sobjects/GiftEntry/${id}`;
      
      console.log(`[Salesforce] Actualizando formulario ${id} en: ${endpoint}`);
      console.log(`[Salesforce] Datos a enviar:`, JSON.stringify(formData, null, 2));
      
      // Configurar headers para la petición
      const headers = {
        'Authorization': `Bearer ${tokenResponse.access_token}`,
        'Content-Type': 'application/json'
      };
      
      // Verificar si el registro existe antes de actualizarlo
      try {
        await this.getDonationForm(id);
      } catch (checkError: any) {
        if (checkError.response?.status === 404) {
          console.error(`[Salesforce] El formulario con ID ${id} no existe`);
          throw {
            message: `El formulario con ID ${id} no existe en Salesforce`,
            response: {
              status: 404,
              data: [{ errorCode: "NOT_FOUND", message: "The requested resource does not exist" }]
            }
          };
        }
        // Si hay otro error, continuamos con la actualización
      }
      
      // Realizar la petición PATCH a Salesforce
      const response = await axios.patch(
        endpoint,
        formData,
        { headers }
      );
      
      // Salesforce devuelve código 204 sin contenido en PATCH exitoso
      console.log(`[Salesforce] PATCH exitoso. Status: ${response.status}`);
      
      return {
        success: response.status === 204,
        message: 'Formulario de donaciones actualizado exitosamente',
        id: id
      };
    } catch (error: any) {
      console.error(`[Salesforce] Error actualizando formulario ${id}:`, error);
      
      if (error.response) {
        console.error('[Salesforce] Status:', error.response.status);
        console.error('[Salesforce] Data:', error.response.data);
        console.error('[Salesforce] Headers:', error.response.headers);
      }
      
      const errorResponse = {
        message: 'Error al actualizar formulario de donaciones',
        details: error.response?.data || error.message
      };
      
      throw errorResponse;
    }
  }
  
  /**
   * Obtiene un formulario de donaciones por su ID
   */
  static async getDonationForm(id: string): Promise<any> {
    try {
      // Obtener token de autenticación
      const tokenResponse = await getTokenWithClientCredentials();
      const apiBaseUrl = this.getApiBaseUrl(tokenResponse.instance_url);
      const endpoint = `${apiBaseUrl}/sobjects/GiftEntry/${id}`;
      
      console.log(`[Salesforce] Obteniendo formulario ${id} desde: ${endpoint}`);
      
      // Configurar headers para la petición
      const headers = {
        'Authorization': `Bearer ${tokenResponse.access_token}`,
        'Content-Type': 'application/json'
      };
      
      // Realizar la petición GET a Salesforce
      const response = await axios.get(
        endpoint,
        { headers }
      );
      
      console.log(`[Salesforce] Formulario obtenido exitosamente`);
      return response.data;
    } catch (error: any) {
      console.error(`[Salesforce] Error obteniendo formulario ${id}:`, error);
      
      if (error.response) {
        console.error('[Salesforce] Status:', error.response.status);
        console.error('[Salesforce] Data:', error.response.data);
        console.error('[Salesforce] Headers:', error.response.headers);
      }
      
      const errorResponse = {
        message: 'Error al obtener formulario de donaciones',
        details: error.response?.data || error.message,
        response: error.response
      };
      
      throw errorResponse;
    }
  }
  
  /**
   * Verifica la URL y versión de API de Salesforce
   */
  static async checkApiEndpoint(): Promise<any> {
    try {
      // Obtener token de autenticación
      const tokenResponse = await getTokenWithClientCredentials();
      const apiBaseUrl = this.getApiBaseUrl(tokenResponse.instance_url);
      
      console.log(`[Salesforce] Verificando disponibilidad de API en: ${apiBaseUrl}`);
      
      // Configurar headers para la petición
      const headers = {
        'Authorization': `Bearer ${tokenResponse.access_token}`,
        'Content-Type': 'application/json'
      };
      
      // Verificar versiones disponibles de la API
      const versionsResponse = await axios.get(
        `${tokenResponse.instance_url}/services/data`,
        { headers }
      );
      
      console.log(`[Salesforce] Versiones disponibles:`, versionsResponse.data);
      
      // Verificar recursos disponibles para la versión actual
      const resourcesResponse = await axios.get(
        apiBaseUrl,
        { headers }
      );
      
      console.log(`[Salesforce] Recursos disponibles:`, resourcesResponse.data);
      
      // Verificar la descripción del objeto Formulario_de_donaciones__c
      try {
        const objectResponse = await axios.get(
          `${apiBaseUrl}/sobjects/Formulario_de_donaciones__c/describe`,
          { headers }
        );
        
        console.log(`[Salesforce] Campos disponibles en Formulario_de_donaciones__c:`, 
          objectResponse.data.fields.map((field: any) => field.name));
        
        return {
          success: true,
          versions: versionsResponse.data,
          resources: resourcesResponse.data,
          objectFields: objectResponse.data.fields.map((field: any) => field.name)
        };
      } catch (objectError: any) {
        console.error('[Salesforce] Error obteniendo descripción del objeto:', objectError.response?.data);
        
        return {
          success: true,
          versions: versionsResponse.data,
          resources: resourcesResponse.data,
          objectError: objectError.response?.data || objectError.message
        };
      }
    } catch (error: any) {
      console.error('[Salesforce] Error verificando API:', error);
      
      if (error.response) {
        console.error('[Salesforce] Status:', error.response.status);
        console.error('[Salesforce] Data:', error.response.data);
      }
      
      throw {
        message: 'Error al verificar API de Salesforce',
        details: error.response?.data || error.message
      };
    }
  }
}