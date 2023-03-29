import './CurrencySection.css';

const CurrencySection = ({ currencies, defaultCurrency, value, onCurrencyChange, onValueChange }) => {
    return (
        <>
            <div className='currency-section'>
                <select value={`${defaultCurrency}`} onChange={onCurrencyChange}>
                    {currencies.map((currency, key) => {
                        currency = currency.toUpperCase();
                        return <option key={key} value={currency}>{currency}</option>
                    })}
                </select>
                <input type="number" value={value} onChange={onValueChange} min="0" />
            </div>
        </>
    )
}

export default CurrencySection;