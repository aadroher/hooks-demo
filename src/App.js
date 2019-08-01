import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { async } from 'q';

const currencies = [
  {
    name: 'Euro',
    code: 'EUR',
    flag: '🇪🇺',
    symbol: '€',
  },
  {
    name: 'Pound Sterling',
    code: 'GBP',
    flag: '🇬🇧',
    symbol: '£',
  },
  {
    name: 'US Dollar',
    code: 'USD',
    flag: '🇺🇸',
    symbol: '$',
  },
];

const fetchRates = async currencyCode => {
  const response = await fetch(`/latest?base=${currencyCode}`);
  if (response.ok) {
    return response.json();
  } else {
    console.log('OUCH!');
    throw new Error(`${response.status} - ${response.statusText}`);
  }
};

const updateRates = async (selectedCurrency, state, setState) => {
  const responseBody = await fetchRates(selectedCurrency);
  console.log({ responseBody });
  const { rates } = responseBody;
  console.log({ rates });
  setState({ ...state, selectedCurrency, rates });
};

const getCurrencyAttribute = (selectedCode, attributeName) => {
  const currency = currencies.find(({ code }) => selectedCode === code) || {};
  return currency[attributeName] || '';
};

const App = () => {
  const [state, setState] = useState({
    selectedCurrency: '',
    amount: 1,
    rates: {},
  });
  const { selectedCurrency, amount, rates } = state;

  return (
    <div className="app">
      <h1>💸 Convert my moneys</h1>
      <div className="currency-input">
        <fieldset>
          <legend>Currency input</legend>
          <label htmlFor="currency-select">Select your currency:</label> <br />
          <select
            id="currency-select"
            value={selectedCurrency}
            onChange={async ({ target: { value } }) => {
              await updateRates(value, state, setState);
            }}
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
          <input type="number" />
        </fieldset>
      </div>
      <div className="conversion-table">
        <table>
          <thead>
            <tr>
              <th> </th>
              {currencies.map(({ code, flag }) => (
                <th>
                  {flag} {code}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {selectedCurrency &&
                  `${getCurrencyAttribute(
                    selectedCurrency,
                    'symbol'
                  )} ${amount}`}
              </td>
              {currencies.map(({ code, symbol }) => {
                if (selectedCurrency === code) {
                  return <td>{`${symbol} 1`}</td>;
                } else {
                  const rate = (rates || {})[code];
                  return <td>{`${symbol} ${(rate * amount).toFixed(2)}`}</td>;
                }
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
