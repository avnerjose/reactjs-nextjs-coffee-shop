export function formatToCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
    maximumSignificantDigits: 2,
    minimumSignificantDigits: 2,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
