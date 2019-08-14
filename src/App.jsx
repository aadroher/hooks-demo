import React, { useState, useEffect } from 'react';
import Heading from './components/heading';
import CurrencyForm from './components/currency-form';
import ConversionTable from './components/conversion-table';
import { getCurrencies } from './utils/currencies';
import './App.css';

import eurRates from './data/eur.json';
import gbpRates from './data/gbp.json';
import usdRates from './data/usd.json';

const fetchRates = async currencyCode => {
  switch (currencyCode) {
    case 'EUR':
      return eurRates;
    case 'GBP':
      return gbpRates;
    case 'USD':
      return usdRates;
    default:
      return { rates: [] };
  }
};

const setTitle = ({ selectedCurrency, amount }) => {
  const title =
    selectedCurrency && amount
      ? `Convert ${amount.toFixed(2)} ${selectedCurrency}`
      : 'Select currency and amount';
  document.title = title;
};

const App = () => {
  const currencies = getCurrencies();

  const [state, setState] = useState({
    selectedCurrency: '',
    amount: 1,
    rates: {},
  });
  const { selectedCurrency, amount, rates } = state;

  useEffect(() => {
    setTitle({ selectedCurrency, amount });
  });

  return (
    <div className="app">
      <Heading />
      <CurrencyForm
        currencies={currencies}
        selectedCurrency={selectedCurrency}
        onChangeCurrencySelection={async ({
          target: { value: newSelectedCurrency },
        }) => {
          const { rates: newRates } = await fetchRates(newSelectedCurrency);
          setState(prevState => ({
            ...prevState,
            selectedCurrency: newSelectedCurrency,
            rates: newRates,
          }));
        }}
        amount={amount}
        onChangeAmount={({ target: { value: amountSrt } }) => {
          const newAmount = parseFloat(amountSrt, 10) || 0;
          setState(prevState => ({
            ...prevState,
            amount: newAmount,
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
