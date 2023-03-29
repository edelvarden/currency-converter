import CurrencySection from 'components/CurrencySection';
import useCurrencyConversion from 'hooks/useCurrencyConversion';
import useGetExchangeRates from 'hooks/useGetExchangeRates';
import { useState } from 'react';
import './Header.css';

const Header = () => {
  // all rates
  const currencyRates = useGetExchangeRates();

  // all currencies
  const currencies = Object.keys(currencyRates);
  // const currencies = ['UAH', 'USD', 'EUR'];
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("UAH");
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);

  const handleCurrencyChange = (event, type) => {
    if (type === 'from') {
      setFromCurrency(event.target.value);
      setToValue(useCurrencyConversion(fromValue, event.target.value, toCurrency, currencyRates));
    } else {
      setToCurrency(event.target.value);
      setFromValue(useCurrencyConversion(toValue, event.target.value, fromCurrency, currencyRates));
    }
  };

  const handleValueChange = (event, type) => {
    if (type === 'from') {
      setFromValue(event.target.value);
      setToValue(useCurrencyConversion(event.target.value, fromCurrency, toCurrency, currencyRates));
    } else {
      setToValue(event.target.value);
      setFromValue(useCurrencyConversion(event.target.value, toCurrency, fromCurrency, currencyRates));
    }
  };

  const CurrencyGroup = ({type}) => {
    return (
      <CurrencySection 
        currencies={currencies} 
        defaultCurrency={type === 'from' ? fromCurrency : toCurrency} 
        value={type === 'from' ? fromValue : toValue} 
        onCurrencyChange={(event) => handleCurrencyChange(event, type)} 
        onValueChange={(event) => handleValueChange(event, type)} 
      />
    )
  }

  return (
    <div className='container'>
      <CurrencyGroup type="from" />
      <CurrencyGroup type="to" />
    </div>
  );
};

export default Header;