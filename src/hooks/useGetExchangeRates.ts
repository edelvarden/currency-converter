import { useEffect, useState } from "react"
import axios from "axios"
import { DebouncedFunc, throttle } from "lodash"
import { ExchangeRate } from "@/types"

const API_URL = "https://api.exchangerate-api.com/v4/latest/UAH"
const THROTTLE_DELAY = 1000

const useExchangeRate = (): ExchangeRate | null => {
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await axios
        .get<ExchangeRate>(API_URL)
        .then((response) => setExchangeRate(response.data))
        .catch((error) => console.error("Error fetching exchange rate:", error))
    }

    const throttledFetchData: DebouncedFunc<() => Promise<void>> = throttle(
      fetchData,
      THROTTLE_DELAY
    )

    throttledFetchData()?.catch((error) => console.error("Error throttling exchange rate:", error))

    return () => {
      throttledFetchData.cancel()
    }
  }, [])

  if (!exchangeRate) return null

  return exchangeRate.rates
}

export default useExchangeRate
