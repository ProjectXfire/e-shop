export function currencyFormat(value: number, currency?: string) {
  const type = currency ?? "USD";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: type,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
