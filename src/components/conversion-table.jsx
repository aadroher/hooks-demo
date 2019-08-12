import React from 'react';

const getValueString = (rates, currencyCode, selectedCurrencyCode, amount) => {
  const rate =
    currencyCode !== selectedCurrencyCode ? (rates || {})[currencyCode] : 1;
  const value = rate * amount;
  return !isNaN(value) ? value.toFixed(2) : '--';
};

const ConversionTable = ({ currencies, selectedCurrency, amount, rates }) => (
  <div className="conversion-table">
    <table>
      <thead>
        <tr>
          {currencies.map(({ code, flag }) => (
            <th key={code}>
              {flag}
              {code}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {currencies.map(({ code, symbol }) => (
            <td key={code}>
              <span role="img">{symbol}</span>
              {`${getValueString(rates, code, selectedCurrency, amount)}`}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  </div>
);

export default ConversionTable;
