import { FC, useState, ChangeEvent } from "react"
import "./Header.css"
import { ExchangeRate } from "@/types"
import { currencyConversion } from "@/services/currencyConversion"
import { getCurrencyName } from "@/services/getCurrencyName"
import accounting from "accounting"
import InputWithSelect from "@/components/InputWithSelect"

interface HeaderProps {
  currencyRates: ExchangeRate | null
}

const Header: FC<HeaderProps> = ({ currencyRates }) => {
  const currencyNames = currencyRates ? Object.keys(currencyRates) : []

  const [fromCurrency, setFromCurrency] = useState<string>("USD")
  const [toCurrency, setToCurrency] = useState<string>("UAH")
  const [fromValue, setFromValue] = useState<number>(0)
  const [toValue, setToValue] = useState<number>(0)

  const formatCurrencyValue = (value: number): string => {
    return accounting.formatNumber(value, 2, ",", ".")
  }

  const handleFromCurrencyChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const selectedCurrency = event.target.value
    setFromCurrency(selectedCurrency)
    const conversionResult = currencyConversion(
      fromValue,
      selectedCurrency,
      toCurrency,
      currencyRates
    )
    setToValue(conversionResult)
  }

  const handleToCurrencyChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const selectedCurrency = event.target.value
    setToCurrency(selectedCurrency)
    const conversionResult = currencyConversion(
      toValue,
      selectedCurrency,
      fromCurrency,
      currencyRates
    )
    setFromValue(conversionResult)
  }

  const handleFromValueChange = (value: string | number): void => {
    setFromValue(parseFloat(value.toString()))
    const conversionResult = currencyConversion(
      parseFloat(value.toString()),
      fromCurrency,
      toCurrency,
      currencyRates
    )
    setToValue(conversionResult)
  }

  const handleToValueChange = (value: string | number): void => {
    setToValue(parseFloat(value.toString()))
    const conversionResult = currencyConversion(
      parseFloat(value.toString()),
      toCurrency,
      fromCurrency,
      currencyRates
    )
    setFromValue(conversionResult)
  }

  const handleSwitchValues = (): void => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setFromValue(toValue)
    setToValue(fromValue)
  }

  return (
    <>
      <div className="description-section">
        <label className="from-description">
          {formatCurrencyValue(fromValue)} {getCurrencyName(fromCurrency)} <span>equals</span>
        </label>
        <label className="to-description">
          <span>{formatCurrencyValue(toValue)}</span> {getCurrencyName(toCurrency)}
        </label>
      </div>

      <div className="container">
        <button className="switch-button" onClick={handleSwitchValues}>
          <img src="icons/switch.svg" alt="switcher" />
        </button>
        <div className="currency-section">
          <InputWithSelect
            value={fromValue}
            options={currencyNames}
            defaultOption={fromCurrency}
            onChange={handleFromValueChange}
            onOptionChange={handleFromCurrencyChange}
          />
        </div>
        <div className="currency-section">
          <InputWithSelect
            value={toValue}
            options={currencyNames}
            defaultOption={toCurrency}
            onChange={handleToValueChange}
            onOptionChange={handleToCurrencyChange}
          />
        </div>
      </div>
    </>
  )
}

export default Header
