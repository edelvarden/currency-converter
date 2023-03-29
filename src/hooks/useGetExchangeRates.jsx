import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetExchangeRates = () => {
    const [currencyRates, setCurrencyRates] = useState({});
    useEffect(() => {
        const fetchCurrencyRates = async () => {
          const response = await axios.get("https://api.exchangerate-api.com/v4/latest/UAH");
          setCurrencyRates(response.data.rates);
        };
        fetchCurrencyRates();
      }, []);

    return currencyRates;
}

export default useGetExchangeRates;