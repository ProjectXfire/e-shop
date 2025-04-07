"use client";

import type {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js";
import { useRouter } from "next/navigation";
import { payPalCheckPayment } from "@/core/payment/services/paypal.service";
import { updateOrder } from "@/core/payment/services/update-order.service";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import SkeletonAnimated from "@/shared/components/animations/skeleton-animated/SkeletonAnimated";
import { toastMessage } from "@/shared/components/message/ToastMessage";

interface Props {
  orderId: string;
  amount: number;
}

function PayPalButton({ amount, orderId }: Props): React.ReactElement {
  const [{ isPending }] = usePayPalScriptReducer();
  const router = useRouter();

  const total = Math.round(amount * 100) / 100;

  if (isPending) return <SkeletonAnimated />;

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          amount: { value: total.toFixed(2), currency_code: "USD" },
          invoice_id: orderId,
        },
      ],
      intent: "CAPTURE",
    });
    await updateOrder(orderId, { transactionId });
    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions): Promise<void> => {
    const details = await actions.order?.capture();
    if (!details || !details.id) return;
    const { error, success } = await payPalCheckPayment(details.id);
    if (error) toastMessage.error(error);
    if (success) {
      toastMessage.success(success);
      router.refresh();
    }
  };

  return (
    <PayPalButtons
      style={{ layout: "horizontal", height: 40, color: "silver", tagline: false }}
      createOrder={createOrder}
      onApprove={onApprove}
    />
  );
}
export default PayPalButton;
