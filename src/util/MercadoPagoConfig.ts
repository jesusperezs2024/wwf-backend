import { MercadoPagoConfig, Payment, PreApproval } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || "",
  options: { timeout: 5000 },
});

export const payment = new Payment(client);

const client2 = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN_SUBSCRIPTION || "",
  options: { timeout: 5000 },
});

export const preapproval = new PreApproval(client2);
