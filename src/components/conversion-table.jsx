import React from 'react';
import { getCurrencyAttribute } from '../utils/currencies';

const getValueString = (rates, currencyCode, selectedCurrencyCode, amount) =>
  currencyCode !== selectedCurrencyCode
    ? ((rates || {})[currencyCode] * amount).toFixed(2)
    : '1';

const ConversionTable = ({ currencies, selectedCurrency, amount, rates }) => (
  <div className="conversion-table">
    <table>
      <thead>
        <tr>
          <th> </th>
          {currencies.map(({ code, flag }) => (
            <th key={code}>
              {flag} {code}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {selectedCurrency &&
              `${getCurrencyAttribute(currencies, {
                selectedCurrency,
                attributeName: 'symbol',
              })} ${amount}`}
          </td>
          {currencies.map(({ code, symbol }) => (
            <td key={code}>
              <span role="img">{symbol}</span>
              {` ${getValueString(rates, code, selectedCurrency, amount)}`}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  </div>
);

export default ConversionTable;
