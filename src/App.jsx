import React, { useState } from 'react';
import CurrencyForm from './components/currency-form';
import ConversionTable from './components/conversion-table';
import { getCurrencies, getCurrencyAttribute } from './utils/currencies';
import './App.css';

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

const App = () => {
  const currencies = getCurrencies();
  const [state, setState] = useState({
    selectedCurrency: '',
    amount: 1,
    rates: {},
  });
  const { selectedCurrency, amount, rates } = state;

  return (
    <div className="app">
      <h1>
        <span role="img">💸</span> Convert my moneys
      </h1>
      <CurrencyForm
        currencies={currencies}
        selectedCurrency={selectedCurrency}
        onChange={async ({ target: { value } }) => {
          await updateRates(value, state, setState);
        }}
      />
      <ConversionTable
        currencies={currencies}
        selectedCurrency={selectedCurrency}
      />
    </div>
  );
};

export default App;
