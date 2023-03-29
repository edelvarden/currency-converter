import useGetExchangeRates from 'hooks/useGetExchangeRates';
import { useState } from 'react';
import useCurrencyConversion from 'hooks/useCurrencyConversion';
import './Header.css';

const Header = () => {
  const currencyRates = useGetExchangeRates();
  const currencyNames = Object.keys(currencyRates);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("UAH");
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
    setToValue(useCurrencyConversion(fromValue, event.target.value, toCurrency, currencyRates));
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
    setFromValue(useCurrencyConversion(toValue, event.target.value, fromCurrency, currencyRates));
  };

  const handleFromValueChange = (event) => {
    setFromValue(event.target.value);
    setToValue(useCurrencyConversion(event.target.value, fromCurrency, toCurrency, currencyRates));
  };

  const handleToValueChange = (event) => {
    setToValue(event.target.value);
    setFromValue(useCurrencyConversion(event.target.value, toCurrency, fromCurrency, currencyRates));
  };

  const currencyOptions = currencyNames.map((currencyName, key) => <option key={key} value={currencyName.toUpperCase()}>{currencyName.toUpperCase()}</option>)

  return (
    <div className='container'>
      <div className='currency-section'>
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          {currencyOptions}
        </select>
        <input type="number" value={fromValue} onChange={handleFromValueChange} min="0" />
      </div>
      <div className='currency-section'>
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          {currencyOptions}
        </select>
        <input type="number" value={toValue} onChange={handleToValueChange} min="0" />
      </div>
    </div>
  );
};


export default Header;
