type CurrencyRates = {
  [currency: string]: number
}

export const currencyConversion = (
  amount = 0,
  fromCurrency: string,
  toCurrency: string,
  rates: CurrencyRates
): string => {
  if (amount < 0) {
    return "0"
  }

  if (!rates) {
    return "0"
  }

  const fromRate = rates[fromCurrency]
  const toRate = rates[toCurrency]
  const convertedAmount = amount * (toRate / fromRate)

  return convertedAmount.toFixed(3)
}
