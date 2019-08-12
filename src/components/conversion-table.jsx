import React from 'react';
import { getCurrencyAttribute } from '../utils/currencies';

const ConversionTable = ({ currencies, selectedCurrency, amount, rates }) => (
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
              `${getCurrencyAttribute(currencies, {
                selectedCurrency,
                attributeName: 'symbol',
              })} ${amount}`}
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
);

export default ConversionTable;
