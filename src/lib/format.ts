export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  }).format(date);
}

export function parseCurrencyInput(value: string) {
  if (!value) return 0;

  const digitsOnly = value.replace(/\D/g, "");
  const numericValue = Number(digitsOnly) / 100;

  return numericValue;
}

export function formatCurrencyInput(value: string) {
  const numericValue = parseCurrencyInput(value);

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numericValue);
}
