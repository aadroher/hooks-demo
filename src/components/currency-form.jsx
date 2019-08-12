import React from 'react';

const CurrencyForm = ({ currencies, onChange }) => (
  <div className="currency-input">
    <fieldset>
      <legend>Currency input</legend>
      <label htmlFor="currency-select">Select your currency:</label> <br />
      <select id="currency-select" value={selectedCurrency} onChange={onChange}>
        {currencies.map(({ code, name }) => (
          <option value={code} key={code}>
            {name}
          </option>
        ))}
      </select>{' '}
      <br />
      <label htmlFor="currency-amount">Enter an amount:</label>
      <br />
      {getCurrencyAttribute(selectedCurrency, 'symbol')}
      <input type="number" />
    </fieldset>
  </div>
);

export default CurrencyForm;
