const useCurrencyConversion = (amount = 0, fromCurrency, toCurrency, rates) => {
  if (amount < 0) {
    return 0
  }

  const fromRate = rates[fromCurrency]
  const toRate = rates[toCurrency]
  const convertedAmount = amount * (toRate / fromRate)

  return convertedAmount.toFixed(3)
}

export default useCurrencyConversion
