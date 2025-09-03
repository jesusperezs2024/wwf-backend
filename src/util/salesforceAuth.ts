// src/utils/salesforceAuth.ts
import axios from 'axios';
import { Connection } from 'jsforce';
import * as dotenv from 'dotenv';
import salesforceConfig, { getTokenUrl } from '../config/salesforceConfig';

dotenv.config();

// Constantes para la configuración de Salesforce
const SF_LOGIN_URL = salesforceConfig.loginUrl;
const SF_CLIENT_ID = salesforceConfig.clientId;
const SF_CLIENT_SECRET = salesforceConfig.clientSecret;
const SF_TOKEN_ENDPOINT = getTokenUrl();

export interface SalesforceToken {
  access_token: string;
  instance_url: string;
  id: string;
  token_type: string;
  issued_at: string;
  signature: string;
  expires_in?: number;
  refresh_token?: string;
}

/**
 * Obtiene un token de acceso de Salesforce usando username y password
 */
export async function getTokenWithUsernamePassword(username: string, password: string): Promise<SalesforceToken> {
  try {
    console.log(`[Salesforce] Obteniendo token con username/password para: ${username}`);
    
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('client_id', SF_CLIENT_ID);
    params.append('client_secret', SF_CLIENT_SECRET);
    params.append('username', username);
    params.append('password', password);

    const response = await axios.post(SF_TOKEN_ENDPOINT, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log(`[Salesforce] Token obtenido exitosamente para: ${username}`);
    return response.data;
  } catch (error: any) {
    console.error('Error getting Salesforce token:', error.response?.data || error.message);
    throw new Error('Failed to get Salesforce token: ' + (error.response?.data?.error_description || error.message));
  }
}

/**
 * Obtiene un token de acceso de Salesforce usando client credentials
 */
export async function getTokenWithClientCredentials(): Promise<SalesforceToken> {
  try {
    console.log(`[Salesforce] Obteniendo token con client credentials`);
    console.log(`[Salesforce] URL de token: ${SF_TOKEN_ENDPOINT}`);
    
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', SF_CLIENT_ID);
    params.append('client_secret', SF_CLIENT_SECRET);

    const response = await axios.post(SF_TOKEN_ENDPOINT, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log(`[Salesforce] Token obtenido exitosamente`);
    console.log(`[Salesforce] Instance URL: ${response.data.instance_url}`);
    return response.data;
  } catch (error: any) {
    console.error('[Salesforce] Error getting token:', error);
    
    if (error.response) {
      console.error('[Salesforce] Status:', error.response.status);
      console.error('[Salesforce] Response data:', error.response.data);
    }
    
    throw new Error('Failed to get Salesforce token: ' + (error.response?.data?.error_description || error.message));
  }
}

/**
 * Crea una conexión JSForce usando client credentials
 */
export async function createSalesforceConnection(): Promise<Connection> {
  try {
    const tokenResponse = await getTokenWithClientCredentials();
    
    const conn = new Connection({
      instanceUrl: tokenResponse.instance_url,
      accessToken: tokenResponse.access_token
    });
    
    return conn;
  } catch (error) {
    console.error('Error creating Salesforce connection:', error);
    throw error;
  }
}

/**
 * Verifica si el token es válido
 */
export async function verifyToken(token: string, instanceUrl: string): Promise<boolean> {
  try {
    console.log(`[Salesforce] Verificando token en: ${instanceUrl}`);
    
    const conn = new Connection({
      instanceUrl: instanceUrl,
      accessToken: token
    });
    
    // Intentamos hacer una petición sencilla para verificar el token
    await conn.identity();
    console.log(`[Salesforce] Token válido`);
    return true;
  } catch (error) {
    console.error('[Salesforce] Token verification failed:', error);
    return false;
  }
}