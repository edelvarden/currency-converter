import { useState, useEffect } from "react";
import axios from "axios";

const Header = () => {
  const [currencyRates, setCurrencyRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState("UAH");
  const [toCurrency, setToCurrency] = useState("USD");
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
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };

  const handleFromValueChange = (event) => {
    setFromValue(event.target.value);
    setToValue((event.target.value * (currencyRates[toCurrency] / currencyRates[fromCurrency])).toFixed(3));
  };

  const handleToValueChange = (event) => {
    setToValue(event.target.value);
    setFromValue((event.target.value * (currencyRates[fromCurrency] / currencyRates[toCurrency])).toFixed(3));
  };

  return (
    <div>
      <div>
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          <option value="UAH">UAH</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <input type="number" value={fromValue} onChange={handleFromValueChange} />
      </div>
      <div>
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          <option value="UAH">UAH</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <input type="number" value={toValue} onChange={handleToValueChange} />
      </div>
    </div>
  );
};

export default Header;
