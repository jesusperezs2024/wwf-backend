// src/test-oauth-connection.ts
import * as dotenv from 'dotenv';
import { getTokenWithClientCredentials, createSalesforceConnection, verifyToken } from './util/salesforceAuth';

dotenv.config();

async function testSalesforceConnection() {
  console.log('--- Testing Salesforce OAuth Connection ---');
  
  try {
    console.log('Step 1: Getting token with client credentials...');
    const tokenResponse = await getTokenWithClientCredentials();
    
    console.log('Token obtained successfully!');
    console.log('Token Type:', tokenResponse.token_type);
    console.log('Instance URL:', tokenResponse.instance_url);
    console.log('Access Token:', tokenResponse.access_token.substring(0, 20) + '... (truncated)');
    console.log('Issued At:', new Date(parseInt(tokenResponse.issued_at)).toISOString());
    
    if (tokenResponse.expires_in) {
      console.log('Expires In:', tokenResponse.expires_in + ' seconds');
    }
    
    console.log('\nStep 2: Verifying token validity...');
    const isValid = await verifyToken(tokenResponse.access_token, tokenResponse.instance_url);
    console.log('Token is valid:', isValid);
    
    console.log('\nStep 3: Creating JSForce connection...');
    const conn = await createSalesforceConnection();
    console.log('Connection created successfully!');
    
    // Opcional: Hacer una consulta básica para verificar la conexión
    console.log('\nStep 4: Testing query capability...');
    try {
      const result = await conn.query('SELECT Id, Name FROM Account LIMIT 5');
      console.log(`Query successful! Found ${result.totalSize} Account records.`);
      
      if (result.records.length > 0) {
        console.log('\nSample records:');
        result.records.forEach((record: any, index: number) => {
          console.log(`${index + 1}. ${record.Name} (${record.Id})`);
        });
      }
    } catch (queryError) {
    //   console.log('Query test failed:', queryError.message);
      console.log('This might be due to insufficient permissions or incorrect API version.');
    }
    
    console.log('\n--- Connection test completed successfully! ---');
  } catch (error: any) {
    console.error('\nConnection test failed!');
    console.error('Error:', error.message);
    
    if (error.response) {
      console.error('Response Data:', error.response.data);
      console.error('Status:', error.response.status);
    }
    
    process.exit(1);
  }
}

// Ejecutar el test
testSalesforceConnection();