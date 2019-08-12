import React from 'react';
import { getCurrencyAttribute } from '../utils/currencies';

// const getCurrencyOptions = currencies =>

const CurrencyForm = ({
  currencies,
  selectedCurrency,
  onChangeCurrencySelection,
  amount,
  onChangeAmount,
}) => (
  <div className="currency-input">
    <fieldset>
      <legend>Currency input</legend>
      <label htmlFor="currency-select">Select your currency:</label> <br />
      <select
        id="currency-select"
        value={selectedCurrency}
        onChange={onChangeCurrencySelection}
      >
        {[
          { code: '', name: '--Please choose a currency--' },
          ...currencies,
        ].map(({ code, name }) => (
          <option value={code} key={code}>
            {name}
          </option>
        ))}
      </select>{' '}
      <br />
      <label htmlFor="currency-amount">Enter an amount:</label>
      <br />
      {getCurrencyAttribute(selectedCurrency, 'symbol')}
      <input type="number" value={amount} onChange={onChangeAmount} />
    </fieldset>
  </div>
);

export default CurrencyForm;
