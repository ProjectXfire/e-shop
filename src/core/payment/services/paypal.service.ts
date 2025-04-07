"use server";

import type { Response } from "@/shared/interfaces/response.interface";
import type { PaypalOrderStatusResponse } from "../models/paypal.model";
import { updateOrder } from "./update-order.service";
import { env } from "@/shared/config/env.config";

export async function payPalCheckPayment(txId: string): Promise<Response<null>> {
  try {
    const token = await getPayPalBearerToken();
    const orderId = await verifyPayPalPayment(token, txId);
    await updateOrder(orderId, { isPaid: true, paidAt: new Date() });
    return { error: null, success: "Se realizó el pago de forma exitosa", data: null };
  } catch (error) {
    if (error instanceof Error) return { error: error.message, success: null, data: null };
    return { error: "No se pudo autenticar el pago", success: null, data: null };
  }
}

async function getPayPalBearerToken(): Promise<string> {
  const headers = new Headers();
  const base64Token = Buffer.from(`${env.paypalClientId}:${env.paypalSecret}`, "utf8").toString(
    "base64"
  );

  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append("Authorization", `basic ${base64Token}`);
  const urlEncoded = new URLSearchParams();
  urlEncoded.append("grant_type", "client_credentials");

  const response = await fetch(env.paypalAuthUrl, { method: "POST", headers, body: urlEncoded });
  if (!response.ok) throw new Error("Falló la autenticación");
  const data = await response.json();
  return data.access_token as string;
}

async function verifyPayPalPayment(token: string, txId: string): Promise<string> {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const response = await fetch(`${env.paypalCheckoutOrdersUrl}/${txId}`, {
    method: "GET",
    headers,
  });
  if (!response.ok) throw new Error("Falló la autenticación");
  const data = (await response.json()) as PaypalOrderStatusResponse;
  const { status, purchase_units } = data;
  if (status !== "COMPLETED") throw new Error("Pendiente de pago");
  const { invoice_id } = purchase_units[0];
  if (!invoice_id) throw new Error("La orden no tiene ID");
  return invoice_id;
}
