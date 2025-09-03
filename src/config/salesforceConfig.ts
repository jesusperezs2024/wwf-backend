// src/config/salesforceConfig.ts
import * as dotenv from 'dotenv';

dotenv.config();

export const salesforceConfig = {
  // URLs
  loginUrl: process.env.SF_LOGIN_URL || 'https://wwfperu--inteweb.sandbox.my.salesforce.com',
  
  // Credenciales
  clientId: process.env.SF_CLIENT_ID,
  clientSecret: process.env.SF_CLIENT_SECRET,
  
  // OAuth y API
  tokenEndpoint: '/services/oauth2/token',
  apiVersion: process.env.SF_API_VERSION || '62.0', // Versión mencionada en el requisito
  
  // Configuración de conexión
  connectionTimeout: parseInt(process.env.SF_CONNECTION_TIMEOUT || '30000'),
  maxRetries: parseInt(process.env.SF_MAX_RETRIES || '3')
};

/**
 * Verifica que la configuración esté completa
 */
export function checkConfiguration(): boolean {
  const requiredConfig = [
    { name: 'loginUrl', value: salesforceConfig.loginUrl },
    { name: 'clientId', value: salesforceConfig.clientId },
    { name: 'clientSecret', value: salesforceConfig.clientSecret }
  ];
  
  let isValid = true;
  
  requiredConfig.forEach(config => {
    if (!config.value) {
      console.error(`Missing Salesforce config: ${config.name}`);
      isValid = false;
    }
  });
  
  return isValid;
}

/**
 * Obtiene la URL completa del endpoint de OAuth para obtener token
 */
export function getTokenUrl(): string {
  return `${salesforceConfig.loginUrl}${salesforceConfig.tokenEndpoint}`;
}

export default salesforceConfig;