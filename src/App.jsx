import React, { useState } from 'react';
import Heading from './components/heading';
import CurrencyForm from './components/currency-form';
import ConversionTable from './components/conversion-table';
import { getCurrencies } from './utils/currencies';
import './App.css';

const fetchRates = async currencyCode => {
  if (currencyCode) {
    const response = await fetch(`/latest?base=${currencyCode}`);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  }
  return {
    rates: [],
  };
};

const App = () => {
  const currencies = getCurrencies();
  const [state, setState] = useState({
    selectedCurrency: '',
    amount: 1,
    rates: {},
  });
  const { selectedCurrency, amount, rates } = state;
  console.log({ state });

  return (
    <div className="app">
      <Heading />
      <CurrencyForm
        currencies={currencies}
        selectedCurrency={selectedCurrency}
        onChangeCurrencySelection={async ({
          target: { value: selectedCurrency },
        }) => {
          const { rates } = await fetchRates(selectedCurrency);
          setState(prevState => ({
            ...prevState,
            selectedCurrency,
            rates,
          }));
        }}
        amount={amount}
        onChangeAmount={({ target: { value: amount } }) => {
          console.log({ amount });
          setState(prevState => ({
            ...prevState,
            amount,
          }));
        }}
      />
      <ConversionTable
        currencies={currencies}
        selectedCurrency={selectedCurrency}
        amount={amount}
        rates={rates}
      />
    </div>
  );
};

export default App;
