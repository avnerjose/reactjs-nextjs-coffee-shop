export function formatToCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
    maximumSignificantDigits: 2,
    minimumSignificantDigits: 2,
  }).format(value);
}
