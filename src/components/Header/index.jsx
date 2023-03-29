import CurrencySection from 'components/CurrencySection';
import useCurrencyConversion from 'hooks/useCurrencyConversion';
import { useState } from 'react';
import useGetExchangeRates from 'hooks/useGetExchangeRates';
import './Header.css';

const Header = () => {
  const currencyRates = useGetExchangeRates();
  const currencyes = Object.keys(currencyRates);
  // const currencyes = ['UAH', 'USD', 'EUR'];
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

  return (
    <div className='container'>
      <CurrencySection currencies={currencyes} defaultCurrency={'UAH'} value={fromValue} onCurrencyChange={handleFromCurrencyChange} onValueChange={handleFromValueChange} />
      <CurrencySection currencies={currencyes} defaultCurrency={'USD'} value={toValue} onCurrencyChange={handleToCurrencyChange} onValueChange={handleToValueChange} />
    </div>
  );
};


export default Header;