import axios from 'axios';
import { useEffect, useState } from 'react';
import './Header.css';

const convertCurrency = (amount, fromCurrency, toCurrency, rates) => {

  if (amount < 0) {
    return 0;
  }

  const fromRate = rates[fromCurrency];
  const toRate = rates[toCurrency];
  const convertedAmount = (amount * (toRate / fromRate));
  return convertedAmount.toFixed(3);
};

const Header = () => {
  const [currencyRates, setCurrencyRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("UAH");
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);

  useEffect(() => {
    const fetchCurrencyRates = async () => {
      const response = await axios.get("https://api.exchangerate-api.com/v4/latest/UAH");
      setCurrencyRates(response.data.rates);
    };
    fetchCurrencyRates();
  }, []);

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
    setToValue(convertCurrency(fromValue, event.target.value, toCurrency, currencyRates));
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
    setFromValue(convertCurrency(toValue, event.target.value, fromCurrency, currencyRates));
  };

  const handleFromValueChange = (event) => {
    setFromValue(event.target.value);
    setToValue(convertCurrency(event.target.value, fromCurrency, toCurrency, currencyRates));
  };

  const handleToValueChange = (event) => {
    setToValue(event.target.value);
    setFromValue(convertCurrency(event.target.value, toCurrency, fromCurrency, currencyRates));
  };

  return (
    <div className='container'>
      <div className='container__section'>
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          <option value="UAH">UAH</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <input type="number" value={fromValue} onChange={handleFromValueChange} min="0" />
      </div>
      <div className='container__section'>
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          <option value="UAH">UAH</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <input type="number" value={toValue} onChange={handleToValueChange} min="0" />
      </div>
    </div>
  );
};


export default Header;