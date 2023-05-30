import useGetExchangeRates from "hooks/useGetExchangeRates"
import { useState } from "react"
import { currencyConversion } from "services/currencyConversion"
import { getCurrencyName } from "services/getCurrencyName"
import "./Header.css"

const Header = () => {
  const currencyRates = useGetExchangeRates()
  const currencyNames = Object.keys(currencyRates)

  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("UAH")
  const [fromValue, setFromValue] = useState(0)
  const [toValue, setToValue] = useState(0)

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value)
    setToValue(currencyConversion(fromValue, event.target.value, toCurrency, currencyRates))
  }

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value)
    setFromValue(currencyConversion(toValue, event.target.value, fromCurrency, currencyRates))
  }

  const handleFromValueChange = (event) => {
    setFromValue(event.target.value)
    setToValue(currencyConversion(event.target.value, fromCurrency, toCurrency, currencyRates))
  }

  const handleToValueChange = (event) => {
    setToValue(event.target.value)
    setFromValue(currencyConversion(event.target.value, toCurrency, fromCurrency, currencyRates))
  }

  const handleSwitchValues = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setFromValue(toValue)
    setToValue(fromValue)
  }

  const currencyOptions = currencyNames.map((currencyName, key) => (
    <option key={key} value={currencyName.toUpperCase()}>
      {currencyName.toUpperCase()}
    </option>
  ))

  const fromDescription = `${fromValue} ${getCurrencyName(fromCurrency)} equals`
  const toDescription = `${toValue} ${getCurrencyName(toCurrency)}`

  return (
    <>
      <div className="description-section">
        <label className="from-description">
          {fromValue} {getCurrencyName(fromCurrency)} <span>equals</span>
        </label>
        <label className="to-description">
          <span>{toValue}</span> {getCurrencyName(toCurrency)}
        </label>
      </div>

      <div className="container">
        <div className="currency-section">
          <select value={fromCurrency} onChange={handleFromCurrencyChange}>
            {currencyOptions}
          </select>
          <input type="number" value={fromValue} onChange={handleFromValueChange} min="0" />
        </div>
        <button className="switch-button" onClick={handleSwitchValues}>
          <img src="icons/switch.svg" alt="switcher" />
        </button>
        <div className="currency-section">
          <select value={toCurrency} onChange={handleToCurrencyChange}>
            {currencyOptions}
          </select>
          <input type="number" value={toValue} onChange={handleToValueChange} min="0" />
        </div>
      </div>
    </>
  )
}

export default Header
