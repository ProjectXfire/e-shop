export const env = {
  paypalClientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "",
  paypalSecret: process.env.PAYPAL_SECRET ?? "",
  paypalAuthUrl: process.env.PAYPAL_OAUTH_URL ?? "",
  paypalCheckoutOrdersUrl: process.env.PAYPAL_ORDERS_URL ?? "",
};
